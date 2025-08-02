export default function useChats() {
  const chats = useState<Chat[]>('chats', () => [MOCK_CHAT])

  function createNewChat(projectId?: string) {
    const id = (chats.value.length + 1).toString()
    const chat: Chat = {
      id,
      title: `Chat ${id}`,
      messages: [],
      projectId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    chats.value.push(chat)
    return chat
  }

  function createChat() {
    const chat = createNewChat()
    navigateTo(`/chats/${chat.id}`)
  }

  function createProjectChat(projectId: string) {
    const chat = createNewChat(projectId)
    navigateTo(`/projects/${projectId}/chats/${chat.id}`)
  }

  function chatsInProject(projectId?: string) {
    return chats.value.filter((c) => c.projectId === projectId)
  }

  return { chats, createChat, chatsInProject, createProjectChat }
}
