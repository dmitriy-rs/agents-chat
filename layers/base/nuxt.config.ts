// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['./layers/base/app/assets/css/main.css'],

  fonts: {
    families: [
      { name: 'Sora', provider: 'google' },
      { name: 'Google Sans Code', provider: 'google' },
      { name: 'Epilogue', provider: 'google' },
    ],
  },

  modules: ['@nuxt/ui', '@vueuse/nuxt', '@nuxtjs/mdc'],

  runtimeConfig: {
    openaiApiKey: '',
  },

  mdc: {
    highlight: {
      theme: 'material-theme-palenight',
      langs: ['html', 'markdown', 'vue', 'typescript', 'javascript'],
    },
  },
})
