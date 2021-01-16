<template lang="pug">
.lost-in-paradise
  MarkeredBackground.title(:stroke="'#252226'" :fill="'#46c1d0'")
    h1 Lost in Paradise
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MarkeredBackground from '@/components/projects/lost-in-paradise/MarkeredBackground.vue';

export default defineComponent({
  name: 'LostInParadise',
  components: {
    MarkeredBackground
  }
});
</script>

<style lang="scss" scoped>
@include google-font('Josefin Sans', 400);

$blue: #46c1d0;
$yellow: #fede35;
$red: #ee5456;
$gray: #525252;
$black: #252226;
$white: #f9f9f9;

.lost-in-paradise {
  display: grid;
  width: 100%;
  height: 100%;

  font-family: 'Josefin Sans', sans-serif;

  background: $yellow;
  place-items: center;
}

.title {
  font-weight: 900;

  font-size: 3rem;
  // text-transform: uppercase;

  h1 {
    width: max-content;
    height: 0;
    margin: 0;
    padding: 10rem;

    line-height: 1rem;
  }
}
</style>
