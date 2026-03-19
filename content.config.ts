import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const createBaseSchema = () => z.object({
  title: z.string(),
  description: z.string()
})

const createButtonSchema = () => z.object({
  label: z.string(),
  icon: z.string().optional(),
  to: z.string().optional(),
  color: z.enum(['primary', 'neutral', 'success', 'warning', 'error', 'info']).optional(),
  size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
  variant: z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional(),
  target: z.enum(['_blank', '_self']).optional()
})

const createImageSchema = () => z.object({
  src: z.string().editor({ input: 'media' }),
  alt: z.string()
})

const createAuthorSchema = () => z.object({
  name: z.string(),
  description: z.string().optional(),
  username: z.string().optional(),
  twitter: z.string().optional(),
  to: z.string().optional(),
  avatar: createImageSchema().optional()
})

const createTestimonialSchema = () => z.object({
  quote: z.string(),
  author: createAuthorSchema()
})

const indexSchema = z.object({
  seo: z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty()
  }).optional(),
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  profileImage: createImageSchema(),
  snsLinks: z.array(createButtonSchema()),
  hero: z.object({
    links: z.array(createButtonSchema()),
    images: z.array(createImageSchema())
  }),
  about: createBaseSchema(),
  now: z.object({
    openTo: z.array(z.string()).optional(),
    available: z.boolean().optional(),
    meetingLink: z.string().optional(),
    currently: z.array(z.string()).optional(),
    availability: z.string().optional()
  }).optional(),
  experience: createBaseSchema().extend({
    items: z.array(z.object({
      date: z.date(),
      position: z.string(),
      description: z.string(),
      index: z.number(),
      company: z.object({
        name: z.string(),
        url: z.string(),
        logo: z.string().editor({ input: 'icon' }),
        color: z.string()
      })
    }))
  }),
  testimonials: createBaseSchema().extend({
    items: z.array(createTestimonialSchema())
  }),
  blog: createBaseSchema(),
  faq: createBaseSchema().extend({
    categories: z.array(
      z.object({
        title: z.string().nonempty(),
        questions: z.array(
          z.object({
            label: z.string().nonempty(),
            content: z.string().nonempty()
          })
        )
      }))
  })
})

const projectSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  image: z.string().nonempty().editor({ input: 'media' }),
  url: z.string().nonempty(),
  tags: z.array(z.string()),
  date: z.date()
})

const blogSchema = z.object({
  minRead: z.number(),
  date: z.date(),
  image: z.string().nonempty().editor({ input: 'media' }),
  author: createAuthorSchema()
})

const pagesSchema = z.object({
  links: z.array(createButtonSchema())
})

const aboutSchema = z.object({
  profileImage: createImageSchema(),
  content: z.object({}),
  images: z.array(createImageSchema()),
  now: z.object({
    openTo: z.array(z.string()).optional(),
    available: z.boolean().optional(),
    meetingLink: z.string().optional(),
    currently: z.array(z.string()).optional(),
    availability: z.string().optional()
  }).optional()
})

const footerSchema = z.object({
  credits: z.string().nonempty(),
  links: z.array(createButtonSchema().extend({
    ariaLabel: z.string().nonempty()
  }))
})

export default defineContentConfig({
  collections: {
    // English (default locale) collections
    // '*' in filename patterns (e.g. en/*ndex.yml) is required so @nuxt/content
    // recognises 'en/' as the fixed prefix to strip from content paths.
    index_en: defineCollection({
      type: 'page',
      source: { include: 'en/*ndex.yml', prefix: '/' },
      schema: indexSchema
    }),
    projects_en: defineCollection({
      type: 'data',
      source: { include: 'en/projects/*.yml', prefix: '/projects' },
      schema: projectSchema
    }),
    blog_en: defineCollection({
      type: 'page',
      source: { include: 'en/blog/*.md', prefix: '/blog' },
      schema: blogSchema
    }),
    pages_en: defineCollection({
      type: 'page',
      source: [
        { include: 'en/*rojects.yml', prefix: '/' },
        { include: 'en/*log.yml', prefix: '/' }
      ],
      schema: pagesSchema
    }),
    about_en: defineCollection({
      type: 'page',
      source: { include: 'en/*bout.yml', prefix: '/' },
      schema: aboutSchema
    }),
    footer_en: defineCollection({
      type: 'data',
      source: { include: 'en/footer.yml' },
      schema: footerSchema
    }),

    // Spanish locale collections
    index_es: defineCollection({
      type: 'page',
      source: { include: 'es/*ndex.yml', prefix: '/' },
      schema: indexSchema
    }),
    projects_es: defineCollection({
      type: 'data',
      source: { include: 'es/projects/*.yml', prefix: '/projects' },
      schema: projectSchema
    }),
    blog_es: defineCollection({
      type: 'page',
      source: { include: 'es/blog/*.md', prefix: '/blog' },
      schema: blogSchema
    }),
    pages_es: defineCollection({
      type: 'page',
      source: [
        { include: 'es/*rojects.yml', prefix: '/' },
        { include: 'es/*log.yml', prefix: '/' }
      ],
      schema: pagesSchema
    }),
    about_es: defineCollection({
      type: 'page',
      source: { include: 'es/*bout.yml', prefix: '/' },
      schema: aboutSchema
    }),
    footer_es: defineCollection({
      type: 'data',
      source: { include: 'es/footer.yml' },
      schema: footerSchema
    })
  }
})
