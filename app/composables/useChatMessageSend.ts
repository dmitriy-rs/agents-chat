import type { UIMessage } from 'ai'

export function useChatMessageSend(messages: Ref<UIMessage[]>) {
  const isPending = ref(false)

  function createMessage(message: string, role: UIMessage['role']): UIMessage {
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
    }
  }

  async function sendMessage(message: string) {
    isPending.value = true
    messages.value.push(createMessage(message, 'user'))

    const data = await $fetch<UIMessage>('/api/ai', {
      method: 'POST',
      body: {
        messages: messages.value,
      },
    })

    messages.value.push(data)
    isPending.value = false
  }

  return {
    isPending,
    sendMessage,
  }
}
