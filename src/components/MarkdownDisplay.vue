<template lang="pug">
article.markdown-display(v-add-target="'_blank'" v-html="html")
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import marked from 'marked';
import DOMPurify from 'dompurify';

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
    const html = computed(() => DOMPurify.sanitize(marked(markdown)));

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
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 5rem 2.5rem;

  font-size: 100%;

  font-family: 'Lora', serif;

  :deep() {
    @import '~@/styles/utils/markdown';

    * {
      font-size: 2rem;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: 'Archivo Black', sans-serif;
    }

    #ideas + ul {
      list-style-type: none;

      input:checked::before {
        position: absolute;

        display: grid;

        width: inherit;
        height: inherit;

        color: #fff;

        font-size: 8px;

        background-color: #1b2127;
        border-radius: 2px;

        content: '✔';
        place-items: center;
      }
    }
  }
}
</style>
