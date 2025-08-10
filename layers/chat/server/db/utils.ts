import { count } from 'drizzle-orm'
import type { SQL, Table } from 'drizzle-orm'
import db from './index'

export interface PaginationOptions {
  limit?: number
  offset?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  limit: number
  offset: number
  hasMore: boolean
  page: number
  totalPages: number
}

export function getPaginationParams(options?: PaginationOptions) {
  const limit = options?.limit ?? 20
  const offset = options?.offset ?? 0
  return { limit, offset }
}

export async function getTableCount(
  table: Table,
  where?: SQL,
): Promise<number> {
  const query = db.select({ count: count() }).from(table)

  if (where) {
    query.where(where)
  }

  const result = await query
  return Number(result[0]?.count ?? 0)
}

export function createPaginatedResponse<T>(
  data: T[],
  total: number,
  options?: PaginationOptions,
): PaginatedResponse<T> {
  const { limit, offset } = getPaginationParams(options)
  const page = Math.floor(offset / limit) + 1
  const totalPages = Math.ceil(total / limit)
  const hasMore = offset + data.length < total

  return {
    data,
    total,
    limit,
    offset,
    hasMore,
    page,
    totalPages,
  }
}
