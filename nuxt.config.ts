// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: false
  },
  ssr: false,
  spaLoadingTemplate: false,
  modules: [
    'nuxt-quasar-ui',
    '@pinia/nuxt'
  ],
  app: {
    head: {
      title: 'Chat App'
    }
  },
  css: [
    '@/assets/style.scss'
  ],
  runtimeConfig: {
    public: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
    }
  },
  quasar: { /* */ }
})
