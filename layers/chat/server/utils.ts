import type { H3Error } from 'h3'
import { createError } from 'h3'

export function invariantResponse<T>(
  condition: T,
  statusCode: number,
  statusMessage: string,
): asserts condition {
  if (!condition) {
    throw createError({
      statusCode,
      statusMessage,
    }) as H3Error
  }
}
