<script setup lang="ts">
definePageMeta({
  layout: false,
})

const appConfig = useAppConfig()

const { createChat } = useChats()

useHead({
  title: appConfig.title,
  meta: [
    {
      name: 'description',
      content:
        'Experience the future of conversation with our intelligent chat platform powered by cutting-edge AI technology.',
    },
    {
      property: 'og:title',
      content: appConfig.title,
    },
    {
      property: 'og:description',
      content:
        'Start meaningful conversations powered by cutting-edge AI technology.',
    },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-background text-foreground mb-12">
    <UContainer
      class="py-40 grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-background"
    >
      <div class="flex flex-col gap-6">
        <h1
          class="text-5xl md:text-6xl font-extrabold leading-tight text-foreground"
        >
          {{ appConfig.title }}
        </h1>
        <p class="text-xl text-muted-foreground leading-relaxed">
          Experience the future of conversation with our intelligent chat
          platform. Start meaningful conversations powered by cutting-edge AI
          technology.
        </p>
        <UButton
          class="text-center font-bold self-center"
          size="xl"
          @click="createChat"
        >
          Start Your First Chat
        </UButton>
      </div>
      <div class="flex justify-center">
        <NuxtImg
          src="/hero.png"
          alt="Chat Interface Preview"
          class="w-full max-w-[600px] h-auto rounded-2xl"
        />
      </div>
    </UContainer>

    <UContainer class="py-24 bg-transparent">
      <div class="bg-muted rounded-3xl mx-4 mb-8 p-8">
        <h2 class="text-4xl font-bold text-center mb-12 text-foreground">
          Why Choose Our Chat Platform?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-8">
          <div
            class="bg-card border border-border rounded-2xl p-12 text-center transition-transform hover:-translate-y-1 hover:border-accent-foreground"
          >
            <NuxtImg
              src="/ai-conversations.png"
              alt="AI Powered"
              class="w-full h-auto min-h-[180px] object-contain rounded-lg mb-6"
              width="200"
              densities="x1"
            />
            <h3 class="text-2xl font-semibold mb-4 text-foreground">
              AI-Powered Conversations
            </h3>
            <p class="text-muted-foreground leading-relaxed">
              Experience intelligent responses and natural conversation flow
              with our advanced AI technology.
            </p>
          </div>

          <div
            class="bg-card border border-border rounded-2xl p-12 text-center transition-transform hover:-translate-y-1 hover:border-accent-foreground"
          >
            <NuxtImg
              src="/realtime.png"
              alt="Real Time"
              class="w-full h-auto min-h-[180px] object-contain rounded-lg mb-6"
            />
            <h3 class="text-2xl font-semibold mb-4 text-foreground">
              Real-Time Messaging
            </h3>
            <p class="text-muted-foreground leading-relaxed">
              Instant responses and seamless communication with lightning-fast
              message delivery.
            </p>
          </div>

          <div
            class="bg-card border border-border rounded-2xl p-12 text-center transition-transform hover:-translate-y-1 hover:border-accent-foreground"
          >
            <NuxtImg
              src="/secure.png"
              alt="Secure"
              class="w-full h-auto min-h-[180px] object-contain rounded-lg mb-6"
            />
            <h3 class="text-2xl font-semibold mb-4 text-foreground">
              Secure & Private
            </h3>
            <p class="text-muted-foreground leading-relaxed">
              Your conversations are protected with enterprise-grade security
              and privacy measures.
            </p>
          </div>
        </div>
      </div>
    </UContainer>

    <UContainer class="py-20 bg-background">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div class="flex flex-col gap-6">
          <h2
            class="text-4xl font-bold text-center md:text-left mb-12 text-foreground"
          >
            Transform Your Communication
          </h2>
          <p class="text-lg text-muted-foreground leading-relaxed">
            Our chat platform revolutionizes how you interact with AI. Whether
            you're seeking information, brainstorming ideas, or having casual
            conversations, we provide an intuitive and powerful experience.
          </p>
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <UIcon
                name="i-heroicons-check-circle"
                class="text-primary text-xl"
              />
              <span>Instant AI responses</span>
            </div>
            <div class="flex items-center gap-3">
              <UIcon
                name="i-heroicons-check-circle"
                class="text-primary text-xl"
              />
              <span>Natural conversation flow</span>
            </div>
            <div class="flex items-center gap-3">
              <UIcon
                name="i-heroicons-check-circle"
                class="text-primary text-xl"
              />
              <span>24/7 availability</span>
            </div>
          </div>
        </div>
        <div class="flex justify-center">
          <NuxtImg
            src="/people.png"
            alt="Communication Benefits"
            class="w-full max-w-[500px] h-auto rounded-2xl"
          />
        </div>
      </div>
    </UContainer>

    <UContainer class="py-20 bg-transparent">
      <div class="bg-muted rounded-3xl mx-4 mb-8 p-8">
        <div class="text-center">
          <h2 class="text-4xl font-bold mb-4 text-foreground">
            Ready to Get Started?
          </h2>
          <p class="text-xl text-muted-foreground mb-8">
            Join thousands of users who are already experiencing the future of
            AI conversation.
          </p>
          <UButton
            class="px-8 py-4"
            size="xl"
            variant="outline"
            @click="createChat"
          >
            Create A New Chat
          </UButton>
        </div>
      </div>
    </UContainer>
  </div>
</template>
