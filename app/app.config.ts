export default defineAppConfig({
  global: {
    meetingLink: 'https://cal.com/sean-erick-ramones-r5um2y/30min',
    email: 'seancramones@gmail.com',
    available: true
  },
  ui: {
    colors: {
      primary: 'green',
      secondary: 'stone',
      neutral: 'neutral'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  }
})
