import { updateChat } from '../../../repository/chatRepository'
import { generateChatTitle } from '../../../services/ai/llm'
import { createOpenAIModel } from '../../../services/ai/model'

export default defineLazyEventHandler(async () => {
  const openai = createOpenAIModel()

  return defineEventHandler(async (event) => {
    const { id: chatId } = getRouterParams(event)
    const { message } = await readBody<{
      message: ChatMessage
    }>(event)

    const title = await generateChatTitle(openai(), message)

    return updateChat(chatId, {
      title,
    })
  })
})
