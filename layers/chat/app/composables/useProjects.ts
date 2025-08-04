export default function useProjects() {
  const { data: projects } = useFetch<Project[]>('/api/projects', {
    method: 'GET',
    default: () => [],
  })

  // const { createChatInProject } = useChats()

  async function createProject() {
    await $fetch<Project>('/api/projects', {
      method: 'POST',
      body: {
        name: 'New Project',
      },
    })

    // await createChatInProject(project.id)
  }

  return { projects, createProject }
}
