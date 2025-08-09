export default function useGenerateChatTitle(chatId: ChatId) {
  const { data: chats } = useNuxtData<ChatWithProject[]>('chats')

  async function generateChatTitle(message: Omit<ChatMessage, 'id'>) {
    await $fetch<ChatWithProject>(`/api/chats/${chatId}/title`, {
      method: 'POST',
      body: { message },
      async onResponse({ response }) {
        await refreshNuxtData(`chat.${chatId}`)

        if (chats.value) {
          const newChat: ChatWithProject = response._data
          chats.value = chats.value.map((c) => (c.id === chatId ? newChat : c))
        }
      },
    })
  }

  return { generateChatTitle }
}
