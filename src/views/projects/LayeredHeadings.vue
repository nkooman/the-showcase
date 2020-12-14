<template lang="pug">
.layered-headings
  .container(v-for="{ src, alt, title } in images")
    img.image(:src="src" :alt="alt")
    .heading
      h1.title.front {{ title }}
      h1.title.back {{ title }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { images } from '@/assets/projects/layered-headings';

export default defineComponent({
  name: 'LayeredHeadings',

  data: () => ({
    images
  })
});
</script>

<style lang="scss" scoped>
@include google-font('Martel Sans', 900);

$font-color: #00d2be;

.layered-headings {
  overflow-x: hidden;

  background: #464646;
}

.container {
  position: relative;

  height: 100vh;

  padding: clamp(7.5rem, 10vw, 10rem);
  padding-left: 0;

  @media (map-get($viewport, 'min-width-7')) {
    padding-left: clamp(7.5rem, 10vw, 10rem);
  }
}

.image {
  position: absolute;
  z-index: 2;

  width: clamp(30rem, 75%, 85rem);
  height: clamp(50rem, 75%, 85rem);
  object-fit: cover;

  filter: brightness(0.6);
}

.heading {
  position: absolute;
  top: 5%;
  left: clamp(30rem, 80%, 85rem);

  @media (map-get($viewport, 'min-width-12')) {
    top: -2.5%;
    left: clamp(15rem, 50%, 40rem);
  }
}

.title {
  font-weight: 900;
  font-size: 6rem;
  font-family: 'Martel Sans', sans-serif;
  line-height: 1;
  text-transform: uppercase;

  @media (map-get($viewport, 'min-width-7')) {
    font-size: 12rem;
  }
}

.front,
.back {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  writing-mode: vertical-rl;

  @media (map-get($viewport, 'min-width-12')) {
    writing-mode: horizontal-tb;
  }
}

.front {
  z-index: 3;

  color: transparent;

  -webkit-text-stroke: 2px $font-color;
}

.back {
  z-index: 1;

  color: $font-color;
}
</style>
