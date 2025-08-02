export function useChatPageHead(chat: MaybeRefOrGetter<Chat | undefined>) {
  const appConfig = useAppConfig()
  const title = computed(() => {
    const chatTitle = toValue(chat)?.title
    return chatTitle ? `${chatTitle} - ${appConfig.title}` : appConfig.title
  })

  useHead({
    title,
  })
}
