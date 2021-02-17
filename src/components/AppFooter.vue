<template lang="pug">
footer
  MarkdownDisplay(markdown="markdown")
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import MarkdownDisplay from '@/components/MarkdownDisplay.vue';
import * as GrayscaleIconsMarkdown from '@/projects/grayscale-icons/grayscale-icons.md';
import * as LayeredHeadingsMarkdown from '@/projects/layered-headings/layered-headings.md';
import * as CityPopMarkdown from '@/projects/city-pop/city-pop.md';
import * as LostInParadiseMarkdown from '@/projects/lost-in-paradise/lost-in-paradise.md';

export default defineComponent({
  name: 'AppFooter',
  components: {
    MarkdownDisplay
  },
  setup() {
    const router = useRouter();
    const markdown = ref();

    const routeName = router.currentRoute.value.name;

    if (routeName === 'GrayscaleIcons') {
      markdown.value = GrayscaleIconsMarkdown;
    }

    if (routeName === 'LayeredHeadings') {
      markdown.value = LayeredHeadingsMarkdown;
    }

    if (routeName === 'CityPop') {
      markdown.value = CityPopMarkdown;
    }

    if (routeName === 'LostInParadise') {
      markdown.value = LostInParadiseMarkdown;
    }

    return {
      markdown
    };
  }
});
</script>
