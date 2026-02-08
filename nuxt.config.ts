// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  nitro: {
    prerender: {
      crawlLinks: false
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  vue: {
    macros: {}
  },
  tailwindcss: {
    configPath: 'tailwind.config.ts'
  },
  app: {
    head: {
      title: 'iMuslim - Kumpulan Doa',
      meta: [
        { name: 'description', content: 'Kumpulan Doa dan Dzikir Harian' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})
