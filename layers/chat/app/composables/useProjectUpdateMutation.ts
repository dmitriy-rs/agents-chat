export default function useProjectUpdateMutation(projectId: ProjectId) {
  const { data: projects } = useNuxtData<Project[]>('projects')
  const { data: project } = useNuxtData<Project>(`project.${projectId}`)

  async function updateProject(patch: Partial<Project>) {
    let prevList: Project[] | undefined
    let prevSingle: Project | undefined

    await $fetch<Project>(`/api/projects/${projectId}`, {
      method: 'PUT',
      body: patch,
      onRequest() {
        const now = new Date()

        if (projects.value) {
          prevList = projects.value
          projects.value = projects.value.map((p) =>
            p.id === projectId ? { ...p, ...patch, updatedAt: now } : p,
          )
        }

        if (project?.value) {
          prevSingle = project.value
          project.value = { ...project.value, ...patch, updatedAt: now }
        }
      },
      async onResponse() {
        await refreshNuxtData([`project.${projectId}`])
      },
      onResponseError() {
        if (prevList) projects.value = prevList
        if (prevSingle && project) project.value = prevSingle
      },
    })
  }

  return { updateProject }
}
