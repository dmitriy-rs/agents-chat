export default function useAssignToProjectMutation(chatId: ChatId) {
  const { data: chats } = useNuxtData<ChatWithProject[]>('chats')

  async function assignToProject(projectId: ProjectId) {
    let prevList: ChatWithProject[] | undefined

    await $fetch<ChatWithProject>(`/api/chats/${chatId}`, {
      method: 'PUT',
      body: { projectId },
      async onRequest() {
        if (chats.value) {
          chats.value = chats.value.map((c) =>
            c.id === chatId ? { ...c, projectId } : c,
          )
        }
      },
      async onResponse() {
        await refreshNuxtData('chats')
      },
      onResponseError() {
        if (prevList) chats.value = prevList
      },
    })
  }

  return { assignToProject }
}
