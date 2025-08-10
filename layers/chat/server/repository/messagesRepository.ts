import type { DBMessage } from '../db/schema'
import type { ChatId, ChatMessage, UserId } from '../../shared/types/chat'
import db from '../db'
import { messages, parts } from '../db/schema'
import { eq, desc, and } from 'drizzle-orm'
import { mapToDBMessage, mapUIMessagePartsToDBParts } from '../db/mapper'

export async function getMessagesByChatId(
  userId: UserId,
  chatId: ChatId,
): Promise<DBMessage[]> {
  return db.query.messages.findMany({
    where: and(eq(messages.chatId, chatId), eq(messages.userId, userId)),
    orderBy: desc(messages.createdAt),
    with: {
      parts: {
        orderBy: parts.order,
      },
    },
  })
}

export async function upsertMessageByChatId(
  userId: UserId,
  chatId: ChatId,
  message: ChatMessage,
): Promise<void> {
  await db.transaction(async (tx) => {
    const dbMessage = mapToDBMessage(chatId, message)

    // Upsert the message
    const [upsertedMessage] = await tx
      .insert(messages)
      .values({
        id: dbMessage.id,
        chatId: dbMessage.chatId,
        userId,
        role: dbMessage.role,
      })
      .onConflictDoUpdate({
        target: messages.id,
        set: {
          role: dbMessage.role,
          updatedAt: new Date(),
        },
      })
      .returning()

    if (!upsertedMessage) return

    // Replace all parts for this message
    await tx.delete(parts).where(eq(parts.messageId, upsertedMessage.id))

    // Insert new parts if any
    const messageParts = mapUIMessagePartsToDBParts(
      message.parts,
      upsertedMessage.id,
    )
    if (messageParts.length > 0) {
      await tx.insert(parts).values(messageParts)
    }
  })
}
