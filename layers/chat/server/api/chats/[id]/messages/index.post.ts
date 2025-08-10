import { getMessagesByChatId } from '../../../../repository/messagesRepository'
import { streamChatResponse } from '../../../../services/ai/llm'
import { JsonToSseTransformStream } from 'ai'
import { createMessageForChat } from '../../../../repository/chatRepository'
import { mapToUIMessage } from '../../../../db/mapper'
import { CreateMessageSchema } from '../../../../schemas'
import { invariantResponse } from '../../../../utils'
import { createOpenAIModel } from '../../../../services/ai/model'

export default defineLazyEventHandler(async () => {
  const model = createOpenAIModel()

  return defineEventHandler(async (event) => {
    const { id: chatId } = getRouterParams(event)
    const { success, data, error } = await readValidatedBody(
      event,
      CreateMessageSchema.safeParse,
    )
    invariantResponse(success, 400, `Bad Request`, error)
    const { message } = data

    await createMessageForChat(chatId, {
      ...message,
      id: uuid(),
    })

    const dbMessages = await getMessagesByChatId(chatId)
    const messages = dbMessages.map(mapToUIMessage)

    const stream = await streamChatResponse({
      model: model('gpt-4o'),
      messages,
      onFinish: async ({ responseMessage }) => {
        await createMessageForChat(chatId, responseMessage)
      },
    })

    return stream.pipeThrough(new JsonToSseTransformStream())
  })
})
