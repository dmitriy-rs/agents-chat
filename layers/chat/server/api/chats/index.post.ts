import { createChat } from '../../repository/chatRepository'
import { CreateChatSchema } from '../../schemas'
import { invariantResponse } from '../../utils'

export default defineEventHandler(async (event) => {
  const { success, data } = await readValidatedBody(
    event,
    CreateChatSchema.safeParse,
  )
  invariantResponse(success, 400, 'Bad Request')
  const { title, projectId } = data

  const storage = useStorage('db')
  await storage.setItem('chats:has-new-chat', true)

  return createChat({
    title,
    projectId,
  })
})
