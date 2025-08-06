import { getMessagesByChatId } from '../../../../repository/messagesRepository'
import { createGroqAIModel } from '../../../../services/ai/model'
import { streamChatResponse } from '../../../../services/ai/llm'
import { JsonToSseTransformStream } from 'ai'
import { createMessageForChat } from '../../../../repository/chatRepository'
import { mapToUIMessage } from '../../../../db/mapper'

export default defineLazyEventHandler(async () => {
  const model = createGroqAIModel()

  return defineEventHandler(async (event) => {
    const { id: chatId } = getRouterParams(event)
    const { message } = await readBody<{
      message: Omit<ChatMessage, 'id'>
    }>(event)

    await createMessageForChat(chatId, {
      ...message,
      id: uuid(),
    })

    const dbMessages = await getMessagesByChatId(chatId)
    const messages = dbMessages.map(mapToUIMessage)

    const stream = await streamChatResponse({
      model: model(),
      messages,
      onFinish: async ({ responseMessage }) => {
        await createMessageForChat(chatId, responseMessage)
      },
    })

    return stream.pipeThrough(new JsonToSseTransformStream())
  })
})
