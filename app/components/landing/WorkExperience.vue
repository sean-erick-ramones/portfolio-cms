<script setup lang="ts">
import type { IndexCollectionItem } from "@nuxt/content";
import type { TimelineItem } from "@nuxt/ui";

const props = defineProps<{
  page: IndexCollectionItem;
}>();

const timelineItems = computed<TimelineItem[]>(() =>
  props.page.experience.items
    .map((experience) => ({
      icon: experience.company.logo,
      date: experience.date,
      title: `${experience.position} @ ${experience.company.name}`,
      description: experience.description,
      company: experience.company,
      index: experience.index,
    }))
    .toSorted((a, b) => a.index - b.index),
);
</script>

<template>
  <UPageSection
    :title="page.experience.title"
    :ui="{
      container: '!p-0 gap-2 sm:gap-2',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'mt-2',
    }"
  >
    <template #description>
      <Motion
        :initial="{ opacity: 0, transform: 'translateY(20px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.4, duration: 0.6 }"
        :in-view-options="{ once: true }"
      >
        <UTimeline
          :items="timelineItems"
          :default-value="2"
          color="primary"
          :ui="{
            wrapper: 'text-left',
            description: 'text-left',
            title: 'text-left',
          }"
        />
      </Motion>
    </template>
  </UPageSection>
</template>
