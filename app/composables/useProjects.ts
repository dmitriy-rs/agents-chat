import type { Project } from '../types'
import { MOCK_PROJECT } from './mockData'

export default function useProjects() {
  const projects = useState<Project[]>('projects', () => [MOCK_PROJECT])

  const { createProjectChat } = useChats()

  function createProject() {
    const id = (projects.value.length + 1).toString()
    const project = {
      id,
      name: 'New Project',
    }

    projects.value.push(project)

    createProjectChat(id)
  }

  return { projects, createProject }
}
