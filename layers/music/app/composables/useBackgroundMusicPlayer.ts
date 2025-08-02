class LoopPlayer {
  private engine: NoteEngine
  private noteIdx = 0
  private timerId?: number
  private stopped = false

  constructor(
    private ctx: AudioContext,
    private destination: GainNode,
    private cfg: Melody,
    Sound: typeof import('retro-sound').Sound,
  ) {
    this.engine = new NoteEngine(ctx, destination, cfg, Sound)
  }

  private playCurrent = () => {
    if (this.stopped) return
    const current = this.cfg.notes[this.noteIdx]
    if (!current) return

    this.engine.play(current)
    this.noteIdx = (this.noteIdx + 1) % this.cfg.notes.length
  }

  start() {
    if (this.stopped) return
    this.playCurrent()
    this.timerId = window.setInterval(this.playCurrent, this.cfg.tempo)
  }

  stop() {
    this.stopped = true
    if (this.timerId != null) clearInterval(this.timerId)
  }
}

export default function useBackgroundMusicPlayer() {
  const hasStarted = ref(false)
  const isPlaying = ref(false)
  const currentConfigs = ref<readonly Melody[]>([])

  const loops: LoopPlayer[] = []
  const engine = useAudioEngine()

  const startMusic = async (melodies: readonly Melody[]) => {
    if (isPlaying.value) return

    await engine.init()
    if (
      !engine.context.value ||
      !engine.master.value ||
      !engine.SoundCtor.value
    )
      return

    currentConfigs.value = melodies

    // only for restarts
    const now = engine.context.value.currentTime
    engine.master.value.gain.cancelScheduledValues(now)
    engine.master.value.gain.setValueAtTime(0.15, now)

    melodies.forEach((cfg) => {
      const loop = new LoopPlayer(
        engine.context.value!,
        engine.master.value!,
        cfg,
        engine.SoundCtor.value!,
      )
      loop.start()
      loops.push(loop)
    })

    isPlaying.value = true
    hasStarted.value = true
  }

  const pauseMusic = (fadeSeconds = 0.5) => {
    if (!isPlaying.value || !engine.context.value || !engine.master.value)
      return

    loops.forEach((l) => l.stop())
    loops.length = 0

    const now = engine.context.value.currentTime
    engine.master.value.gain.cancelScheduledValues(now)
    engine.master.value.gain.setValueAtTime(engine.master.value.gain.value, now)
    engine.master.value.gain.linearRampToValueAtTime(0, now + fadeSeconds)

    isPlaying.value = false
  }

  const restartMusic = async () => {
    if (!currentConfigs.value.length) return
    pauseMusic(0.1)
    await nextTick()
    await startMusic(currentConfigs.value)
  }

  onUnmounted(() => {
    pauseMusic()
    nextTick(engine.close)
  })

  return {
    startMusic,
    pauseMusic,
    restartMusic,
    isPlaying: readonly(isPlaying),
    hasStarted: readonly(hasStarted),
  }
}
