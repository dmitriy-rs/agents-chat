import type {
  Chat,
  ChatWithProject,
  ChatMessage,
} from '../../shared/types/chat'
import { getProjectById } from './projectRepository'
import {
  createMessageByChatId,
  deleteMessagesByChatId,
  getLastMessageByChatId,
} from './messagesRepository'
import { uuid } from '../../shared/utils/utils'
import { mapToUIMessage } from '../db/mapper'

const storage = useStorage<Chat[]>('db')
const chatsKey = 'chats:all'

async function getChats() {
  let chats = await storage.getItem(chatsKey)

  if (!chats) {
    chats = [MOCK_CHAT]
    await saveChats(chats)
  }

  return chats
}

async function saveChats(chats: Chat[]) {
  await storage.setItem(chatsKey, chats)
}

export async function getAllChats(): Promise<ChatWithProject[]> {
  const chats = await getChats()
  const transformedChats = await Promise.all(
    chats.map(async (chat) => {
      return {
        ...chat,
        latestMessage: await getLatestUIMessage(chat.id),
        project: chat.projectId ? await getProjectById(chat.projectId) : null,
      }
    }),
  )
  return transformedChats.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  )
}

export async function createChat(data: {
  title?: string
  projectId?: string
}): Promise<ChatWithProject | null> {
  const now = new Date()
  const newChat: Chat = {
    id: uuid(),
    title: data.title || 'New Chat',
    projectId: data.projectId,
    createdAt: now,
    updatedAt: now,
  }
  const chats = await getChats()
  chats.push(newChat)
  await saveChats(chats)
  return {
    ...newChat,
    project: data.projectId
      ? (await getProjectById(data.projectId)) || null
      : null,
    latestMessage: null,
  }
}

export async function getChatById(id: string): Promise<ChatWithProject | null> {
  const chats = await getChats()
  const chat = chats.find((c) => c.id === id)
  if (!chat) return null
  return {
    ...chat,
    latestMessage: await getLatestUIMessage(chat.id),
    project: chat.projectId
      ? (await getProjectById(chat.projectId)) || null
      : null,
  }
}

export async function updateChat(
  id: string,
  data: { title?: string; projectId?: string },
): Promise<ChatWithProject | null> {
  const chats = await getChats()
  const chatIndex = chats.findIndex((c) => c.id === id)
  if (chatIndex === -1) return null
  const chat = chats[chatIndex]
  if (!chat) return null
  const updatedChat: Chat = {
    ...chat,
    ...(data.title && { title: data.title }),
    ...(data.projectId !== undefined && {
      projectId: data.projectId,
    }),
    updatedAt: new Date(),
  }
  chats[chatIndex] = updatedChat
  await saveChats(chats)
  return {
    ...updatedChat,
    latestMessage: await getLatestUIMessage(chat.id),
    project: updatedChat.projectId
      ? (await getProjectById(updatedChat.projectId)) || null
      : null,
  }
}

export async function deleteChat(id: string): Promise<boolean> {
  const chats = await getChats()
  const index = chats.findIndex((chat) => chat.id === id)
  if (index !== -1) {
    chats.splice(index, 1)
    deleteMessagesByChatId(id)
    await saveChats(chats)
    return true
  }
  return false
}

export async function createMessageForChat(
  chatId: string,
  data: ChatMessage,
): Promise<void> {
  const chats = await getChats()
  const chat = chats.find((c) => c.id === chatId)

  if (!chat) {
    return
  }

  await createMessageByChatId(chatId, data)
  chat.updatedAt = new Date()
  await saveChats(chats)
}

async function getLatestUIMessage(chatId: string) {
  const lastMessage = await getLastMessageByChatId(chatId)
  return lastMessage && mapToUIMessage(lastMessage)
}
