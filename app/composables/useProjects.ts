import type { Project } from '../types'
import { MOCK_PROJECT } from './mockData'

export default function useProjects() {
  const projects = useState<Project[]>('projects', () => [MOCK_PROJECT])

  const { createProjectChat } = useChats()

  function createProject() {
    const id = (projects.value.length + 1).toString()

    const existingNewProjects = projects.value.filter((project) =>
      project.name.startsWith('New Project'),
    )
    const nextNewProjectIndex =
      existingNewProjects.length > 0
        ? Math.max(
            ...existingNewProjects.map((p) => {
              const match = p.name.match(/New Project (\d+)/)
              return match ? parseInt(match[1]!) : 0
            }),
          ) + 1
        : 1

    const project = {
      id,
      name: `New Project ${nextNewProjectIndex}`,
    }

    projects.value.push(project)

    createProjectChat(id)
  }

  return { projects, createProject }
}
