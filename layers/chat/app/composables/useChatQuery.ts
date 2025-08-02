export default function useChatQuery(chatId: string) {
  const { chats } = useChats()
  const chat = computed(() => chats.value.find((c) => c.id === chatId))
  return chat
}
