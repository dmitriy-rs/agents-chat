import type { Chat } from '~/types'

export default function useChats() {
  const chats = useState<Chat[]>('chats', () => [MOCK_CHAT])

  function createChat() {
    const id = (chats.value.length + 1).toString()
    const chat: Chat = {
      id,
      title: `Chat ${id}`,
      messages: [],
      projectId: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    chats.value.push(chat)
    navigateTo(`/chats/${id}`)
  }

  function chatsInProject(projectId: string) {
    return chats.value.filter((c) => c.projectId === projectId)
  }

  return { chats, createChat, chatsInProject }
}
