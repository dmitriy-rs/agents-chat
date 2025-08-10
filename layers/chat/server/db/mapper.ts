import type { ChatMessage, ChatMessagePart } from '../../shared/types/chat'
import type { DBMessage, DBMessagePart } from './schema'
import { formatISO } from 'date-fns'

export function mapToUIMessage(message: DBMessage): ChatMessage {
  const { id, role, parts, createdAt, updatedAt } = message
  return {
    id,
    role: role as ChatMessage['role'],
    parts: mapDBPartToUIMessagePart(parts),
    metadata: {
      createdAt: formatISO(createdAt),
      updatedAt: formatISO(updatedAt),
    },
  }
}

export function mapToDBMessage(
  chatId: string,
  message: ChatMessage,
): DBMessage {
  return {
    id: message.id,
    role: message.role as 'user' | 'assistant' | 'system',
    parts: mapUIMessagePartsToDBParts(message.parts, message.id),
    createdAt: message.metadata?.createdAt
      ? new Date(message.metadata.createdAt)
      : new Date(),
    updatedAt: message.metadata?.updatedAt
      ? new Date(message.metadata.updatedAt)
      : new Date(),
    chatId,
  }
}

export const mapUIMessagePartsToDBParts = (
  messageParts: ChatMessagePart[],
  messageId: string,
): DBMessagePart[] => {
  return messageParts.map((part, index) => {
    switch (part.type) {
      case 'text':
        return {
          messageId,
          order: index,
          type: part.type,
          text_text: part.text,
        }
      case 'reasoning':
        return {
          messageId,
          order: index,
          type: part.type,
          reasoning_text: part.text,
          providerMetadata: part.providerMetadata,
        }
      case 'file':
        return {
          messageId,
          order: index,
          type: part.type,
          file_mediaType: part.mediaType,
          file_filename: part.filename,
          file_url: part.url,
        }
      case 'source-document':
        return {
          messageId,
          order: index,
          type: part.type,
          source_document_sourceId: part.sourceId,
          source_document_mediaType: part.mediaType,
          source_document_title: part.title,
          source_document_filename: part.filename,
          providerMetadata: part.providerMetadata,
        }
      case 'source-url':
        return {
          messageId,
          order: index,
          type: part.type,
          source_url_sourceId: part.sourceId,
          source_url_url: part.url,
          source_url_title: part.title,
          providerMetadata: part.providerMetadata,
        }
      case 'step-start':
        return {
          messageId,
          order: index,
          type: part.type,
        }
      default:
        throw new Error(`Unsupported part type: ${part}`)
    }
  })
}

export const mapDBPartToUIMessagePart = (
  messageParts: DBMessagePart[],
): ChatMessagePart[] => {
  return messageParts.map((part) => {
    switch (part.type) {
      case 'text':
        return {
          type: part.type,
          text: part.text_text!,
        }
      case 'reasoning':
        return {
          type: part.type,
          text: part.reasoning_text!,
          providerMetadata: part.providerMetadata ?? undefined,
        }
      case 'file':
        return {
          type: part.type,
          mediaType: part.file_mediaType!,
          filename: part.file_filename!,
          url: part.file_url!,
        }
      case 'source-document':
        return {
          type: part.type,
          sourceId: part.source_document_sourceId!,
          mediaType: part.source_document_mediaType!,
          title: part.source_document_title!,
          filename: part.source_document_filename!,
          providerMetadata: part.providerMetadata ?? undefined,
        }
      case 'source-url':
        return {
          type: part.type,
          sourceId: part.source_url_sourceId!,
          url: part.source_url_url!,
          title: part.source_url_title!,
          providerMetadata: part.providerMetadata ?? undefined,
        }
      case 'step-start':
        return {
          type: part.type,
        }
      default:
        throw new Error(`Unsupported part type: ${part.type}`)
    }
  })
}
