<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { en, es } from '@nuxt/ui/locale'

// Props
defineProps<{
  links: NavigationMenuItem[]
}>()

// Composables
const { locale, setLocale } = useI18n()

// Getters
const locales = computed(() => Object.values([en, es]))

function handleLocaleChange(newLocale: string) {
  setLocale(newLocale as 'en' | 'es') // work-around since ULocaleSelect exposes a type mismatch.
}
</script>

<template>
  <div class="fixed top-2 sm:top-4 mx-auto left-1/2 transform -translate-x-1/2 z-10">
    <UNavigationMenu
      :items="links"
      variant="link"
      color="neutral"
      class="bg-muted/80 backdrop-blur-sm rounded-full px-2 sm:px-4 border border-muted/50 shadow-lg shadow-neutral-950/5"
      :ui="{
        link: 'px-2 py-1',
        linkLeadingIcon: 'hidden'
      }"
    >
      <template #list-trailing>
        <UContentSearchButton variant="ghost" />
        <ColorModeButton />
        <ULocaleSelect
          :model-value="locale"
          :locales="locales"
          size="xs"
          variant="ghost"
          @update:model-value="handleLocaleChange($event)"
        />
      </template>
    </UNavigationMenu>
  </div>
</template>
