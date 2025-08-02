import { DefaultChatTransport } from 'ai'
import { Chat as AIChat } from '@ai-sdk/vue'

export default function useChat(
  chatId: string,
  initialMessages: ChatMessage[],
) {
  const chat = new AIChat<ChatMessage>({
    id: chatId,
    messages: initialMessages,
    generateId: uuid,
    transport: new DefaultChatTransport({
      api: `/api/chats/${chatId}/messages`,
      prepareSendMessagesRequest({ messages, id, body }) {
        return {
          body: {
            id,
            message: messages.at(-1),
            ...body,
          },
        }
      },
    }),
  })

  async function sendMessage(message: string) {
    chat.sendMessage({
      role: 'user' as const,
      parts: [{ type: 'text', text: message }],
    })
  }

  const isPending = computed(() => chat.status === 'streaming')

  return {
    chat,
    isPending,

    sendMessage,
  }
}
