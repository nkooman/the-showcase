<template lang="pug">
.gridlock
  Grid
    GridItem(
      :size="[23, 2]"
      :position="[2, 2]")
      .header
        h1.title HEADER
    GridItem(
      :size="[3, 4]"
      :position="[5, 6]")
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Grid from '@/components/projects/gridlock/Grid.vue';
import GridItem from '@/components/projects/gridlock/GridItem.vue';

export default defineComponent({
  name: 'Gridlock',

  components: {
    Grid,
    GridItem
  }
});
</script>

<style lang="scss" scoped>
@include google-font('Tinos', (400, 700));

.gridlock {
  width: 100%;
  height: 100%;

  color: rgb(43, 43, 43);

  font-family: 'Tinos', serif;

  background: #d4cdc1;
}

.header {
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center center;
}

.title {
  margin: 0;

  font-size: clamp(2rem, 5vw, 8rem);
  line-height: 1;

  &::before,
  &::after {
    padding: 0 5rem;

    letter-spacing: -10px;

    content: '=========';
  }
}
</style>
