export default async function useChatQuery(chatId: ChatId) {
  const { data: chat } = await useFetch<ChatWithProject>(
    `/api/chats/${chatId}`,
    {
      method: 'GET',
      key: `chat.${chatId}`,
    },
  )
  return chat
}
