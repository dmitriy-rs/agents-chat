import { ref, onUnmounted } from 'vue'
import type { MelodyConfig } from '~/utils/musicUtils'

export default function useMusicPlayer() {
  const isPlaying = ref(false)
  const currentMelodyConfigs = ref<readonly MelodyConfig[]>([])

  const audioContext = ref<AudioContext | null>(null)
  const masterVolume = ref<GainNode | null>(null)
  const songIntervals = ref<NodeJS.Timeout[]>([])
  const isInitialized = ref(false)

  const initAudio = async () => {
    if (typeof window === 'undefined') return

    try {
      // Dynamically import retro-sound to avoid SSR issues
      const { Sound, WhiteNoise } = await import('retro-sound')

      audioContext.value = new AudioContext()
      masterVolume.value = audioContext.value.createGain()
      masterVolume.value.gain.setValueAtTime(0.15, 0)
      masterVolume.value.connect(audioContext.value.destination)

      isInitialized.value = true
      return { Sound, WhiteNoise }
    } catch (error) {
      console.warn('Failed to initialize retro audio:', error)
      return null
    }
  }

  const createMelody = async (melodyConfig: MelodyConfig) => {
    const audio = await initAudio()
    if (!audio || !audioContext.value || !masterVolume.value) return

    const { Sound } = audio
    const { notes, tempo, waveType, modulator, filter } = melodyConfig

    let noteIndex = 0

    const playNextNote = () => {
      if (!audioContext.value || !masterVolume.value) return

      // Resume audio context if suspended (required by browser policies)
      if (audioContext.value.state === 'suspended') {
        audioContext.value.resume()
      }

      const currentNote = notes[noteIndex]
      if (!currentNote) return

      // Create sound based on configuration
      let sound = new Sound(audioContext.value, waveType)

      // Apply modulator if configured
      if (modulator) {
        sound = sound.withModulator(
          modulator.type,
          modulator.frequency,
          modulator.depth,
          modulator.param,
        )
      }

      // Apply filter if configured
      if (filter) {
        sound = sound.withFilter(filter.type, filter.frequency)
      }

      // Connect to destination
      sound = sound.toDestination(masterVolume.value)

      // Play the note with configured duration
      sound
        .play(currentNote.note)
        .rampToVolumeAtTime(0, currentNote.duration / 1000)
        .waitDispose()

      // Move to next note
      noteIndex = (noteIndex + 1) % notes.length
    }

    // Start the melody loop
    playNextNote()
    const interval = setInterval(playNextNote, tempo)
    songIntervals.value.push(interval)
  }

  const startMusic = async (melodyConfigs: readonly MelodyConfig[]) => {
    if (isPlaying.value) return

    currentMelodyConfigs.value = melodyConfigs

    if (masterVolume.value) {
      masterVolume.value.gain.cancelScheduledValues(
        audioContext.value!.currentTime,
      )
      masterVolume.value.gain.setValueAtTime(
        0.15,
        audioContext.value!.currentTime,
      )
    }

    // Start all melodies
    for (const config of melodyConfigs) {
      await createMelody(config)
    }

    isPlaying.value = true
  }

  const pauseMusic = (fadeSeconds = 0.5) => {
    if (!audioContext || !isPlaying.value) return

    // Stop scheduling new notes immediately
    songIntervals.value.forEach((interval) => {
      clearInterval(interval)
    })
    songIntervals.value = []

    // Smoothly fade out
    if (masterVolume.value && audioContext.value) {
      const now = audioContext.value.currentTime
      masterVolume.value.gain.cancelScheduledValues(now)
      masterVolume.value.gain.setValueAtTime(masterVolume.value.gain.value, now)
      masterVolume.value.gain.linearRampToValueAtTime(0, now + fadeSeconds)
    }

    isPlaying.value = false
  }

  const restartMusic = async () => {
    if (!currentMelodyConfigs.value.length) return

    pauseMusic(0.1)
    await nextTick()
    await startMusic(currentMelodyConfigs.value)
  }

  onUnmounted(() => {
    pauseMusic()
    if (audioContext.value) {
      nextTick(() => {
        audioContext.value?.close()
      })
    }
  })

  return {
    startMusic,
    pauseMusic,
    restartMusic,
    isPlaying,
  }
}
