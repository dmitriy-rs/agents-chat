import { convertToUIMessages } from '../../../../db/utils'
import {
  getMessagesByChatId,
  createMessagesByChatId,
  createMessageByChatId,
} from '../../../../repository/messagesRepository'
import { createOpenAIModel } from '../../../../services/ai/model'
import { streamChatResponse } from '../../../../services/ai/llm'
import { JsonToSseTransformStream } from 'ai'

export default defineLazyEventHandler(async () => {
  const openai = createOpenAIModel()

  return defineEventHandler(async (event) => {
    const { id: chatId } = getRouterParams(event)
    const { message } = await readBody<{
      message: ChatMessage
    }>(event)

    const dbMessages = getMessagesByChatId(chatId)
    const messages = [...convertToUIMessages(dbMessages), message]

    await createMessageByChatId(chatId, message)

    const stream = await streamChatResponse({
      model: openai('gpt-4o-mini'),
      messages,
      onFinish: async ({ messages }) => {
        await createMessagesByChatId(chatId, messages)
      },
    })

    return stream.pipeThrough(new JsonToSseTransformStream())
  })
})
