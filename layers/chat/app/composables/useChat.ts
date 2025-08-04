import { DefaultChatTransport } from 'ai'
import { Chat as AIChat } from '@ai-sdk/vue'
import { useGenerateChatTitle } from '#imports'

export default function useChat(
  chatId: ChatId,
  initialMessages: ChatMessage[],
) {
  const { generateChatTitle } = useGenerateChatTitle(chatId)

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

  async function sendMessage(prompt: string) {
    const message: Omit<ChatMessage, 'id'> = {
      role: 'user' as const,
      parts: [{ type: 'text' as const, text: prompt }],
    }

    if (chat.messages.length === 0) {
      generateChatTitle(message)
    }

    chat.sendMessage(message)
  }

  const isPending = computed(() => chat.status === 'streaming')

  return {
    chat,
    isPending,

    sendMessage,
  }
}
