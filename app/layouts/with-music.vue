<script setup lang="ts">
const appConfig = useAppConfig()
useHead({
  title: appConfig.title,
})
</script>

<template>
  <div class="h-[calc(100vh-4rem)] bg-default">
    <AppHeader />
    <AppSidebar />

    <AppContent>
      <slot />
    </AppContent>

    <div class="fixed bottom-4 right-4">
      <AppMusicSelector />
    </div>
  </div>
</template>
