import type { ChatMessage } from '../../shared/types/chat'
import type { DBMessage } from '../../shared/types/schema'
import { formatISO } from 'date-fns'

export function convertToUIMessages(messages: DBMessage[]): ChatMessage[] {
  return messages.map(convertToUIMessage)
}

export function convertToUIMessage(message: DBMessage): ChatMessage {
  return {
    id: message.id,
    role: message.role as 'user' | 'assistant' | 'system',
    parts: message.parts as ChatMessage['parts'],
    metadata: {
      createdAt: formatISO(message.createdAt),
    },
  }
}
