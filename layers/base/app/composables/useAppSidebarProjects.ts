import type { NavigationMenuItem } from '@nuxt/ui'

export default function useAppSidebarProjects() {
  const route = useRoute()
  const { chatsInProject } = useChats()
  const { projects } = useProjects()

  function isCurrentProject(projectId: string) {
    return route.params.projectId === projectId
  }

  function formatProjectChat(project: Project, chat: Chat): NavigationMenuItem {
    return {
      label: chat.title ?? 'Untitled Chat',
      to: `/projects/${project.id}/chats/${chat.id}`,
      active: route.params.id === chat.id,
    }
  }

  function formatProject(project: Project): NavigationMenuItem {
    const isCurrent = isCurrentProject(project.id)
    const baseItem: NavigationMenuItem = {
      label: project.name,
      to: `/projects/${project.id}`,
      active: isCurrent,
      defaultOpen: isCurrent,
    }
    if (isCurrent) {
      return {
        ...baseItem,
        children: chatsInProject(project.id).map((chat) =>
          formatProjectChat(project, chat),
        ),
      }
    }
    return baseItem
  }

  const projectsNavigation = computed(() =>{ 
    return projects.value.map(formatProject)})

  return {
    projects: projectsNavigation,
  }
}
