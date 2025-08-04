export default function useChats() {
  const { data: chats } = useFetch<ChatWithProject[]>('/api/chats', {
    default: () => [],
    key: 'chats',
  })

  async function createNewChat({
    projectId,
    title,
  }: { projectId?: string; title?: string } = {}) {
    const chat = await $fetch<Chat>('/api/chats', {
      method: 'POST',
      body: {
        projectId,
        title,
      },
      async onResponse() {
        await refreshNuxtData('chats')
      },
    })
    return chat
  }

  async function createChat() {
    const chat = await createNewChat()
    navigateTo(`/chats/${chat.id}`)
  }

  async function createChatInProject(projectId: string) {
    const chat = await createNewChat({ projectId })
    navigateTo(`/projects/${projectId}/chats/${chat.id}`)
  }

  function chatsInProject(projectId?: string) {
    return chats.value.filter((c) => c.projectId === projectId)
  }

  return { chats, createChat, chatsInProject, createChatInProject }
}
