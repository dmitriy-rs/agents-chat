import type {
  Chat,
  ChatWithProject,
  ChatMessage,
} from '../../shared/types/chat'
import { MOCK_CHAT } from '../../shared/utils/mockData'
import { getProjectById } from './projectRepository'
import {
  createMessageByChatId,
  deleteMessagesByChatId,
  getLastMessageByChatId,
} from './messagesRepository'
import { uuid } from '../../shared/utils/utils'
import { mapToUIMessage } from '../db/mapper'

const chats: Chat[] = [MOCK_CHAT]

export async function getAllChats(): Promise<ChatWithProject[]> {
  return chats
    .map((chat) => {
      return {
        ...chat,
        latestMessage: getLatestUIMessage(chat.id),
        project: chat.projectId ? getProjectById(chat.projectId) : null,
      }
    })
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
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
  chats.push(newChat)
  return {
    ...newChat,
    project: data.projectId ? getProjectById(data.projectId) || null : null,
    latestMessage: null,
  }
}

export async function getChatById(id: string): Promise<ChatWithProject | null> {
  const chat = chats.find((c) => c.id === id)
  if (!chat) return null
  return {
    ...chat,
    latestMessage: getLatestUIMessage(chat.id),
    project: chat.projectId ? getProjectById(chat.projectId) || null : null,
  }
}

export async function updateChat(
  id: string,
  data: { title?: string; projectId?: string },
): Promise<ChatWithProject | null> {
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
  return {
    ...updatedChat,
    latestMessage: getLatestUIMessage(chat.id),
    project: updatedChat.projectId
      ? getProjectById(updatedChat.projectId) || null
      : null,
  }
}

export async function deleteChat(id: string): Promise<boolean> {
  const index = chats.findIndex((chat) => chat.id === id)
  if (index !== -1) {
    chats.splice(index, 1)
    deleteMessagesByChatId(id)
    return true
  }
  return false
}

export async function createMessageForChat(
  chatId: string,
  data: ChatMessage,
): Promise<void> {
  const chat = chats.find((c) => c.id === chatId)

  if (!chat) {
    return
  }

  await createMessageByChatId(chatId, data)
  chat.updatedAt = new Date()
}

function getLatestUIMessage(chatId: string) {
  const lastMessage = getLastMessageByChatId(chatId)
  return lastMessage && mapToUIMessage(lastMessage)
}
