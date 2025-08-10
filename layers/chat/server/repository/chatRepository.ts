import type {
  ChatWithProject,
  ChatMessage,
  UserId,
} from '../../shared/types/chat'
import { createMessageByChatId } from './messagesRepository'
import { mapToUIMessage } from '../db/mapper'
import db from '../db'
import { chats, projects, messages, parts } from '../db/schema'
import { eq, desc, and } from 'drizzle-orm'
import {
  type PaginationOptions,
  type PaginatedResponse,
  getPaginationParams,
  getTableCount,
  createPaginatedResponse,
} from '../db/utils'

export async function getAllChats(
  userId: UserId,
  options?: PaginationOptions,
): Promise<PaginatedResponse<ChatWithProject>> {
  const { limit, offset } = getPaginationParams(options)

  const chatsWithRelations = await db.query.chats.findMany({
    where: eq(chats.userId, userId),
    with: {
      project: true,
      messages: {
        where: eq(messages.role, 'user'),
        orderBy: desc(messages.createdAt),
        limit: 1,
        with: {
          parts: {
            orderBy: parts.order,
          },
        },
      },
    },
    orderBy: desc(chats.updatedAt),
    limit,
    offset,
  })

  const total = await getTableCount(chats, eq(chats.userId, userId))
  const data = chatsWithRelations.map((chat) => ({
    ...chat,
    latestMessage: mapToUIMessage(chat.messages[0]),
  }))

  return createPaginatedResponse(data, total, options)
}

export async function createChat(
  userId: UserId,
  data: {
    title?: string
    projectId?: string
  },
): Promise<ChatWithProject | null> {
  const [newChat] = await db
    .insert(chats)
    .values({
      title: data.title || 'New Chat',
      projectId: data.projectId,
      userId,
    })
    .returning()

  const project = data.projectId
    ? await db.query.projects.findFirst({
        where: eq(projects.id, data.projectId),
      })
    : null

  return {
    ...newChat,
    project: project || null,
    latestMessage: null,
  }
}

export async function getChatById(
  userId: string,
  chatId: string,
): Promise<ChatWithProject | null> {
  const chat = await db.query.chats.findFirst({
    where: and(eq(chats.id, chatId), eq(chats.userId, userId)),
    with: {
      project: true,
      messages: {
        where: eq(messages.role, 'user'),
        orderBy: desc(messages.createdAt),
        limit: 1,
        with: {
          parts: {
            orderBy: parts.order,
          },
        },
      },
    },
  })

  if (!chat) return null

  return {
    ...chat,
    latestMessage: mapToUIMessage(chat.messages[0]),
  }
}

export async function updateChat(
  userId: string,
  {
    title,
    projectId,
    chatId,
  }: { title?: string; projectId?: string; chatId: string },
): Promise<ChatWithProject | null> {
  const [updatedChat] = await db
    .update(chats)
    .set({
      projectId,
      title,
    })
    .where(and(eq(chats.id, chatId), eq(chats.userId, userId)))
    .returning()

  if (!updatedChat) return null

  return getChatById(userId, updatedChat.id)
}

export async function deleteChat(
  userId: string,
  chatId: string,
): Promise<boolean> {
  const result = await db
    .delete(chats)
    .where(and(eq(chats.id, chatId), eq(chats.userId, userId)))
    .returning()

  return result.length > 0
}

export async function createMessageForChat(
  userId: string,
  chatId: string,
  data: ChatMessage,
): Promise<void> {
  const chat = await db.query.chats.findFirst({
    where: and(eq(chats.id, chatId), eq(chats.userId, userId)),
  })

  if (!chat) {
    return
  }

  await createMessageByChatId(chatId, data)

  await db
    .update(chats)
    .set({ updatedAt: new Date() })
    .where(eq(chats.id, chatId))
}
