<template lang="pug">
footer.footer
  MarkdownDisplay(:markdown="markdown" :key="markdown")
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import MarkdownDisplay from '@/components/MarkdownDisplay.vue';

export default defineComponent({
  name: 'AppFooter',
  components: {
    MarkdownDisplay
  },
  setup() {
    const route = useRoute();
    const markdown = computed(() => route.meta.markdown);

    return {
      markdown
    };
  }
});
</script>

<style lang="scss" scoped>
.footer {
  height: 20rem;
  padding: 1rem;

  background: #2c3238;
}
</style>
