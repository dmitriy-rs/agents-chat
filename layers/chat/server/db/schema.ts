import {
  check,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import type { ChatMessage, ChatProviderMetadata } from '../../shared/types/chat'
import { sql } from 'drizzle-orm'
import { uuid } from '../utils'

const timestamps = {
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
}

export const users = pgTable(
  'users',
  {
    id: varchar()
      .primaryKey()
      .$defaultFn(() => uuid()),
    email: varchar(),
    name: varchar(),
    provider: varchar(),
    providerId: varchar().unique(),

    ...timestamps,
  },
  (table) => [
    index('users_email_idx').on(table.email),
    index('users_provider_id_idx').on(table.providerId),
  ],
)

export const projects = pgTable(
  'projects',
  {
    id: varchar()
      .primaryKey()
      .$defaultFn(() => uuid()),
    userId: varchar()
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    name: varchar().notNull(),

    ...timestamps,
  },
  (table) => [index('projects_user_id_idx').on(table.userId)],
)

export const chats = pgTable(
  'chats',
  {
    id: varchar()
      .primaryKey()
      .$defaultFn(() => uuid()),
    userId: varchar()
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    projectId: varchar().references(() => projects.id, { onDelete: 'cascade' }),
    title: varchar().notNull(),

    ...timestamps,
  },
  (table) => [
    index('chats_user_id_idx').on(table.userId),
    index('chats_project_id_idx').on(table.projectId),
    index('chats_user_id_project_id_idx').on(table.userId, table.projectId),
  ],
)

export const messages = pgTable(
  'messages',
  {
    id: varchar()
      .primaryKey()
      .$defaultFn(() => uuid()),
    chatId: varchar()
      .references(() => chats.id, { onDelete: 'cascade' })
      .notNull(),
    role: varchar().$type<ChatMessage['role']>().notNull(),

    ...timestamps,
  },
  (table) => [
    index('messages_chat_id_idx').on(table.chatId),
    index('messages_chat_id_created_at_idx').on(table.chatId, table.createdAt),
  ],
)

export const parts = pgTable(
  'parts',
  {
    id: varchar()
      .primaryKey()
      .$defaultFn(() => uuid()),
    messageId: varchar()
      .references(() => messages.id, { onDelete: 'cascade' })
      .notNull(),
    type: varchar().$type<ChatMessage['parts'][0]['type']>().notNull(),
    ...timestamps,
    order: integer().notNull().default(0),

    // Text fields
    text_text: text(),

    // Reasoning fields
    reasoning_text: text(),

    // File fields
    file_mediaType: varchar(),
    file_filename: varchar(), // optional
    file_url: varchar(),

    // Source url fields
    source_url_sourceId: varchar(),
    source_url_url: varchar(),
    source_url_title: varchar(), // optional

    // Source document fields
    source_document_sourceId: varchar(),
    source_document_mediaType: varchar(),
    source_document_title: varchar(),
    source_document_filename: varchar(), // optional

    providerMetadata: jsonb().$type<ChatProviderMetadata>(),
  },
  (t) => [
    // Indexes for performance optimization
    index('parts_message_id_idx').on(t.messageId),
    index('parts_message_id_order_idx').on(t.messageId, t.order),

    // Check constraints
    check(
      'text_text_required_if_type_is_text',
      // This SQL expression enforces: if type = 'text' then text_text IS NOT NULL
      sql`CASE WHEN ${t.type} = 'text' THEN ${t.text_text} IS NOT NULL ELSE TRUE END`,
    ),
    check(
      'reasoning_text_required_if_type_is_reasoning',
      sql`CASE WHEN ${t.type} = 'reasoning' THEN ${t.reasoning_text} IS NOT NULL ELSE TRUE END`,
    ),
    check(
      'file_fields_required_if_type_is_file',
      sql`CASE WHEN ${t.type} = 'file' THEN ${t.file_mediaType} IS NOT NULL AND ${t.file_url} IS NOT NULL ELSE TRUE END`,
    ),
    check(
      'source_url_fields_required_if_type_is_source_url',
      sql`CASE WHEN ${t.type} = 'source_url' THEN ${t.source_url_sourceId} IS NOT NULL AND ${t.source_url_url} IS NOT NULL ELSE TRUE END`,
    ),
    check(
      'source_document_fields_required_if_type_is_source_document',
      sql`CASE WHEN ${t.type} = 'source_document' THEN ${t.source_document_sourceId} IS NOT NULL AND ${t.source_document_mediaType} IS NOT NULL AND ${t.source_document_title} IS NOT NULL ELSE TRUE END`,
    ),
  ],
)

export type DBMessagePart = typeof parts.$inferInsert
export type DBMessagePartSelect = typeof parts.$inferSelect

export type DBMessage = {
  id: string
  chatId: string
  createdAt: Date
  updatedAt: Date
  role: ChatMessage['role']
  parts: DBMessagePart[]
  metadata?: unknown
}
