import type { UIMessage } from 'ai'

export type DBMessage = {
  id: string
  chatId: string
  createdAt: Date
  role: UIMessage['role']
  parts: unknown
}
