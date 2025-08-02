import type { UIMessage } from 'ai'
import { generateChatResponse } from '../services/ai/llm'
import { createOpenAIModel } from '../services/ai/model'
import { formatISO } from 'date-fns/fp'

export default defineLazyEventHandler(async () => {
  const openai = createOpenAIModel()

  return defineEventHandler(async (event) => {
    const body = await readBody<{ messages: UIMessage[] }>(event)
    const { messages } = body

    const id = messages.length.toString()

    const openaiModel = openai()
    const response = await generateChatResponse(openaiModel, messages)

    return {
      id,
      role: 'assistant',
      parts: [
        {
          type: 'text',
          text: response,
        },
      ],
      metadata: {
        createdAt: formatISO(new Date()),
      },
    } satisfies ChatMessage
  })
})
