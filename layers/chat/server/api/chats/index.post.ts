import { createChat } from '../../repository/chatRepository'

export default defineEventHandler(async () => {
  return createChat({
    title: 'Untitled chat',
  })
})
