import type { UIMessage } from 'ai'

export type ChatMessage = UIMessage<{
  createdAt: string
}>

export interface Chat {
  id: string
  title: string
  projectId?: string
  createdAt: Date
  updatedAt: Date
}

export interface Project {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface ChatWithProject extends Chat {
  project: Project | null
  latestMessage: ChatMessage | null
}
