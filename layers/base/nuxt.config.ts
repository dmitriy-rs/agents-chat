// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['./layers/base/app/assets/css/main.css'],

  fonts: {
    families: [
      {
        name: 'ArkPixel-10px-mono',
        src: [
          '/fonts/ark-pixel-10px-monospaced-latin.otf.woff2',
          '/fonts/ark-pixel-10px-monospaced-latin.ttf.woff2'
        ],
        weight: [400, 700],
        style: 'normal'
      },
      {
        name: 'ArkPixel-12px-mono',
        src: [
          '/fonts/ark-pixel-12px-monospaced-latin.otf.woff2',
          '/fonts/ark-pixel-12px-monospaced-latin.ttf.woff2'
        ],
        weight: [400, 700],
        style: 'normal'
      },
      {
        name: 'ArkPixel-16px-mono',
        src: [
          '/fonts/ark-pixel-16px-monospaced-latin.otf.woff2',
          '/fonts/ark-pixel-16px-monospaced-latin.ttf.woff2'
        ],
        weight: [400, 700],
        style: 'normal'
      },
      {
        name: 'ArkPixel-10px',
        src: [
          '/fonts/ark-pixel-10px-proportional-latin.otf.woff2',
          '/fonts/ark-pixel-10px-proportional-latin.ttf.woff2'
        ],
        weight: [400, 700],
        style: 'normal'
      },
      {
        name: 'ArkPixel-12px',
        src: [
          '/fonts/ark-pixel-12px-proportional-latin.otf.woff2',
          '/fonts/ark-pixel-12px-proportional-latin.ttf.woff2'
        ],
        weight: [400, 700],
        style: 'normal'
      },
      {
        name: 'ArkPixel-16px',
        src: [
          '/fonts/ark-pixel-16px-proportional-latin.otf.woff2',
          '/fonts/ark-pixel-16px-proportional-latin.ttf.woff2'
        ],
        weight: [400, 700],
        style: 'normal'
      },
    ]
  },

  modules: [
    '@nuxt/ui',
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
  }
})