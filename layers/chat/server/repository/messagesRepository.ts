import { MOCK_MESSAGES } from '../../shared/utils/mockData'
import type { DBMessage } from '../db/schema'
import type { ChatMessage } from '../../shared/types/chat'
import { mapToDBMessage } from '../db/mapper'

const storage = useStorage<DBMessage[]>('db')
const messagesKey = 'messages:all'

async function getMessages() {
  let messages = await storage.getItem(messagesKey)

  if (!messages) {
    messages = MOCK_MESSAGES
    await saveMessages(messages)
  }

  return messages
}

async function saveMessages(messages: DBMessage[]) {
  await storage.setItem(messagesKey, messages)
}

export async function getLastMessageByChatId(
  chatId: string,
): Promise<DBMessage | null> {
  const messages = await getMessages()
  const chatMessages = messages.filter(
    (m) => m.chatId === chatId && m.role === 'user',
  )
  if (!chatMessages || chatMessages.length === 0) return null
  return chatMessages.reduce((latest, msg) =>
    msg.createdAt > latest.createdAt ? msg : latest,
  )
}

export async function deleteMessagesByChatId(chatId: string) {
  const messages = await getMessages()
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].chatId === chatId) {
      messages.splice(i, 1)
    }
  }
  await saveMessages(messages)
}

export async function getMessagesByChatId(
  chatId: string,
): Promise<DBMessage[]> {
  const messages = await getMessages()
  const chatMessages = messages.filter((m) => m.chatId === chatId)
  return chatMessages ?? []
}

export async function createMessageByChatId(
  chatId: string,
  message: ChatMessage,
): Promise<DBMessage | null> {
  const newMessage = mapToDBMessage(chatId, message)
  const messages = await getMessages()
  messages.push(newMessage)
  await saveMessages(messages)
  return newMessage
}
