export default function useGenerateChatTitle(chatId: ChatId) {
  const { data: chats } = useNuxtData<ChatWithProject[]>('chats')

  async function generateChatTitle(message: Omit<ChatMessage, 'id'>) {
    await $fetch<ChatWithProject>(`/api/chats/${chatId}/title`, {
      method: 'POST',
      body: { message },
      async onResponse({ response }) {
        await refreshNuxtData(`chat.${chatId}`)

        const chat: ChatWithProject = response._data
        const chatIndex = (chats.value ?? []).findIndex((c) => c.id === chatId)
        if (chatIndex !== -1 && chats.value) {
          chats.value = [
            ...chats.value.slice(0, chatIndex),
            chat,
            ...chats.value.slice(chatIndex + 1),
          ]
        }
      },
    })
  }

  return { generateChatTitle }
}
