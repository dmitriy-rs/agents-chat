import type { UIMessage } from 'ai'

export interface Chat {
  id: string
  title: string
  messages: UIMessage[]
  projectId?: string
  createdAt: Date
  updatedAt: Date
}

export interface Project {
  id: string
  name: string
}
