import { ref, onUnmounted } from 'vue'
import type { MelodyConfig } from '~/utils/musicUtils'

function useAudioEngine() {
  const context = ref<AudioContext | null>(null)
  const master = ref<GainNode | null>(null)
  const SoundCtor = ref<typeof import('retro-sound').Sound | null>(null)
  const initialized = ref(false)

  const init = async () => {
    if (initialized.value || typeof window === 'undefined') return

    const { Sound } = await import('retro-sound')

    const ctx = new AudioContext()
    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0.15, ctx.currentTime)
    masterGain.connect(ctx.destination)

    context.value = ctx
    master.value = masterGain
    SoundCtor.value = Sound
    initialized.value = true
  }

  const close = async () => {
    if (!context.value) return
    await context.value.close()
    context.value = null
    master.value = null
    SoundCtor.value = null
    initialized.value = false
  }

  return { context, master, SoundCtor, init, close } as const
}

class MelodyLoop {
  private noteIdx = 0
  private timerId?: number

  constructor(
    private ctx: AudioContext,
    private destination: GainNode,
    private cfg: MelodyConfig,
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

export default function useMusicPlayer() {
  const isPlaying = ref(false)
  const currentConfigs = ref<readonly MelodyConfig[]>([])

  const loops: MelodyLoop[] = []
  const engine = useAudioEngine()

  const startMusic = async (melodies: readonly MelodyConfig[]) => {
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

  return { startMusic, pauseMusic, restartMusic, isPlaying } as const
}
