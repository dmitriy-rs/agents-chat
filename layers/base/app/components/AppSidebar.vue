<script setup lang="ts">
const { isOpen } = useAppSidebar()

const { createChat } = useChats()
const { createProject } = useProjects()

const { projects } = useAppSidebarProjects()
const { chats } = useAppSidebarChats()
</script>

<template>
  <aside
    class="fixed top-16 left-0 bottom-0 w-64 transition-transform duration-300 z-40 bg-muted border-r-default border-r"
    :class="{ '-translate-x-full': !isOpen }"
  >
    <div
      v-if="projects.length > 0"
      class="overflow-y-auto p-4 border-b border-muted"
    >
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-sm font-semibold text-muted">Projects</h2>

        <UButton
          size="sm"
          color="info"
          variant="subtle"
          icon="i-heroicons-plus-small"
          @click="createProject"
        />
      </div>
      <UNavigationMenu
        orientation="vertical"
        class="w-full"
        :items="projects"
        default-open
      />
    </div>

    <div v-if="chats.length > 0" class="overflow-y-auto p-4">
      <div v-for="{ title, list } of chats" :key="title" class="mb-4">
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-sm font-semibold text-muted">{{ title }}</h2>
        </div>
        <UNavigationMenu
          orientation="vertical"
          class="w-full mb-4"
          :items="list"
          default-open
        />
      </div>
    </div>

    <div v-else class="overflow-y-auto p-4">
      <UAlert title="No Chats" color="neutral" variant="soft" class="mt-2">
        <template #description>
          <p>
            <UButton
              size="sm"
              class="p-0"
              color="info"
              variant="link"
              @click="createChat"
            >
              Create a new chat
            </UButton>
            to get started.
          </p>
        </template>
      </UAlert>
    </div>
  </aside>
</template>
