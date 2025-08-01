import { onMounted, onUnmounted, ref, readonly } from 'vue'
import type { MelodyConfig } from '~/utils/musicUtils'

export const useMusicOnMount = (
  melodyConfigs: MelodyConfig | MelodyConfig[],
) => {
  let configs: MelodyConfig[] = Array.isArray(melodyConfigs)
    ? [...melodyConfigs]
    : [melodyConfigs]

  let musicInstances: ReturnType<typeof useRetroMusic>[] = configs.map((c) =>
    useRetroMusic(c),
  )

  const hasStarted = ref(false)

  const startMusic = () => {
    if (hasStarted.value) return
    musicInstances.forEach((inst) => inst.startMusic())
    hasStarted.value = true
  }

  const stopMusic = (fadeSeconds = 0.5) => {
    musicInstances.forEach((inst) => inst.stopMusic(fadeSeconds))
    hasStarted.value = false
  }

  const updateMelodies = (newConfigs: MelodyConfig | MelodyConfig[]) => {
    const wasPlaying = hasStarted.value
    stopMusic()
    configs = Array.isArray(newConfigs) ? [...newConfigs] : [newConfigs]
    musicInstances = configs.map((c) => useRetroMusic(c))
    if (wasPlaying) startMusic()
  }

  useEventListener('click', startMusic, { once: true })
  useEventListener('keydown', startMusic, { once: true })
  useEventListener('touchstart', startMusic, { once: true })

  onMounted(() => {
    try {
      startMusic()
    } catch {
      // ignore
    }
  })

  onUnmounted(() => stopMusic())

  return {
    hasStarted: readonly(hasStarted),
    updateMelodies,
    stopMusic,
  }
}
