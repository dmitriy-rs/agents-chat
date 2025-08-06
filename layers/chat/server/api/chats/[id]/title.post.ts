import { updateChat } from '../../../repository/chatRepository'
import { generateChatTitle } from '../../../services/ai/llm'
import { createGroqAIModel } from '../../../services/ai/model'

export default defineLazyEventHandler(async () => {
  const model = createGroqAIModel()

  return defineEventHandler(async (event) => {
    const { id: chatId } = getRouterParams(event)
    const { message } = await readBody<{
      message: ChatMessage
    }>(event)

    const title = await generateChatTitle(model(), message)

    return updateChat(chatId, {
      title,
    })
  })
})
