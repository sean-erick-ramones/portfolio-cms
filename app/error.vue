<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true
  }
})

const { t } = useI18n()
const navLinks = useNavLinks()
const { locale, collectionName } = useLocaleContent()

useHead({
  htmlAttrs: {
    lang: locale
  }
})

useSeoMeta({
  title: t('error.title'),
  description: t('error.description')
})

const [{ data: navigation }, { data: files }] = await Promise.all([
  useAsyncData(`err-navigation-${locale.value}`, () => {
    return Promise.all([
      queryCollectionNavigation(collectionName('blog'))
    ])
  }, {
    transform: data => data.flat(),
    watch: [locale]
  }),
  useLazyAsyncData(`err-search-${locale.value}`, () => {
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
  <div>
    <AppHeader :links="navLinks" />

    <UMain>
      <UContainer>
        <UPage>
          <UError :error="error" />
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        shortcut="meta_k"
        :navigation="navigation"
        :links="navLinks"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>

    <UToaster />
  </div>
</template>
