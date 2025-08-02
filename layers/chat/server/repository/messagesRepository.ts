import { MOCK_MESSAGES } from '../../shared/utils/mockData'
import type { DBMessage } from '../db/schema'
import { v4 as uuidv4 } from 'uuid'
import type { ChatMessage } from '../../shared/types/chat'

const messages: DBMessage[] = MOCK_MESSAGES

export function getLastMessageByChatId(chatId: string): DBMessage | null {
  const chatMessages = messages.filter(
    (m) => m.id === chatId && m.role === 'user',
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
  const chatMessages = messages.filter((m) => m.id === chatId)
  return (chatMessages ?? []).sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  )
}

export async function createMessageByChatId({
  chatId,
  parts,
  role,
}: {
  parts: ChatMessage['parts']
  role: 'user' | 'assistant'
  chatId: string
}): Promise<DBMessage | null> {
  const newMessage: DBMessage = {
    id: uuidv4(),
    chatId,
    parts,
    role,
    createdAt: new Date(),
  }
  messages.push(newMessage)
  return newMessage
}
