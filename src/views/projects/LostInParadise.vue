<template lang="pug">
.lost-in-paradise
  AnimationToggle(v-model:animationToggle="animationToggle")
  MarkeredBackground.title(:stroke="'#252226'" :fill="'#46c1d0'" :animate="animationToggle")
    h1 Lost in Paradise
  MarkeredPath(
    :stroke="'#252226'"
    :fill="'#ee5456'"
    :animate="animationToggle"
    :path="path"
    :height="250"
    :width="250")
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MarkeredBackground from '@/components/projects/lost-in-paradise/MarkeredBackground.vue';
import MarkeredPath from '@/components/projects/lost-in-paradise/MarkeredPath.vue';
import AnimationToggle from '@/components/projects/lost-in-paradise/AnimationToggle.vue';
import { shrimp } from '@/assets/projects/lost-in-paradise/shrimp';

export default defineComponent({
  name: 'LostInParadise',
  components: {
    MarkeredBackground,
    MarkeredPath,
    AnimationToggle
  },

  setup() {
    const animationToggle = ref<boolean>();

    return {
      path: shrimp,
      animationToggle
    };
  }
});
</script>

<style lang="scss" scoped>
@include google-font('Caveat', 400);

$blue: #46c1d0;
$yellow: #fede35;
$red: #ee5456;
$gray: #525252;
$black: #252226;
$white: #f9f9f9;

.lost-in-paradise {
  display: grid;
  gap: 5rem;
  width: 100%;
  height: 100%;

  font-family: 'Caveat', sans-serif;

  background: $yellow;
  place-items: center;
  place-content: center;
}

.title {
  font-weight: 700;

  font-size: clamp(1rem, 3vw, 3rem);

  h1 {
    width: max-content;
    margin: 0 auto;

    line-height: 1;

    text-align: center;
  }
}
</style>
