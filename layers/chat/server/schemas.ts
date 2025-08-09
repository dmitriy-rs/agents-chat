import { z } from 'zod'

const MessageRole = z.enum(['user', 'assistant'])

export const MessageSchema = z
  .object({
    parts: z.array(z.any()),
    role: MessageRole,
    id: z.uuid().optional(),
    chatId: z.uuid().optional(),
  })

export const ChatMessageSchema = z
  .object({
    messages: z.array(MessageSchema),
    chatId: z.uuid(),
  })
  .strict()

export const CreateMessageSchema = z
  .object({
    message: MessageSchema,
  })
  .strict()

export const CreateProjectSchema = z
  .object({
    name: z.string().min(1),
  })
  .strict()

export const UpdateProjectSchema = z
  .object({
    name: z.string().min(1),
  })
  .strict()

export const CreateChatSchema = z
  .object({
    title: z.string().min(1).optional(),
    projectId: z.uuid().optional(),
  })
  .strict()

export const UpdateChatTitleSchema = z
  .object({
    message: MessageSchema,
  })
  .strict()
