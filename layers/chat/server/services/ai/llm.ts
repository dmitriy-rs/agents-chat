import type { UIMessage, UIMessageStreamOnFinishCallback } from 'ai'
import type { LanguageModelV2 } from '@ai-sdk/provider'
import {
  convertToModelMessages,
  createUIMessageStream,
  generateText,
  stepCountIs,
  streamText,
} from 'ai'

export async function generateChatResponse(
  model: LanguageModelV2,
  messages: UIMessage[],
) {
  const response = await generateText({
    model,
    messages: convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
  })

  return response.text
}

export async function streamChatResponse({
  model,
  messages,
  onFinish,
}: {
  model: LanguageModelV2
  messages: UIMessage[]
  onFinish: UIMessageStreamOnFinishCallback<ChatMessage>
}) {
  return createUIMessageStream<ChatMessage>({
    execute: ({ writer }) => {
      const result = streamText({
        model,
        messages: convertToModelMessages(messages),
        stopWhen: stepCountIs(5),
      })

      result.consumeStream()

      writer.merge(
        result.toUIMessageStream({
          sendReasoning: false,
        }),
      )
    },
    generateId: uuid,
    onFinish,
    onError: () => {
      return 'Oops, an error occurred!'
    },
  })
}
