export default function useChat(chatId: string) {
  const { chats } = useChats()
  const chat = computed(() => chats.value.find((c) => c.id === chatId))

  const messages = computed(() => chat.value?.messages ?? [])

  return {
    chat,
    messages,
  }
}
