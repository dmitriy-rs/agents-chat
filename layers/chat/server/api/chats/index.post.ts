import { createChat } from '../../repository/chatRepository'

export default defineEventHandler(async (event) => {
  const { title, projectId } = await readBody<{
    title: string
    projectId?: string
  }>(event)

  const storage = useStorage('db')
  await storage.setItem('chats:has-new-chat', true)

  return createChat({
    title,
    projectId,
  })
})
