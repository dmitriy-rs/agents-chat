import type { Chat } from '~/types'
import { MOCK_CHAT } from './mockData'
import type { ChatMessage } from '../types'

export default function useChat() {
  const chat = ref<Chat>(MOCK_CHAT)

  const messages = computed<ChatMessage[]>(() => chat.value.messages)

  const isEmpty = computed(() => messages.value.length === 0)

  function createMessage(
    message: string,
    role: ChatMessage['role'],
  ): ChatMessage {
    const id = messages.value.length.toString()

    return {
      id,
      role,
      content: message,
    }
  }

  async function sendMessage(message: string) {
    messages.value.push(createMessage(message, 'user'))

    const data = await $fetch<ChatMessage>('/api/ai', {
      method: 'POST',
      body: {
        messages: messages.value
      }
    })

    messages.value.push(data)
  }

  return {
    chat,
    messages,
    isEmpty,

    sendMessage,
  }
}
