import type { UIMessage } from 'ai'
import type { Chat } from '../types'

// Mock data for initial messages
const MOCK_MESSAGES: UIMessage[] = [
  {
    id: '1',
    role: 'user',
    parts: [
      {
        type: 'text',
        text: 'Hello, can you help me with my Nuxt.js project?'
      }
    ]
  },
  {
    id: '2',
    role: 'assistant',
    parts: [
      {
        type: 'text',
        text: "Of course! I'd be happy to help with your Nuxt.js project. What specific questions or issues do you have?"
      }
    ]
  },
  {
    id: '3',
    role: 'user',
    parts: [
      {
        type: 'text',
        text: 'How do I implement server-side rendering?'
      }
    ]
  },
  {
    id: '4',
    role: 'assistant',
    parts: [
      {
        type: 'text',
        text:  "Nuxt.js provides server-side rendering out of the box! You don't need to do any special configuration for basic SSR. If you need specific optimizations, we can discuss those in detail.",
      }
    ]
  },
]

// Mock data for initial chat
const MOCK_CHAT: Chat = {
  id: '1',
  title: 'Nuxt.js project help',
  messages: [...MOCK_MESSAGES],
}

export { MOCK_CHAT, MOCK_MESSAGES }
