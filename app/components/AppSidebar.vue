<script setup lang="ts">
const { isOpen } = useAppSidebar()

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
      <div class="mb-4">
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-sm font-semibold text-muted">Projects</h2>
        </div>
        <UNavigationMenu
          orientation="vertical"
          class="w-full mb-2"
          :items="projects"
          default-open
        />
        <UButton
          size="sm"
          color="neutral"
          variant="soft"
          icon="i-heroicons-plus-small"
          class="w-full"
          @click="createProject"
        >
          New Project
        </UButton>
      </div>
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
      <UAlert
        title="No Chats"
        description="Create a new chat to get started."
        color="neutral"
        variant="soft"
        class="mt-2"
      />
    </div>
  </aside>
</template>
