export default defineNuxtPlugin(() => {
  return {
    provide: {
      hello: (msg) => alert(`Hello ${msg}`),
    },
  }
})
