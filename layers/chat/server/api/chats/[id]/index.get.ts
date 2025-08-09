import { getChatById } from '../../../repository/chatRepository'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)

  const storage = useStorage('db')
  await storage.setItem('chats:has-new-chat', false)

  return getChatById(id)
})
