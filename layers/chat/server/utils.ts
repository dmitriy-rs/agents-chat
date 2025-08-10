import type { H3Error } from 'h3'
import { createError } from 'h3'
import z from 'zod'
import { v4 } from 'uuid'

export function uuid<T extends string>() {
  return v4() as T
}

export function invariantResponse<T>(
  condition: T,
  statusCode: number,
  statusMessage: string,
  error?: z.ZodError | null,
): asserts condition {
  if (!condition) {
    throw createError({
      statusCode,
      statusMessage,
      data: error && z.flattenError(error),
    }) as H3Error
  }
}
