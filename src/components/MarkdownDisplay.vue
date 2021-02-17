<template lang="pug">
.markdown-display
  pre(v-html="interpretedMarkdown")
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import marked from 'marked';
import sanitizeHtml from 'sanitize-html';

export default defineComponent({
  name: 'MarkdownDisplay',
  props: {
    markdown: {
      type: String,
      required: true
    }
  },
  setup({ markdown }) {
    const interpretedMarkdown = computed(() => {
      return marked(sanitizeHtml(markdown));
    });

    return interpretedMarkdown;
  }
});
</script>

<style lang="scss" scoped>
@include google-font('Archivo Black');
@include google-font('Lora');

.markdown-display {
  font-family: 'Lora', serif;
}
</style>
