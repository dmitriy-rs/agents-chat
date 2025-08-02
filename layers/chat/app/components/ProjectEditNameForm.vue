<script setup lang="ts">
const { disabled, projectName } = defineProps<{
  projectName: string
  disabled?: boolean
}>()
const emit = defineEmits<{
  (e: 'set-name', value: string): void
}>()

const isEditing = ref(false)
const editedName = ref('')

function startEditing() {
  if (disabled) return

  editedName.value = projectName
  isEditing.value = true
}

function cancelEditing() {
  isEditing.value = false
  editedName.value = ''
}

async function handleRename() {
  if (!editedName.value.trim()) return
  if (editedName.value.trim() === projectName) return

  isEditing.value = false
  emit('set-name', editedName.value.trim())
}
</script>

<template>
  <div class="flex items-center gap-2">
    <h1
      v-if="!isEditing"
      class="text-2xl font-bold flex items-center gap-2 hover:[&_.edit-icon]:opacity-100"
      :class="{ 'cursor-pointer': !disabled }"
      @click="startEditing"
    >
      {{ projectName }}
      <UIcon
        v-if="!disabled"
        name="i-heroicons-pencil"
        class="edit-icon w-4 h-4 opacity-0 ml-1 transition-opacity duration-200"
      />
    </h1>
    <div v-else class="flex items-center gap-2">
      <UInput
        v-model="editedName"
        class="text-2xl font-normal py-1 pr-2 h-auto w-auto min-w-[200px]"
        size="lg"
        autofocus
        @keyup.enter="handleRename"
        @keyup.esc="cancelEditing"
      />
      <div class="flex gap-1">
        <UButton
          color="neutral"
          variant="soft"
          icon="i-heroicons-x-mark"
          size="xs"
          @click="cancelEditing"
        />
        <UButton
          color="primary"
          variant="soft"
          icon="i-heroicons-check"
          size="xs"
          @click="handleRename"
        />
      </div>
    </div>
  </div>
</template>
