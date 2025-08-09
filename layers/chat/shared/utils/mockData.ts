import type { DBMessage } from '../../server/db/schema'
import type { Chat, Project } from '../types/chat'
import { uuid } from './utils'

export const MOCK_PROJECT: Project = {
  id: uuid(),
  name: 'Nuxt Project',
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const MOCK_CHAT: Chat = {
  id: '1' as Chat['id'],
  title: 'Nuxt.js project help',
  // projectId: MOCK_PROJECT.id,
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const MOCK_MESSAGES: DBMessage[] = [
  {
    chatId: MOCK_CHAT.id,
    id: '1',
    parts: [
      {
        messageId: '1',
        type: 'text' as const,
        text_text: 'Hello, can you help me with my Nuxt.js project?',
      },
    ],
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    chatId: MOCK_CHAT.id,
    id: '2',
    parts: [
      {
        messageId: '2',
        type: 'text',
        text_text:
          "Of course! I'd be happy to help with your Nuxt.js project. What specific questions or issues do you have?",
      },
    ],
    role: 'assistant',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    chatId: MOCK_CHAT.id,
    id: '3',
    parts: [
      {
        messageId: '3',
        type: 'text',
        text_text: 'How do I implement server-side rendering?',
      },
    ],
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    chatId: MOCK_CHAT.id,
    id: '4',
    parts: [
      {
        messageId: '4',
        type: 'text',
        text_text:
          "Nuxt.js provides server-side rendering out of the box! You don't need to do any special configuration for basic SSR. If you need specific optimizations, we can discuss those in detail.",
      },
    ],
    role: 'assistant',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
