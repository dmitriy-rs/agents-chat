import type { Chat } from '~/types'
import { MOCK_CHAT } from './mockData'
import type { UIMessage } from 'ai'
import { createSharedComposable } from '@vueuse/core'

function useChat() {
  const chat = ref<Chat>(MOCK_CHAT)
  const isLoading = ref(false)

  const messages = computed<UIMessage[]>(() => chat.value.messages)

  const isEmpty = computed(() => messages.value.length === 0)

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
    isLoading.value = true
    messages.value.push(createMessage(message, 'user'))

    const data = await $fetch<UIMessage>('/api/ai', {
      method: 'POST',
      body: {
        messages: messages.value,
      },
    })

    messages.value.push(data)
    isLoading.value = false
  }

  return {
    chat,
    messages,
    isEmpty,
    isLoading,

    sendMessage,
  }
}

export default createSharedComposable(useChat)
