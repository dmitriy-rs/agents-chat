import type { UIMessage } from 'ai'

export default function useChatScroll(messages: UIMessage[]) {
  const containerRef = useTemplateRef<HTMLDivElement>('scrollContainer')
  const { isAtBottom, scrollToBottom, pinToBottom } =
    useScrollToBottom(containerRef)

  const shouldShowScrollButton = computed(() => !isAtBottom.value)

  watchDeep(() => messages, pinToBottom)

  return {
    shouldShowScrollButton,
    scrollToBottom,
  }
}
