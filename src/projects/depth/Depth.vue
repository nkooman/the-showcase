<template lang="pug">
.depth
  - var layerCount = 2;
  - for (var i = 0; i < layerCount; i += 1)
    .container
      span Depth
      span Depth
      span Depth
      span Depth
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Depth'
});
</script>

<style lang="scss" scoped>
$layer-count: 2;
$text-color: hsl(0, 0%, 100%);

.depth {
  height: 100%;

  .container {
    @for $i from 0 through $layer-count {
      span:nth-child(#{$i + 1}) {
        color: darken($text-color, $i * 2%);
      }
    }
  }
}
</style>
