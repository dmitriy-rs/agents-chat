export default function useAudioEngine() {
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