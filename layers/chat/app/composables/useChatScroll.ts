import type { UIMessage } from 'ai'

export default function useChatScroll(messages: UIMessage[]) {
  const containerRef = useTemplateRef<HTMLDivElement>('scrollContainer')
  const { isAtBottom, scrollToBottom, pinToBottom } =
    useScrollToBottom(containerRef)

  const shouldShowScrollButton = computed(() => !isAtBottom.value)

  // TODO: Doesn't wokr
  watchDeep(messages, (m) => {
    console.log(m)

    pinToBottom()
  })

  return {
    shouldShowScrollButton,
    scrollToBottom,
  }
}
