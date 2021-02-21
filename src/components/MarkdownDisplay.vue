<template lang="pug">
.markdown-display(v-html="html")
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
      required: true,
      default: ''
    }
  },
  setup({ markdown }) {
    const html = computed(() => sanitizeHtml(marked(markdown)));

    return {
      html
    };
  }
});
</script>

<style lang="scss" scoped>
@include google-font('Archivo Black');
@include google-font('Lora');

.markdown-display {
  font-family: 'Lora', serif;

  background: white;
}
</style>
