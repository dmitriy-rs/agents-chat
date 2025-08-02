export default async function useChatMessagesQuery(chatId: string) {
  const { data, pending, error } = await useFetch(
    `/api/chats/${chatId}/messages`,
  )
  return {
    messages: toValue(data) ?? [],
    pending,
    error,
  }
}