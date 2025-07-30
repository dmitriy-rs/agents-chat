import type { Chat } from '~/types'
import { MOCK_CHAT } from './mockData'
import type { UIMessage } from 'ai'

export default function useChatQuery() {
  const chat = ref<Chat>(MOCK_CHAT)
  const isLoading = ref(false)

  const messages = computed<UIMessage[]>(() => chat.value.messages)

  return {
    chat,
    messages,
    isLoading,
  }
}
