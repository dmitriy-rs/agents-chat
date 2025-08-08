import { getChatById } from '../../../repository/chatRepository'

export default defineCachedEventHandler(
  async (event) => {
    const { id } = getRouterParams(event)

    const storage = useStorage('db')
    await storage.setItem('chats:has-new-chat', false)

    return getChatById(id)
  },
  {
    name: 'getAllChats',
    maxAge: 0,
    swr: false,
    async shouldInvalidateCache() {
      const storage = useStorage('db')
      const hasChatKey = await storage.getItem<boolean>('chats:has-new-chat')
      return !!hasChatKey
    },
  },
)
