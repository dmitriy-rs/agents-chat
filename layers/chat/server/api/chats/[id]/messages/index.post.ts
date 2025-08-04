import { getMessagesByChatId } from '../../../../repository/messagesRepository'
import { createOpenAIModel } from '../../../../services/ai/model'
import { streamChatResponse } from '../../../../services/ai/llm'
import { JsonToSseTransformStream } from 'ai'
import { createMessageForChat } from '../../../../repository/chatRepository'
import { mapToUIMessage } from '../../../../db/mapper'

export default defineLazyEventHandler(async () => {
  const openai = createOpenAIModel()

  return defineEventHandler(async (event) => {
    const { id: chatId } = getRouterParams(event)
    const { message } = await readBody<{
      message: Omit<ChatMessage, 'id'>
    }>(event)

    await createMessageForChat(chatId, {
      ...message,
      id: uuid(),
    })

    const dbMessages = getMessagesByChatId(chatId)
    const messages = dbMessages.map(mapToUIMessage)

    const stream = await streamChatResponse({
      model: openai('gpt-4o-mini'),
      messages,
      onFinish: async ({ responseMessage }) => {
        await createMessageForChat(chatId, responseMessage)
      },
    })

    return stream.pipeThrough(new JsonToSseTransformStream())
  })
})
