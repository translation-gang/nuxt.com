<script setup lang="ts">
import { splitByCase, upperFirst } from 'scule'

const props = defineProps({
  to: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: false,
    default: ''
  }
})

const createBreadcrumb = (link: string = 'Missing link') => {
  if (link.startsWith('http')) {
    return link
  }
  return link
    .split('/')
    .filter(Boolean)
    .map(part =>
      splitByCase(part)
        .map(p => upperFirst(p))
        .join(' ')
    )
    .join(' > ')
    .replace('Api', 'API')
}

const computedTitle = computed<string>(() => props.title || createBreadcrumb(props.to))
</script>

<template>
  <Callout icon="i-ph-bookmark-simple" :to="to">
    <MDCSlot unwrap="p">
      Узнать больше <span class="font-bold" v-text="computedTitle" />.
    </MDCSlot>
  </Callout>
</template>
