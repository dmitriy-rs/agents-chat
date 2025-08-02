import { createChat } from '../../repository/chatRepository'

export default defineEventHandler(async (event) => {
  const { title, projectId } = await readBody<{
    title: string
    projectId?: string
  }>(event)

  return createChat({
    title,
    projectId,
  })
})
