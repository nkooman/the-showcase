<template lang="pug">
.grayscale-icons
  IconList.icon-list
    IconListItem.icon-list-item(v-for="image in images" v-bind="image" :key="Math.random()")
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import IconList from '@/components/projects/grayscale-icons/IconList.vue';
import IconListItem from '@/components/projects/grayscale-icons/IconListItem.vue';
import { images as grayscaleIcons } from '@/assets/projects/grayscale-icons';

export default defineComponent({
  name: 'GrayscaleIcons',

  components: {
    IconList,
    IconListItem
  },

  setup() {
    const images = ref(grayscaleIcons);

    return { images };
  }
});
</script>

<style lang="scss" scoped>
.grayscale-icons {
  width: 100%;
  height: 100%;

  background: #252525;
}

.icon-list {
  display: flex;
  flex-flow: column nowrap;
  grid-gap: clamp(3rem, 5vw, 10rem);
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 2rem;

  list-style-type: none;

  @media (map-get($viewport, 'min-width-7')) {
    flex-flow: row nowrap;
  }
}

.icon-list-item {
  width: clamp(5rem, 5vw, 10rem);

  cursor: pointer;

  filter: grayscale(1);

  transition: filter 0s;

  &:hover {
    filter: grayscale(0);

    transition: filter 0.25s ease;
  }
}
</style>
