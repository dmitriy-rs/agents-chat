import { ref, onUnmounted } from 'vue'
import type { MelodyConfig } from '~/utils/musicUtils'

export const useRetroMusic = (melodyConfig: MelodyConfig) => {
  const isPlaying = ref(false)

  let audioContext: AudioContext | null = null
  let masterVolume: GainNode | null = null
  let songInterval: NodeJS.Timeout | null = null

  const initAudio = async () => {
    if (typeof window === 'undefined') return

    try {
      // Dynamically import retro-sound to avoid SSR issues
      const { Sound, WhiteNoise } = await import('retro-sound')

      audioContext = new AudioContext()
      masterVolume = audioContext.createGain()
      masterVolume.gain.setValueAtTime(melodyConfig.volume, 0)
      masterVolume.connect(audioContext.destination)

      return { Sound, WhiteNoise }
    } catch (error) {
      console.warn('Failed to initialize retro audio:', error)
      return null
    }
  }

  const createMelody = async () => {
    const audio = await initAudio()
    if (!audio || !audioContext || !masterVolume) return

    const { Sound } = audio
    const { notes, tempo, waveType, modulator, filter } = melodyConfig

    let noteIndex = 0

    const playNextNote = () => {
      if (!audioContext || !masterVolume) return

      // Resume audio context if suspended (required by browser policies)
      if (audioContext.state === 'suspended') {
        audioContext.resume()
      }

      const currentNote = notes[noteIndex]
      if (!currentNote) return

      // Create sound based on configuration
      let sound = new Sound(audioContext, waveType)

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
      sound = sound.toDestination(masterVolume)

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
    songInterval = setInterval(playNextNote, tempo)
  }

  const startMusic = async () => {
    if (isPlaying.value) return

    await createMelody()
    isPlaying.value = true
  }

  const stopMusic = () => {
    if (songInterval) {
      clearInterval(songInterval)
      songInterval = null
    }

    isPlaying.value = false
  }

  onUnmounted(() => {
    stopMusic()
    if (audioContext) {
      audioContext.close()
    }
  })

  return {
    startMusic,
    stopMusic,
  }
}
