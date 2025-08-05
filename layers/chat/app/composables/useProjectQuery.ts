export default async function useProjectQuery(projectId: ProjectId) {
  const { data: project } = await useFetch<Project>(
    `/api/projects/${projectId}`,
    {
      method: 'GET',
      key: `project.${projectId}`,
    },
  )

  async function updateProject(updatedProject: Partial<Project>) {
    await $fetch<Project>(`/api/projects/${projectId}`, {
      method: 'PUT',
      body: {
        ...updatedProject,
      },
      async onResponse() {
        await refreshNuxtData(`project.${projectId}`)
      },
    })
  }

  return { project, updateProject }
}
