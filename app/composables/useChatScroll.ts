export default function useChatScroll() {
  const { messages } = useChat()

  const containerRef = useTemplateRef<HTMLDivElement>('scrollContainer')
  const { isAtBottom, scrollToBottom, pinToBottom } =
    useScrollToBottom(containerRef)

  const shouldShowScrollButton = computed(() => !isAtBottom.value)

  watchDeep(messages, pinToBottom)

  return {
    shouldShowScrollButton,
    scrollToBottom,
  }
}
