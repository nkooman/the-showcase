<template lang="pug">
.markered-background(:style="containerSize")
  canvas.canvas(ref="canvasElement" v-bind="canvasSize")
  .wrapper(ref="wrapper")
    slot
</template>

<script lang="ts">
/// <reference types="resize-observer-browser" />
import { defineComponent, ref, onMounted, computed, watch } from 'vue';
import { RoughCanvas } from 'roughjs/bin/canvas';
import { Config } from 'roughjs/bin/core';

const rough = require('roughjs/bundled/rough.cjs');

export default defineComponent({
  name: 'MarkeredBackground',

  props: {
    stroke: String,
    fill: String,
    animate: Boolean
  },

  setup(props) {
    const canvasElement = ref<HTMLCanvasElement>();
    const wrapper = ref<HTMLDivElement>();
    const roughCanvas = ref<RoughCanvas>();

    const height = ref(wrapper.value?.offsetHeight || 0);
    const width = ref(wrapper.value?.offsetWidth || 0);

    const canvasSize = computed(() => ({
      height: height.value,
      width: width.value
    }));

    const containerSize = computed(() => ({
      height: `${height.value}px`,
      width: `${width.value}px`
    }));

    const config: Config = {
      options: {
        roughness: 3,
        bowing: 0.5,
        stroke: props.stroke,
        strokeWidth: 3,
        fill: props.fill,
        fillStyle: 'zigzag',
        fillWeight: 20,
        hachureAngle: -51,
        hachureGap: 23,
        disableMultiStroke: true
      }
    };

    onMounted(() => {
      roughCanvas.value = rough.canvas(canvasElement.value, config);
    });

    const createMarkeredBackground = () =>
      // Reduce size of rectangle to make sure that the fill stroke is not cut off on the edges.
      roughCanvas.value?.rectangle(width.value * 0.05, height.value * 0.15, width.value * 0.9, height.value * 0.7);

    const draw = () => window.requestAnimationFrame(createMarkeredBackground);

    const clearCanvas = () => {
      if (!canvasElement.value) return;

      const context = canvasElement.value.getContext('2d');
      context?.clearRect(0, 0, context.canvas.width, context.canvas.height);
    };

    const hasDrawn = ref(false);

    const initialDraw = () => {
      if (hasDrawn.value) return;

      draw();
      hasDrawn.value = true;
    };

    onMounted(initialDraw);

    const redraw = () => {
      clearCanvas();
      draw();
    };

    const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      entries.forEach(entry => {
        const { inlineSize, blockSize } = entry.borderBoxSize[0];
        width.value = inlineSize;
        height.value = blockSize;
      });

      redraw();
    });

    onMounted(() => {
      if (!wrapper.value) return;

      resizeObserver.observe(wrapper.value);
    });

    const intervalId = ref<number>();

    watch(
      () => props.animate,
      value => {
        value ? (intervalId.value = setInterval(redraw, 75)) : clearInterval(intervalId.value);
      }
    );

    return {
      canvasElement,
      wrapper,
      canvasSize,
      containerSize,
      height,
      width
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
  padding: 7rem;
}
</style>
