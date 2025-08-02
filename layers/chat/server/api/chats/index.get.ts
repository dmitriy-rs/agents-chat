import { getAllChats } from '../../repository/chatRepository'

export default defineEventHandler(async () => {
  return getAllChats()
})
