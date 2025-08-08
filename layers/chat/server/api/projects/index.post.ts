import { createProject } from '../../repository/projectRepository'
import { CreateProjectSchema } from '../../schemas'
import { invariantResponse } from '../../utils'

export default defineEventHandler(async (event) => {
  const { success, data } = await readValidatedBody(
    event,
    CreateProjectSchema.safeParse,
  )
  invariantResponse(success, 400, 'Bad Request')

  return createProject(data)
})
