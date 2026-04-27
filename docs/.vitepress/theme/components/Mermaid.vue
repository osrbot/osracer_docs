<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import mermaid from 'mermaid'

const props = defineProps<{
  code: string
}>()

const container = ref<HTMLElement>()

async function renderDiagram() {
  if (!container.value) return
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default'
  })
  const id = `mermaid-${Math.random().toString(36).slice(2)}`
  const { svg } = await mermaid.render(id, props.code)
  container.value.innerHTML = svg
}

onMounted(renderDiagram)
watch(() => props.code, renderDiagram)
</script>

<template>
  <div ref="container" class="mermaid-wrapper" aria-label="Architecture diagram"></div>
</template>
