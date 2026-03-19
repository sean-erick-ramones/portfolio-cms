<script setup lang="ts">
const { locale, collectionName } = useLocaleContent()

const { data: page } = await useAsyncData(`index-${locale.value}`, () => {
  return queryCollection(collectionName('index')).first()
}, {
  watch: [locale]
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const siteUrl = 'https://www.seancramones.com'
const title = page.value?.seo?.title || page.value?.title || 'Sean Erick C. Ramones'
const description = page.value?.seo?.description || page.value?.description || 'Full-stack software engineer specializing in Vue.js, Nuxt, and modern web technologies.'
const ogImage = `${siteUrl}/og-image.png`

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage,
  ogUrl: siteUrl,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: ogImage,
  twitterSite: '@ramones_sean'
})

useHead({
  link: [
    { rel: 'canonical', href: siteUrl }
  ]
})
</script>

<template>
  <UPage v-if="page">
    <LandingHero :page />
    <UPageSection
      :ui="{
        container: '!pt-0 lg:grid lg:grid-cols-2 lg:gap-8'
      }"
    >
      <LandingAbout :page />
      <LandingWorkExperience :page />
    </UPageSection>
    <LandingBlog :page />
    <LandingTestimonials :page />
    <LandingFAQ :page />
  </UPage>
</template>
