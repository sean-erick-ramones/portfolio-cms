<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <UPageSection
    v-if="page.aiWorkflows"
    :title="page.aiWorkflows.title"
    :description="page.aiWorkflows.description"
    :ui="{
      container: 'px-0 !pt-0 sm:gap-6 lg:gap-8',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-2 text-sm sm:text-md lg:text-sm text-muted'
    }"
  >
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Motion
        v-for="(item, index) in page.aiWorkflows.items"
        :key="index"
        :initial="{
          scale: 1.05,
          opacity: 0,
          filter: 'blur(12px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.5,
          delay: 0.1 + index * 0.1
        }"
      >
        <UCard
          variant="outline"
          :ui="{
            root: 'h-full',
            body: 'h-full flex flex-col gap-3'
          }"
        >
          <div class="flex items-center gap-2">
            <UIcon
              v-if="item.icon"
              :name="item.icon"
              class="size-5 text-primary"
            />
            <h3 class="text-base font-medium">
              {{ item.title }}
            </h3>
          </div>
          <p class="text-sm text-muted flex-1">
            {{ item.description }}
          </p>
          <div
            v-if="item.tools?.length"
            class="flex flex-wrap gap-1.5"
          >
            <span
              v-for="tool in item.tools"
              :key="tool"
              class="px-2 py-0.5 rounded-full bg-elevated/60 text-xs text-muted"
            >
              {{ tool }}
            </span>
          </div>
          <UButton
            v-if="item.link"
            :to="item.link"
            size="xs"
            variant="link"
            class="px-0 gap-0"
            label="Learn more"
          >
            <template #trailing>
              <UIcon
                name="i-lucide-arrow-right"
                class="size-4 text-primary"
              />
            </template>
          </UButton>
        </UCard>
      </Motion>
    </div>
  </UPageSection>
</template>
