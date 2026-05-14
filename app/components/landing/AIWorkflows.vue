<script setup lang="ts">
import type { IndexCollectionItem } from "@nuxt/content";

defineProps<{
  page: IndexCollectionItem;
}>();
</script>

<template>
  <UPageSection
    v-if="page.aiWorkflows"
    :title="page.aiWorkflows.title"
    :description="page.aiWorkflows.description"
    :ui="{
      container: 'px-0 !pt-0 sm:gap-6 lg:gap-8',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-2 text-sm sm:text-md lg:text-sm text-muted',
    }"
  >
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Motion
        v-for="(item, index) in page.aiWorkflows.items"
        :key="index"
        :initial="{
          scale: 1.05,
          opacity: 0,
          filter: 'blur(12px)',
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
        }"
        :transition="{
          duration: 0.5,
          delay: 0.1 + index * 0.1,
        }"
      >
        <UPageCard
          :icon="item.icon"
          :title="item.title"
          :description="item.description"
          variant="outline"
          :ui="{
            root: 'h-full',
            body: 'h-full flex flex-col gap-3',
            title: 'text-base font-medium',
            description: 'text-sm text-muted flex-1',
            leadingIcon: 'size-5 text-primary',
          }"
        >
          <template #footer>
            <div
              v-if="item.tools?.length"
              class="flex flex-wrap gap-1.5"
            >
              <UBadge
                v-for="tool in item.tools"
                :key="tool"
                :label="tool"
                color="neutral"
                variant="soft"
                size="sm"
              />
            </div>
            <UButton
              v-if="item.link"
              :to="item.link"
              target="_blank"
              size="xs"
              variant="link"
              class="px-0 gap-0 mt-2"
              label="Learn more"
              trailing-icon="i-lucide-arrow-right"
            />
          </template>
        </UPageCard>
      </Motion>
    </div>
  </UPageSection>
</template>
