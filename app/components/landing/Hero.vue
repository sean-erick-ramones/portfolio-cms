<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

const { global } = useAppConfig()

const props = defineProps<{
  page: IndexCollectionItem
}>()

const snsLinks = computed(() => props.page.snsLinks ?? [])
</script>

<template>
  <UPageHero
    :ui="{
      headline: 'flex items-center justify-center',
      title: 'text-shadow-md max-w-lg mx-auto',
      links: 'mt-4 flex-col justify-center items-center'
    }"
  >
    <template #headline>
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: 0.1
        }"
      >
        <NuxtImg
          class="size-18 ring ring-default ring-offset-3 ring-offset-(--ui-bg) rounded-full"
          :src="page.profileImage.src"
          :alt="page.profileImage.alt"
          width="72"
          height="72"
          loading="eager"
        />
      </Motion>
    </template>

    <template #title>
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: 0.1
        }"
      >
        {{ page.title }}
      </Motion>
    </template>

    <template #description>
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: 0.3
        }"
      >
        {{ page.description }}
      </Motion>
    </template>

    <template #links>
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: 0.5
        }"
      >
        <div
          v-if="page.hero.links"
          class="w-full flex flex-col sm:flex-row items-center gap-2"
        >
          <UButton
            v-for="link in page.hero.links"
            :key="link.label"
            class="w-full sm:w-auto"
          >
            <a
              :href="link.to"
              target="_blank"
              download
              class="text-center w-full"
            >{{ link.label }}</a>
          </UButton>
          <UButton
            :color="(page.now?.available ?? global.available) ? 'success' : 'error'"
            variant="ghost"
            class="gap-2"
            target="_blank"
            :to="(page.now?.available ?? global.available) ? (page.now?.meetingLink || global.meetingLink) : ''"
            :label="(page.now?.available ?? global.available) ? 'Available for new projects' : 'Not available at the moment'"
          >
            <template #leading>
              <span class="relative flex size-2">
                <span
                  class="absolute inline-flex rounded-full opacity-75 size-full"
                  :class="(page.now?.available ?? global.available) ? 'bg-success animate-ping' : 'bg-error'"
                />
                <span
                  class="relative inline-flex scale-90 rounded-full size-2"
                  :class="(page.now?.available ?? global.available) ? 'bg-success' : 'bg-error'"
                />
              </span>
            </template>
          </UButton>
        </div>
      </Motion>

      <div class="inline-flex mt-4 gap-x-4">
        <Motion
          v-for="(link, index) of snsLinks"
          :key="index"
          :initial="{
            scale: 1.1,
            opacity: 0,
            filter: 'blur(20px)'
          }"
          :animate="{
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)'
          }"
          :transition="{
            duration: 0.6,
            delay: 0.5 + index * 0.1
          }"
        >
          <UButton v-bind="{ size: 'md', color: 'neutral', variant: 'ghost', ...link }" />
        </Motion>
      </div>

      <!-- Now / Open to section -->
      <Motion
        v-if="page.now?.openTo?.length"
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: 0.7
        }"
      >
        <div class="mt-5 flex flex-col items-center gap-2">
          <div class="flex flex-wrap justify-center gap-2">
            <span
              v-for="item in page.now.openTo"
              :key="item"
              class="px-2.5 py-1 rounded-full bg-elevated/60 text-xs text-muted"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </Motion>
    </template>

    <UMarquee
      pause-on-hover
      class="py-2 -mx-8 sm:-mx-12 lg:-mx-16 [--duration:40s]"
    >
      <Motion
        v-for="(img, index) in page.hero.images"
        :key="index"
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: index * 0.1
        }"
      >
        <NuxtImg
          width="234"
          height="234"
          loading="lazy"
          class="object-cover p-2 bg-white rounded-lg aspect-square"
          :class="index % 2 === 0 ? '-rotate-2' : 'rotate-2'"
          v-bind="img"
        />
      </Motion>
    </UMarquee>
  </UPageHero>
</template>
