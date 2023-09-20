// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  modules: [
    // pinia plugin
    '@pinia/nuxt',
  ],

  imports: {
    dirs: ['./store'],
  },

  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate'],
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  // plugins: [
  //   { src: '~/plugins/toaster' }
  // ]
})
