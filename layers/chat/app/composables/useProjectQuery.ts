export default async function useProjectQuery(projectId: ProjectId) {
  const { data: project } = await useFetch<Project>(
    `/api/projects/${projectId}`,
    {
      method: 'GET',
      key: `project.${projectId}`,
    },
  )

  return { project }
}
