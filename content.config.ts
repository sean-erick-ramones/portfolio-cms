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

export default defineContentConfig({
  collections: {
    index: defineCollection({
      type: 'page',
      source: 'index.yml',
      schema: z.object({
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
          // Availability controls for hero CTA moved to content
          available: z.boolean().optional(),
          meetingLink: z.string().optional(),
          // Legacy/optional fields (not rendered):
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
        aiWorkflows: createBaseSchema().extend({
          items: z.array(z.object({
            title: z.string(),
            description: z.string(),
            icon: z.string().optional(),
            tools: z.array(z.string()).optional(),
            link: z.string().optional()
          }))
        }).optional(),
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
    }),
    projects: defineCollection({
      type: 'data',
      source: 'projects/*.yml',
      schema: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        image: z.string().nonempty().editor({ input: 'media' }),
        url: z.string().nonempty(),
        tags: z.array(z.string()),
        date: z.date()
      })
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        minRead: z.number(),
        date: z.date(),
        image: z.string().nonempty().editor({ input: 'media' }),
        author: createAuthorSchema()
      })
    }),
    pages: defineCollection({
      type: 'page',
      source: [
        { include: 'projects.yml' },
        { include: 'blog.yml' }
      ],
      schema: z.object({
        links: z.array(createButtonSchema())
      })
    }),

    about: defineCollection({
      type: 'page',
      source: 'about.yml',
      schema: z.object({
        profileImage: createImageSchema(),
        content: z.object({}),
        images: z.array(createImageSchema()),
        now: z.object({
          openTo: z.array(z.string()).optional(),
          // Keep same shape for consistency; about page UI will only render openTo
          available: z.boolean().optional(),
          meetingLink: z.string().optional(),
          currently: z.array(z.string()).optional(),
          availability: z.string().optional()
        }).optional()
      })
    })
  }
})
