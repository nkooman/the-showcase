<template lang="pug">
.markered-path(@mouseover="hover = true" @mouseleave="hover = false")
  canvas(ref="canvas" height="200" width="200")
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUpdated, watch } from 'vue';

const rough = require('roughjs/bundled/rough.cjs');

export default defineComponent({
  name: 'MarkeredPath',

  props: {
    stroke: String,
    fill: String,
    animateOnHover: Boolean,
    path: String
  },

  setup(props) {
    const canvas = ref<HTMLCanvasElement>();
    const roughCanvas = ref();

    const config = {
      options: {
        roughness: 2,
        bowing: 0,
        stroke: props.stroke,
        strokeWidth: 3,
        fill: props.fill,
        fillStyle: 'zigzag',
        fillWeight: 20,
        hachureAngle: -51,
        hachureGap: 27,
        simplification: 0.1
      }
    };

    const draw = () => roughCanvas.value.path(props.path);

    onMounted(() => {
      roughCanvas.value = rough.canvas(canvas.value, config);

      draw();
    });

    onUpdated(draw);

    const hover = ref<boolean>();
    const intervalId = ref<number>();

    watch(hover, value => {
      if (value && props.animateOnHover) {
        intervalId.value = setInterval(() => {
          roughCanvas.value.ctx.clearRect(0, 0, roughCanvas.value.canvas.width, roughCanvas.value.canvas.height);

          draw();
        }, 75);
      } else {
        clearInterval(intervalId.value);
      }
    });

    return {
      canvas,
      hover
    };
  }
});
</script>

<style lang="scss" scoped></style>
