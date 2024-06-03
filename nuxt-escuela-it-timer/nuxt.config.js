export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss'],
  css: ['@/assets/styles/base.css'],
  plugins: ['./plugins/hello.js', './plugins/chartjs.js'],
})
