import { updateChat } from '../../../repository/chatRepository'
import { UpdateChatTitleSchema } from '../../../schemas'
import { generateChatTitle } from '../../../services/ai/llm'
import { createChatModel } from '../../../services/ai/model'
import { invariantResponse } from '../../../utils'

export default defineLazyEventHandler(async () => {
  const model = createChatModel()

  return defineEventHandler(async (event) => {
    const { id: chatId } = getRouterParams(event)

    const { success, data } = await readValidatedBody(
      event,
      UpdateChatTitleSchema.safeParse,
    )
    invariantResponse(success, 400, 'Bad Request')
    const { message } = data

    const title = await generateChatTitle(model(), message)

    return updateChat(chatId, {
      title,
    })
  })
})
