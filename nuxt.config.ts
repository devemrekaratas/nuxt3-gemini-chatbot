// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Gemini - Nuxt',
      link: [
        { rel: 'icon', href: '/gemini.svg' }
      ]
    },
    rootAttrs: {
      class: "h-full",
    },
  },
  modules: ['@nuxt/ui', '@nuxtjs/mdc', '@pinia/nuxt', '@nuxt/fonts', 'vue3-perfect-scrollbar/nuxt'],
  runtimeConfig: {
    apiKey: process.env.NUXT_API_KEY,
    public: {
      apiKey: process.env.NUXT_API_KEY
    }
  },
  pinia: {
    storesDirs: ["./stores/**"]
  },
  mdc: {
    highlight: {
      theme: 'github-dark',
      langs: ['ts', 'html'],
      wrapperStyle: true
    }
  },
})