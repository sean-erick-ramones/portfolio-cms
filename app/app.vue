<script setup lang="ts">
const colorMode = useColorMode()
const navLinks = useNavLinks()
const { locale, collectionName } = useLocaleContent()

const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: locale
  }
})

useSeoMeta({
  titleTemplate: '%s',
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/portfolio-light.png',
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/portfolio-light.png',
  twitterCard: 'summary_large_image'
})

const [{ data: navigation }, { data: files }] = await Promise.all([
  useAsyncData(`navigation-${locale.value}`, () => {
    return Promise.all([
      queryCollectionNavigation(collectionName('blog'))
    ])
  }, {
    transform: data => data.flat(),
    watch: [locale]
  }),
  useLazyAsyncData(`search-${locale.value}`, () => {
    return Promise.all([
      queryCollectionSearchSections(collectionName('blog'))
    ])
  }, {
    server: false,
    transform: data => data.flat(),
    watch: [locale]
  })
])
</script>

<template>
  <UApp>
    <NuxtLayout>
      <UMain class="relative">
        <NuxtPage />
      </UMain>
    </NuxtLayout>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
        shortcut="meta_k"
        :links="navLinks"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </UApp>
</template>
