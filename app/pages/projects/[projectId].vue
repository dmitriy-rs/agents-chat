<script setup lang="ts">
const route = useRoute()
const projectId = route.params.projectId as string

const { project, updateProject } = useProject(projectId)
const { createProjectChat } = useChats()

if (!project.value) {
  await navigateTo('/', {
    replace: true,
  })
}

const onChatPage = computed(() => !!route.params.id)

async function handleNewChat() {
  createProjectChat(projectId)
}
</script>

<template>
  <div class="p-4 h-[calc(100%-4rem)]">
    <div
      v-if="project"
      class="flex items-start justify-between mb-6 pb-4 border-b border-default"
    >
      <div>
        <ProjectEditNameForm
          :project-name="project.name"
          :disabled="onChatPage"
          @set-name="updateProject({ name: $event })"
        />

        <NuxtLink
          v-if="onChatPage"
          :to="`/projects/${projectId}`"
          class="leading-4 flex items-center mt-1 text-sm text-muted"
        >
          <UIcon name="i-heroicons-arrow-left" class="mr-1" />
          Back to Project
        </NuxtLink>
      </div>
      <UButton color="primary" icon="i-heroicons-plus" @click="handleNewChat">
        New Chat in Project
      </UButton>
    </div>

    <NuxtPage />
  </div>
</template>
