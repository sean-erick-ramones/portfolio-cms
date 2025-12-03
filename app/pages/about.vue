<script setup lang="ts">
const { data: page } = await useAsyncData('about', () => {
  return queryCollection('about').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const siteUrl = 'https://www.seancramones.com'
const title = page.value?.seo?.title || page.value?.title || 'About - Sean Erick C. Ramones'
const description = page.value?.seo?.description || page.value?.description || 'Learn more about Sean Erick C. Ramones, a full-stack engineer specializing in Vue.js and modern web technologies.'
const ogImage = page.value?.profileImage?.src
  ? `${siteUrl}${page.value.profileImage.src}`
  : `${siteUrl}/og-image.png`
const pageUrl = `${siteUrl}/about`

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage,
  ogUrl: pageUrl,
  ogType: 'profile',
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
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      orientation="horizontal"
      :ui="{
        container: 'lg:flex sm:flex-row items-center',
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start'
      }"
    >
      <img
        class="sm:rotate-4 size-36 rounded-lg ring ring-default ring-offset-3 ring-offset-(--ui-bg)"
        :src="page.profileImage.src"
        :alt="page.profileImage.alt"
        width="144"
        height="144"
      >
    </UPageHero>
    <UPageSection
      :ui="{
        container: '!pt-0'
      }"
    >
      <div
        v-if="page.now?.openTo?.length"
        class="mb-6"
      >
        <h3 class="text-sm font-medium text-muted">
          Now / Open to
        </h3>
        <div class="mt-2 flex flex-wrap gap-2">
          <span
            v-for="item in page.now.openTo"
            :key="item"
            class="px-2.5 py-1 rounded-full bg-elevated/60 text-xs text-muted"
          >
            {{ item }}
          </span>
        </div>
      </div>
      <MDC
        :value="page.content"
        unwrap="p"
      />

      <!-- Mobile/Tablet: Carousel (below md breakpoint) -->
      <UCarousel
        v-slot="{ item }"
        :items="page.images"
        :autoplay="{ delay: 3000 }"
        :ui="{ item: 'basis-1/2 sm:basis-1/3' }"
        loop
        dots
        class="md:hidden py-10"
      >
        <div class="flex justify-center py-2">
          <PolaroidItem
            :image="item"
            :index="0"
          />
        </div>
      </UCarousel>

      <!-- Desktop: Overlapping polaroid layout (md and above) -->
      <div class="hidden md:flex flex-row justify-center items-center py-10 space-x-[-2rem]">
        <PolaroidItem
          v-for="(image, index) in page.images"
          :key="index"
          :image="image"
          :index
        />
      </div>
    </UPageSection>
  </UPage>
</template>
