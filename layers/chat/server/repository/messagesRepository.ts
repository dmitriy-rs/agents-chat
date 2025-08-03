import { MOCK_MESSAGES } from '../../shared/utils/mockData'
import type { DBMessage } from '../db/schema'
import type { ChatMessage } from '../../shared/types/chat'
import { mapToDBMessage } from '../db/mapper'

const messages: DBMessage[] = MOCK_MESSAGES

export function getLastMessageByChatId(chatId: string): DBMessage | null {
  const chatMessages = messages.filter(
    (m) => m.chatId === chatId && m.role === 'user',
  )
  if (!chatMessages || chatMessages.length === 0) return null
  return chatMessages.reduce((latest, msg) =>
    msg.createdAt > latest.createdAt ? msg : latest,
  )
}

export function deleteMessagesByChatId(chatId: string): void {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].chatId === chatId) {
      messages.splice(i, 1)
    }
  }
}

export function getMessagesByChatId(chatId: string): DBMessage[] {
  const chatMessages = messages.filter((m) => m.chatId === chatId)
  return chatMessages ?? []
}

export async function createMessageByChatId(
  chatId: string,
  message: ChatMessage,
): Promise<DBMessage | null> {
  const newMessage = mapToDBMessage(chatId, message)
  messages.push(newMessage)
  return newMessage
}
