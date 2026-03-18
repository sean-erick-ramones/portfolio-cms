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
  },
  footer: {
    credits: `Built with Nuxt UI • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [
      {
        'icon': 'i-simple-icons-linkedin',
        'to': 'https://www.linkedin.com/in/sean-erick-ramones-102a64192/',
        'target': '_blank',
        'aria-label': 'Sean Erick Ramones on Linkedin'
      },
      {
        'icon': 'i-simple-icons-github',
        'to': 'https://github.com/sean-erick-ramones',
        'target': '_blank',
        'aria-label': 'Sean Erick Ramones on GitHub'
      },
      {
        'icon': 'i-simple-icons-x',
        'to': 'https://x.com/ramones_sean',
        'target': '_blank',
        'aria-label': 'Nuxt on X'
      },
      {
        'icon': 'i-simple-icons-instagram',
        'to': 'https://www.instagram.com/sean.e.ramz',
        'target': '_blank',
        'aria-label': 'Sean Erick Ramones on Instagram'
      }
    ]
  }
})
