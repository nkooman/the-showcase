<template lang="pug">
.markered-background(:style="containerSize" @mouseover="hover = true" @mouseleave="hover = false")
  canvas.canvas(ref="canvas" v-bind="canvasSize")
  .wrapper(ref="wrapper")
    slot
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUpdated, computed, watch } from 'vue';

const rough = require('roughjs/bundled/rough.cjs');

export default defineComponent({
  name: 'MarkeredBackground',

  props: {
    stroke: String,
    fill: String,
    animateOnHover: Boolean
  },

  setup(props) {
    const canvas = ref<HTMLCanvasElement>();
    const wrapper = ref<HTMLDivElement>();
    const roughCanvas = ref();

    const canvasSize = computed(() => ({
      height: wrapper.value?.offsetHeight,
      width: wrapper.value?.offsetWidth
    }));

    const containerSize = computed(() => ({
      height: `${wrapper.value?.offsetHeight}px`,
      width: `${wrapper.value?.offsetWidth}px`
    }));

    const config = {
      options: {
        roughness: 6,
        bowing: 1,
        stroke: props.stroke,
        strokeWidth: 3,
        fill: props.fill,
        fillStyle: 'zigzag',
        fillWeight: 20,
        hachureAngle: -51,
        hachureGap: 23
      }
    };

    const draw = () => {
      if (!canvas.value || !wrapper.value) return;

      const height = wrapper.value.offsetHeight;
      const width = wrapper.value.offsetWidth;

      roughCanvas.value.rectangle(width * 0.15, height * 0.15, width * 0.7, height * 0.7);
    };

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
      wrapper,
      canvasSize,
      containerSize,
      hover
    };
  }
});
</script>

<style lang="scss" scoped>
.markered-background {
  position: relative;
}

.canvas,
.wrapper {
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
}

.wrapper {
  padding: 7rem 14rem;
}
</style>
