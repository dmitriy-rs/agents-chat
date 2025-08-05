import { mapToUIMessage } from '../../../../db/mapper'
import { getMessagesByChatId } from '../../../../repository/messagesRepository'

export default defineEventHandler(async (event) => {
  const { id: chatId } = getRouterParams(event)

  const messages = await getMessagesByChatId(chatId)
  return messages.map(mapToUIMessage)
})
