// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@nuxtjs/mdc'
  ],

  runtimeConfig: {
    openaiApiKey: ''
  },

  mdc: {
    highlight: {
      theme: 'material-theme-palenight',
      langs: [
        'html',
        'markdown',
        'vue',
        'typescript',
        'javascript',
      ],
    },
  },

  vite: {
    optimizeDeps: {
      include: ['debug']
    }
  }
})