import type { UIMessage, UIMessageStreamOnFinishCallback } from 'ai'
import type { LanguageModelV2 } from '@ai-sdk/provider'
import {
  convertToModelMessages,
  createUIMessageStream,
  generateId,
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
  messages: ChatMessage[]
  onFinish: UIMessageStreamOnFinishCallback<ChatMessage>
}) {
  return createUIMessageStream<ChatMessage>({
    execute: ({ writer }) => {
      // if the last message is a user message, create our own start step so we can start streaming data
      // if assistant message (e.g. adding tool result, we want to keep that as part of the previous step)
      const lastMessage = messages.at(-1)!
      if (lastMessage.role === 'user') {
        writer.write({
          type: 'start',
          messageId: generateId(),
        })
        writer.write({
          type: 'start-step',
        })
      }

      const result = streamText({
        model,
        messages: convertToModelMessages(messages),
        stopWhen: stepCountIs(5),
      })

      result.consumeStream()

      writer.merge(
        result.toUIMessageStream({
          sendStart: false,
          sendReasoning: false,
        }),
      )
    },
    originalMessages: messages,
    onFinish,
    onError: (error) => {
      return error instanceof Error ? error.message : String(error)
    },
  })
}

export async function generateChatTitle(
  model: LanguageModelV2,
  firstMessage: UIMessage,
) {
  const response = await generateText({
    model,
    messages: [
      {
        role: 'system',
        content:
          'Summarize the key points of the conversation in a concise way that would be helpful as context for future interactions. Make the message in 3 or less shirt words. Do not put any punctuation marks. Always start with the capital letter.',
      },
      ...convertToModelMessages([firstMessage]),
    ],
  })

  return response.text
}
