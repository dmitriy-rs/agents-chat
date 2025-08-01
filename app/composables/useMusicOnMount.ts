import type { MelodyConfig } from '~/utils/musicUtils'

export const useMusicOnMount = (
  melodyConfigs: MelodyConfig | MelodyConfig[],
) => {
  const configs = Array.isArray(melodyConfigs) ? melodyConfigs : [melodyConfigs]
  const musicInstances = configs.map((config) => useRetroMusic(config))

  const hasStarted = ref(false)

  const startMusicOnce = () => {
    if (hasStarted.value) return

    musicInstances.forEach(({ startMusic }) => startMusic())
    hasStarted.value = true
  }

  useEventListener('click', startMusicOnce, { once: true })
  useEventListener('keydown', startMusicOnce, { once: true })
  useEventListener('touchstart', startMusicOnce, { once: true })

  return {
    hasStarted: readonly(hasStarted),
  }
}
