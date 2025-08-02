import { getMessagesByChatId } from '../../../../repository/messagesRepository'

export default defineEventHandler(async (event) => {
  const { id: chatId } = getRouterParams(event)
  return getMessagesByChatId(chatId)
})
