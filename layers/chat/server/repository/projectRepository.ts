import type { Project } from '../../shared/types/chat'
import { MOCK_PROJECT } from '../../shared/utils/mockData'
import { uuid } from '../../shared/utils/utils'

const storage = useStorage<Project[]>('db')
const projectsKey = 'projects:all'

async function getProjects() {
  let projects = await storage.getItem(projectsKey)

  if (!projects) {
    projects = [MOCK_PROJECT]
    await saveProjects(projects)
  }

  return projects
}

async function saveProjects(projects: Project[]) {
  await storage.setItem(projectsKey, projects)
}

export async function getAllProjects() {
  const projects = await getProjects()
  return [...projects].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  )
}

export async function getProjectById(id: string) {
  const projects = await getProjects()
  return projects.find((p) => p.id === id) || null
}

export async function createProject(data: { name: string }): Promise<Project> {
  const now = new Date()
  const newProject: Project = {
    id: uuid(),
    name: data.name,
    createdAt: now,
    updatedAt: now,
  }
  const projects = await getProjects()
  projects.push(newProject)
  await saveProjects(projects)
  return newProject
}

export async function updateProject(
  id: string,
  data: { name: string },
): Promise<Project | null> {
  const projects = await getProjects()
  const projectIndex = projects.findIndex((p) => p.id === id)
  if (projectIndex === -1) return null
  const project = projects[projectIndex]
  if (!project) return null
  const updatedProject: Project = {
    id: project.id,
    name: data.name,
    createdAt: project.createdAt,
    updatedAt: new Date(),
  }
  projects[projectIndex] = updatedProject
  await saveProjects(projects)
  return updatedProject
}

export async function deleteProject(id: string): Promise<boolean> {
  const projects = await getProjects()
  const index = projects.findIndex((project) => project.id === id)
  if (index !== -1) {
    projects.splice(index, 1)
    await saveProjects(projects)
    return true
  }
  return false
}
