import { ref, onUnmounted } from 'vue'
import type { Melody } from '~~/layers/music/app/utils/musicUtils'

class MelodyLoop {
  private noteIdx = 0
  private timerId?: number

  constructor(
    private ctx: AudioContext,
    private destination: GainNode,
    private cfg: Melody,
    private Sound: typeof import('retro-sound').Sound,
  ) {}

  private playNext = () => {
    if (this.ctx.state === 'suspended') this.ctx.resume()

    const current = this.cfg.notes[this.noteIdx]
    if (!current) return

    let synth = new this.Sound(this.ctx, this.cfg.waveType)

    if (this.cfg.modulator) {
      const { type, frequency, depth, param } = this.cfg.modulator
      synth = synth.withModulator(type, frequency, depth, param)
    }
    if (this.cfg.filter) {
      const { type, frequency } = this.cfg.filter
      synth = synth.withFilter(type, frequency)
    }

    synth
      .toDestination(this.destination)
      .play(current.note)
      .rampToVolumeAtTime(0, current.duration / 1000)
      .waitDispose()

    this.noteIdx = (this.noteIdx + 1) % this.cfg.notes.length
  }

  start() {
    this.playNext()
    this.timerId = window.setInterval(this.playNext, this.cfg.tempo)
  }

  stop() {
    if (this.timerId != null) {
      clearInterval(this.timerId)
      this.timerId = undefined
    }
  }
}

export default function useBackgroundMusicPlayer() {
  const hasStarted = ref(false)
  const isPlaying = ref(false)
  const currentConfigs = ref<readonly Melody[]>([])

  const loops: MelodyLoop[] = []
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

    const now = engine.context.value.currentTime
    engine.master.value.gain.cancelScheduledValues(now)
    engine.master.value.gain.setValueAtTime(0.15, now)

    melodies.forEach((cfg) => {
      const loop = new MelodyLoop(
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
