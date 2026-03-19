<script setup lang="ts">
import { withLeadingSlash } from 'ufo'

const { t, locale } = useI18n()
const { collectionName } = useLocaleContent()
const route = useRoute()
const { copyToClipboard } = useClipboard()

const slug = computed(() => '/blog' + withLeadingSlash(Array.isArray(route.params.slug) ? route.params.slug.join('/') : String(route.params.slug)))

const { data: page } = await useAsyncData(`blog-${slug.value}-${locale.value}`, () =>
  queryCollection(collectionName('blog')).path(slug.value).first()
, {
  watch: [locale]
})

if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
const { data: surround } = await useAsyncData(`blog-${slug.value}-surround-${locale.value}`, () =>
  queryCollectionItemSurroundings(collectionName('blog'), slug.value, {
    fields: ['description']
  })
, {
  watch: [locale]
})

const siteUrl = 'https://www.seancramones.com'
const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description
const ogImage = page.value?.image || `${siteUrl}/og-image.png`
const pageUrl = `${siteUrl}${route.path}`

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage,
  ogUrl: pageUrl,
  ogType: 'article',
  articlePublishedTime: page.value?.date,
  articleAuthor: [page.value?.author?.name],
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: ogImage,
  twitterSite: '@ramones_sean'
})

useHead({
  link: [
    { rel: 'canonical', href: pageUrl }
  ]
})

const articleLink = computed(() => {
  if (import.meta.client) {
    return `${window.location}`
  }
  return ''
})

const localePath = useLocalePath()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString(locale.value === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <UMain class="mt-20 px-2">
    <UContainer class="relative min-h-screen">
      <UPage v-if="page">
        <ULink
          :to="localePath('/blog')"
          class="text-sm flex items-center gap-1"
        >
          <UIcon name="lucide:chevron-left" />
          {{ t('blog.backToBlog') }}
        </ULink>
        <div class="flex flex-col gap-3 mt-8">
          <div class="flex text-xs text-muted items-center justify-center gap-2">
            <span v-if="page.date">
              {{ formatDate(page.date) }}
            </span>
            <span v-if="page.date && page.minRead">
              -
            </span>
            <span v-if="page.minRead">
              {{ page.minRead }} {{ t('blog.minRead') }}
            </span>
          </div>
          <img
            :src="page.image"
            :alt="page.title"
            class="rounded-lg w-full h-[300px] object-cover object-center"
          >
          <h1 class="text-4xl text-center font-medium max-w-3xl mx-auto mt-4">
            {{ page.title }}
          </h1>
          <p class="text-muted text-center max-w-2xl mx-auto">
            {{ page.description }}
          </p>
          <div class="flex items-center justify-center gap-2 mt-2">
            <UUser
              orientation="vertical"
              color="neutral"
              variant="outline"
              class="justify-center items-center text-center"
              v-bind="page.author"
            />
          </div>
        </div>
        <UPageBody class="max-w-3xl mx-auto">
          <ContentRenderer
            v-if="page.body"
            :value="page"
          />

          <div class="flex items-center justify-end gap-2 text-sm text-muted">
            <UButton
              size="sm"
              variant="link"
              color="neutral"
              :label="t('blog.copyLink')"
              @click="copyToClipboard(articleLink, t('blog.linkCopied'))"
            />
          </div>
          <UContentSurround :surround />
        </UPageBody>
      </UPage>
    </UContainer>
  </UMain>
</template>
