export default defineNuxtConfig({
  typescript: {
    shim: false,
    strict: true,
    typeCheck: true,
  },
  ssr: false,
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
    '@/assets/scss/fonts.scss',
  ],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    css: {
      preprocessorOptions: {
        // scss: {
        //   additionalData: '@use "@/assets/scss/_colors.scss" as *;',
        // },
        scss: {
          additionalData: `
            @use "@/assets/scss/_colors.scss" as *;
            @use "@/assets/scss/_variables.scss" as *;
            @use "@/assets/scss/_classes.scss" as *;
          `,
        },
      },
    },
  },
  modules: [
    '@pinia/nuxt',
    '@element-plus/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  components: [
    { path: '~/components/common', extensions: ['.vue'] },
    { path: '~/components/ui/user', extensions: ['.vue'] },
    { path: '~/components/survey', extensions: ['.vue'] },
    '~/components',
  ],
  runtimeConfig: {
    public: {
      homepageUrl: process.env.HOMEPAGE_URL,
      userPageUrl: process.env.USER_PAGE_URL,
      mailReceiveSettingUrl: process.env.MAIL_RECEIVE_SETTING_URL,
      energyGraphUrl: process.env.ENERGY_GRAPH_URL,
      monthlyReportUrl: process.env.MONTHLY_REPORT_URL,
      tipsUrl: process.env.TIPS_URL,
    },
  },
})
