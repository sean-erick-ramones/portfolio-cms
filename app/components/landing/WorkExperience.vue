<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'
import type { TimelineItem } from '@nuxt/ui'

const props = defineProps<{
  page: IndexCollectionItem
}>()

const timelineItems = computed<TimelineItem[]>(() =>
  props.page.experience.items.map(experience => ({
    icon: experience.company.logo,
    date: experience.date,
    title: experience.position,
    description: experience.description,
    slot: `item-${experience.index}`,
    company: experience.company,
    index: experience.index
  })).toSorted((a, b) => a.index - b.index)
)
</script>

<template>
  <UPageSection
    :title="page.experience.title"
    :ui="{
      container: '!p-0 gap-2 sm:gap-2',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'mt-2'
    }"
  >
    <template #description>
      <UTimeline
        :items="timelineItems"
        :default-value="2"
        color="success"
        :ui="{
          wrapper: 'text-left',
          description: 'text-left',
          title: 'text-left'
        }"
      >
        <template
          v-for="(item, index) in timelineItems"
          :key="index"
          #[item.slot]
        >
          <Motion
            :initial="{ opacity: 0, transform: 'translateY(20px)' }"
            :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
            :transition="{ delay: 0.4 + 0.2 * item.index }"
            :in-view-options="{ once: true }"
          >
            <div class="space-y-1">
              <ULink
                :to="item.company.url"
                target="_blank"
                class="block font-medium hover:underline"
                :style="{ color: item.company.color }"
              >
                {{ item.company.name }}
              </ULink>
              <p class="text-sm text-muted">
                {{ item.description }}
              </p>
            </div>
          </Motion>
        </template>
      </UTimeline>
    </template>
  </UPageSection>
</template>
