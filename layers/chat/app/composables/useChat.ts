import type { UIMessage } from 'ai'

export default function useChat(chatId: string) {
  const { chats } = useChats()
  const chat = computed(() => chats.value.find((c) => c.id === chatId))

  const messages = computed(() => chat.value?.messages ?? [])

  const isPending = ref(false)

  function createMessage(
    message: string,
    role: UIMessage['role'],
  ): ChatMessage {
    const id = messages.value.length.toString()

    return {
      id,
      role,
      parts: [
        {
          type: 'text',
          text: message,
        },
      ],
      metadata: {
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }
  }

  async function sendMessage(message: string) {
    if (!chat.value) return
    isPending.value = true
    messages.value.push(createMessage(message, 'user'))

    const data = await $fetch<ChatMessage>('/api/ai', {
      method: 'POST',
      body: {
        messages: messages.value,
      },
    })

    chat.value.updatedAt = new Date()
    messages.value.push(data)
    isPending.value = false
  }

  return {
    chat,
    messages,
    isPending,
    sendMessage,
  }
}
