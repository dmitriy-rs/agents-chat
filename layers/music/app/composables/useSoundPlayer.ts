class OneShotPlayer {
  private engine: NoteEngine
  private noteIdx = 0
  private timeoutId?: number
  private stopped = false

  constructor(
    private ctx: AudioContext,
    private destination: GainNode,
    private cfg: Melody,
    Sound: typeof import('retro-sound').Sound,
  ) {
    this.engine = new NoteEngine(ctx, destination, cfg, Sound)
  }

  private step = () => {
    if (this.stopped) return
    const current = this.cfg.notes[this.noteIdx]
    if (!current) return

    this.engine.play(current)
    const delay = current.duration
    this.noteIdx += 1

    if (this.noteIdx < this.cfg.notes.length) {
      this.timeoutId = window.setTimeout(this.step, delay)
    }
  }

  start() {
    if (this.stopped) return
    this.step()
  }

  stop() {
    this.stopped = true
    if (this.timeoutId != null) clearTimeout(this.timeoutId)
  }
}

export default function useSoundPlayer(melody: Melody) {
  const engine = useAudioEngine()
  const currentPlayer = ref<OneShotPlayer | null>(null)

  async function playSound(newMelody?: Melody) {
    if (!melody) return

    await engine.init()
    if (
      !engine.context.value ||
      !engine.master.value ||
      !engine.SoundCtor.value
    )
      return

    currentPlayer.value?.stop()
    currentPlayer.value = null

    currentPlayer.value = new OneShotPlayer(
      engine.context.value,
      engine.master.value,
      newMelody || melody,
      engine.SoundCtor.value,
    )
    currentPlayer.value.start()
  }

  onUnmounted(() => {
    currentPlayer.value?.stop()
  })

  return { playSound }
}
