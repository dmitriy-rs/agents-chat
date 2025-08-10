import type { Project } from '../../shared/types/chat'
import db from '../db'
import { projects } from '../db/schema'
import { and, eq, desc } from 'drizzle-orm'

import {
  type PaginationOptions,
  type PaginatedResponse,
  getPaginationParams,
  getTableCount,
  createPaginatedResponse,
} from '../db/utils'

export async function getAllProjects(
  userId: string,
  options?: PaginationOptions,
): Promise<PaginatedResponse<Project>> {
  const { limit, offset } = getPaginationParams(options)
  const data = await db.query.projects.findMany({
    where: eq(projects.userId, userId),
    orderBy: desc(projects.createdAt),
    limit,
    offset,
  })
  const total = await getTableCount(projects, eq(projects.userId, userId))
  return createPaginatedResponse(data, total, options)
}

export async function getProjectById(
  userId: string,
  id: string,
): Promise<Project | null> {
  const project = await db.query.projects.findFirst({
    where: and(eq(projects.id, id), eq(projects.userId, userId)),
  })
  return project || null
}

export async function createProject(
  userId: string,
  data: { name: string },
): Promise<Project> {
  const [newProject] = await db
    .insert(projects)
    .values({
      userId,
      name: data.name,
    })
    .returning()
  return newProject
}

export async function updateProject(
  userId: string,
  id: string,
  data: { name: string },
): Promise<Project | null> {
  const [updatedProject] = await db
    .update(projects)
    .set({ name: data.name })
    .where(and(eq(projects.id, id), eq(projects.userId, userId)))
    .returning()
  return updatedProject || null
}

export async function deleteProject(
  userId: string,
  id: string,
): Promise<boolean> {
  const result = await db
    .delete(projects)
    .where(and(eq(projects.id, id), eq(projects.userId, userId)))
    .returning()
  return result.length > 0
}
