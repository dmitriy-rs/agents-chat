import {
  updateProject,
  getProjectById,
} from '../../repository/projectRepository'
import { UpdateProjectSchema } from '../../schemas'
import { invariantResponse } from '../../utils'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)

  const { success, data } = await readValidatedBody(
    event,
    UpdateProjectSchema.safeParse,
  )
  invariantResponse(success, 400, 'Bad Request')
  const { name } = data

  const project = await getProjectById(id)
  invariantResponse(project, 404, 'Not Found')

  return updateProject(id, { name })
})
