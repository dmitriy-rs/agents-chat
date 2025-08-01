import type { ShallowRef } from 'vue'

export default function useScrollToBottom(
  container: ShallowRef<HTMLDivElement | null>,
) {
  const smooth = ref(true)
  const behavior = computed(() => (smooth.value ? 'smooth' : 'auto'))

  const { arrivedState, y, measure } = useScroll(container, {
    behavior,
    observe: true,
  })

  const isAtBottom = computed(() => {
    if (!container.value) return true
    return arrivedState.bottom
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
    console.log(isAtBottom.value)
    if (isAtBottom.value && container.value) {
      scrollToBottom(true)
    }
    measure()
  }

  onMounted(() => {
    scrollToBottom(true)
    measure()
  })

  return {
    isAtBottom,

    scrollToBottom,
    pinToBottom,
  }
}
