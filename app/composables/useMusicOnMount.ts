import type { MelodyConfig } from '~/utils/musicUtils'

export default function useMusicOnMount(initialMelodyConfigs: MelodyConfig[]) {
  const player = useMusicPlayer()

  const hasStarted = ref(false)

  const startMusic = async (
    melodyConfigs: MelodyConfig[] = initialMelodyConfigs,
  ) => {
    await player.startMusic(melodyConfigs)
    hasStarted.value = true
  }

  const pauseMusic = (fadeSeconds = 0.5) => {
    player.pauseMusic(fadeSeconds)
  }

  useEventListener('click', () => startMusic(), { once: true })
  useEventListener('keydown', () => startMusic(), { once: true })
  useEventListener('touchstart', () => startMusic(), { once: true })

  // onMounted(() => {
  //   try {
  //     startMusic()
  //   } catch {
  //     // ignore
  //     hasStarted.value = false
  //   }
  // })

  return {
    hasStarted: readonly(hasStarted),
    pauseMusic,
    restartMusic: player.restartMusic,
    startMusic,
    isPlaying: player.isPlaying,
  }
}
