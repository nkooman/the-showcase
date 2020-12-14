<template lang="pug">
.grid-item(:style="gridArea")
  slot
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

export type Size = [number, number];
export type Position = [number, number];

export default defineComponent({
  name: 'GridItem',

  props: {
    size: {
      type: Object as PropType<Size>,
      required: true
    },
    position: {
      // The position is the upper left corner of the grid item
      type: Object as PropType<Position>,
      required: true
    }
  },

  setup(props) {
    /*
      Grid Area:

      https://developer.mozilla.org/en-US/docs/Web/CSS/grid-area

      If four <grid-line> values are specified,
      grid-row-start is set to the first value,
      grid-column-start is set to the second value,
      grid-row-end is set to the third value,
      and grid-column-end is set to the fourth value.

      Ex: grid-area: 2 / 1 / 2 / 4;
    */

    const { size, position } = props;

    const gridRowStart = position[1];
    const gridRowEnd = position[1] + size[1];
    const gridColumnStart = position[0];
    const gridColumnEnd = position[0] + size[0];

    const gridArea = computed(() => `grid-area: ${gridRowStart} / ${gridColumnStart} / ${gridRowEnd} / ${gridColumnEnd}`);

    return { gridArea };
  }
});
</script>

<style lang="scss">
.grid-item {
  position: relative;

  // Sets box inside of gridlines.
  margin: 1px 0 0 1px;
  padding: 2rem;

  background: #b4ada1;
}
</style>
