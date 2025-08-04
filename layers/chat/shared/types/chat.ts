/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { InferUITools, JSONValue, UIMessage, UIMessagePart } from 'ai'
import { z } from 'zod'

type Brand<T> = string & { __brand: T }

export type ChatId = Brand<'ChatId'>
export type ProjectId = Brand<'ProjectId'>

export interface Chat {
  id: ChatId
  title: string
  projectId?: string
  createdAt: Date
  updatedAt: Date
}

export interface Project {
  id: ProjectId
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface ChatWithProject extends Chat {
  project: Project | null
  latestMessage: ChatMessage | null
}

export const metadataSchema = z.object({
  createdAt: z.string(),
})

export type ChatMessageMetadata = z.infer<typeof metadataSchema>

export const dataPartSchema = z.object({})

export type ChatDataPart = z.infer<typeof dataPartSchema>

export type ChatToolSet = InferUITools<{}>

export type ChatMessagePart = UIMessagePart<{}, ChatToolSet>

export type ChatMessage = UIMessage<ChatMessageMetadata, {}, {}>

export type ChatProviderMetadata = Record<string, Record<string, JSONValue>>
