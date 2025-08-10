import type { DBMessage } from '../db/schema'
import type { ChatId, ChatMessage, UserId } from '../../shared/types/chat'
import db from '../db'
import { chats, messages, parts } from '../db/schema'
import { eq, desc, and } from 'drizzle-orm'
import { mapToDBMessage, mapUIMessagePartsToDBParts } from '../db/mapper'

export async function getMessagesByChatId(
  userId: UserId,
  chatId: ChatId,
): Promise<DBMessage[]> {
  const chat = await db.query.chats.findFirst({
    where: and(eq(chats.id, chatId), eq(chats.userId, userId)),
  })
  if (!chat) return []

  return db.query.messages.findMany({
    where: eq(messages.chatId, chatId),
    orderBy: desc(messages.createdAt),
    with: { parts: true },
  })
}

export async function upsertMessageByChatId(
  userId: UserId,
  chatId: ChatId,
  message: ChatMessage,
): Promise<void> {
  const chat = await db.query.chats.findFirst({
    where: and(eq(chats.id, chatId), eq(chats.userId, userId)),
  })
  if (!chat) return

  await db.transaction(async (tx) => {
    const newMessage = mapToDBMessage(chatId, message)
    // Upsert message: insert or update on conflict by id
    const [upserted] = await tx
      .insert(messages)
      .values({
        id: newMessage.id,
        chatId: newMessage.chatId,
        role: newMessage.role,
      })
      .onConflictDoUpdate({
        target: messages.id,
        set: {
          chatId: newMessage.chatId,
          role: newMessage.role,
        },
      })
      .returning()
    if (!upserted) return null
    // Remove all parts for this message
    await tx.delete(parts).where(eq(parts.messageId, upserted.id))
    // Insert new parts
    const partRows = mapUIMessagePartsToDBParts(message.parts, upserted.id)
    if (partRows.length) await tx.insert(parts).values(partRows)
  })
}
