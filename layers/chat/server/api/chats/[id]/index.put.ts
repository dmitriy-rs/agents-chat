import { updateChat } from '../../../repository/chatRepository'
import { UpdateChatSchema } from '../../../schemas'
import { invariantResponse } from '../../../utils'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)

  const { success, data } = await readValidatedBody(
    event,
    UpdateChatSchema.safeParse,
  )
  invariantResponse(success, 400, 'Bad Request')

  const storage = useStorage('db')
  await storage.setItem('chats:has-new-chat', true)

  return updateChat(id, data)
})
