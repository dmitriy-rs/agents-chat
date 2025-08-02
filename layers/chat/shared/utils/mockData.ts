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
  id: '1',
  title: 'Nuxt.js project help',
  projectId: MOCK_PROJECT.id,
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const MOCK_MESSAGES: DBMessage[] = [
  {
    chatId: MOCK_CHAT.id,
    id: uuid(),
    parts: [
      {
        type: 'text',
        text: 'Hello, can you help me with my Nuxt.js project?',
      },
    ],
    role: 'user',
    createdAt: new Date(),
  },
  {
    chatId: MOCK_CHAT.id,
    id: uuid(),
    parts: [
      {
        type: 'text',
        text: "Of course! I'd be happy to help with your Nuxt.js project. What specific questions or issues do you have?",
      },
    ],
    role: 'assistant',
    createdAt: new Date(),
  },
  {
    chatId: MOCK_CHAT.id,
    id: uuid(),
    parts: [
      {
        type: 'text',
        text: 'How do I implement server-side rendering?',
      },
    ],
    role: 'user',
    createdAt: new Date(),
  },
  {
    chatId: MOCK_CHAT.id,
    id: uuid(),
    parts: [
      {
        type: 'text',
        text: "Nuxt.js provides server-side rendering out of the box! You don't need to do any special configuration for basic SSR. If you need specific optimizations, we can discuss those in detail.",
      },
    ],
    role: 'assistant',
    createdAt: new Date(),
  },
]
