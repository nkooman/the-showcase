<template lang="pug">
.landing
  span.welcome Welcome to
  h1.title The Showcase
  p.description The goal of this space is to present different ideas I have for UI/UX design and small CSS or JS projects.
  p.github You can check out the source code on
    = ' '
    LinkIcon(
      :href="'https://github.com/nkooman/the-showcase/'"
      :title="'Link to the GitHub repository'"
      :text="'GitHub'"
      :icon-before="'link'"
      :is-external="true")
    | !
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import LinkIcon from '@/components/LinkIcon.vue';

export default defineComponent({
  name: 'Landing',

  components: {
    LinkIcon
  }
});
</script>

<style lang="scss" scoped>
@include google-font('Archivo Black');
@include google-font('Lora');

.landing {
  width: 100%;
  height: 100%;
  padding: 3rem;

  background: #fff;
}

.welcome {
  font-size: clamp(2.5rem, 4.5vw, 7.5rem);
  line-height: 100%;
}

.title {
  margin: 0;

  font-size: clamp(3rem, 9vw, 20rem);
}

.welcome,
.title {
  font-family: 'Archivo Black', sans-serif;
  line-height: 0.75;
  text-transform: uppercase;
}

.description,
.github {
  margin: 5rem 0;

  color: #000;
  font-size: clamp(2rem, 2vw, 3rem);
  font-family: 'Lora', serif;
}
</style>
