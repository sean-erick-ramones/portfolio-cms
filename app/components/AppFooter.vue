<script setup lang="ts">
const currentYear = new Date().getFullYear()
const { locale, collectionName, fallbackCollectionName } = useLocaleContent()

const { data: footer } = await useAsyncData(`footer-${locale.value}`, async () => {
  const localizedFooter = await queryCollection(collectionName('footer')).first()

  if (localizedFooter || locale.value === 'en') {
    return localizedFooter
  }

  return queryCollection(fallbackCollectionName('footer')).first()
}, {
  watch: [locale]
})

const credits = computed(() => {
  if (!footer.value) {
    return ''
  }

  return `${footer.value.credits} • © ${currentYear}`
})

const links = computed(() => {
  return footer.value?.links.map(({ ariaLabel, ...link }) => ({
    ...link,
    'aria-label': ariaLabel
  })) ?? []
})
</script>

<template>
  <UFooter
    v-if="footer"
    class="z-10 bg-default"
    :ui="{ left: 'text-muted text-xs' }"
  >
    <template #left>
      {{ credits }}
    </template>

    <template #right>
      <template v-if="links.length">
        <UButton
          v-for="(link, index) of links"
          :key="index"
          v-bind="{ size: 'xs', color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>
    </template>
  </UFooter>
</template>
