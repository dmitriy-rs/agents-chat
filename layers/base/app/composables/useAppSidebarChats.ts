import type { NavigationMenuItem } from '@nuxt/ui'

export default function useAppSidebarChats() {
  const route = useRoute()

  const { chats } = useChats()

  const chatsWithoutProject = computed(() =>
    chats.value.filter((c) => !c.projectId),
  )

  function filterChats(startDays: number, endDays?: number) {
    return filterChatsByDateRange(
      chatsWithoutProject.value,
      startDays,
      endDays,
    ).map(formatChatItem)
  }

  function formatChatItem(chat: Chat): NavigationMenuItem {
    return {
      label: chat.title ?? 'Untitled Chat',
      to: `/chats/${chat.id}`,
      defaultOpen: true,
      active: route.params.id === chat.id,
    }
  }

  const chatsNavigation = computed(() =>
    [
      {
        title: 'Today',
        list: filterChats(-1, 1),
      },
      {
        title: 'Last week',
        list: filterChats(1, 7),
      },
      {
        title: 'Last month',
        list: filterChats(7, 30),
      },
      {
        title: 'Older chats',
        list: filterChats(30),
      },
    ].filter((x) => x.list.length > 0),
  )

  return {
    chats: chatsNavigation,
  }
}
