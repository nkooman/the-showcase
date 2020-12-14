<template lang="pug">
.grid(:style="gridUnitStyle" ref="grid")
  slot
</template>

<script lang="ts">
import { debounce } from 'lodash';

import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue';

export default defineComponent({
  name: 'Grid',

  setup() {
    const grid = ref<HTMLDivElement>();
    const unitCount = 25;
    const gridUnitLength = ref(0);

    const gridUnitStyle = computed(() => {
      const pixels = `${gridUnitLength.value}px`;
      const rows = `repeat(auto-fill, ${pixels})`;
      const columns = `repeat(${unitCount}, ${pixels})`;

      return {
        backgroundSize: `${pixels} ${pixels}`,
        grid: `${rows} / ${columns}`
      };
    });

    const calculateGridUnit = () => {
      if (!grid.value) return;

      const width = grid.value.offsetWidth;

      gridUnitLength.value = width / unitCount;
    };

    onMounted(() => {
      window.onresize = debounce(calculateGridUnit, 50);

      // Initialize the grid pattern.
      calculateGridUnit();
    });

    onUnmounted(() => {
      window.onresize = null;
    });

    return {
      grid,
      gridUnitStyle
    };
  }
});
</script>

<style lang="scss">
.grid {
  display: grid;
  height: 100%;

  background-image: linear-gradient(to right, rgb(100, 100, 100) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(100, 100, 100) 1px, transparent 1px);
}
</style>
