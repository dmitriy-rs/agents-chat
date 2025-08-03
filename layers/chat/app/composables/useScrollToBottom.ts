import type { ShallowRef } from 'vue'

export default function useScrollToBottom(
  container: ShallowRef<HTMLDivElement | null>,
) {
  const smooth = ref(true)
  const behavior = computed(() => (smooth.value ? 'smooth' : 'auto'))

  const delta = 3
  const { arrivedState, y, measure } = useScroll(container, {
    behavior,
    observe: true,
    offset: { bottom: delta },
  })

  const isAtBottom = computed(() => {
    if (!container.value) return true
    const max = container.value.scrollHeight - container.value.clientHeight
    return arrivedState.bottom || Math.abs(y.value - max) <= delta
  })

  const bottomTop = () =>
    container.value
      ? container.value.scrollHeight - container.value.clientHeight
      : 0

  function scrollToBottom(immediate = false) {
    if (!container.value) return
    if (immediate) {
      smooth.value = false
      y.value = bottomTop()
      nextTick(() => (smooth.value = true))
    } else {
      y.value = bottomTop()
    }
  }

  async function pinToBottom() {
    if (isAtBottom.value && container.value) {
      await nextTick()
      setTimeout(() => {
        measure()
        scrollToBottom(true)
      }, 30)
    }
  }

  onMounted(async () => {
    await nextTick()
    setTimeout(() => {
      measure()
      scrollToBottom(true)
    })
  })

  return {
    isAtBottom,

    scrollToBottom,
    pinToBottom,
  }
}
