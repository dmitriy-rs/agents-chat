import { DefaultChatTransport } from 'ai'
import { Chat as AIChat } from '@ai-sdk/vue'

export default function useChat(
  chatId: string,
  initialMessages: ChatMessage[],
) {
  const { chats } = useChats()
  const chat = computed(() => chats.value.find((c) => c.id === chatId))

  const aiChat = new AIChat<ChatMessage>({
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
    aiChat.sendMessage({
      role: 'user' as const,
      parts: [{ type: 'text', text: message }],
    })
  }

  const isPending = computed(() => aiChat.status === 'streaming')
  const messages = computed(() => aiChat.messages)

  return {
    chat,
    messages,
    isPending,
    sendMessage,
  }
}
