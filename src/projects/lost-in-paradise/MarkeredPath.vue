<template lang="pug">
.markered-path(@mouseover="hover = true" @mouseleave="hover = false")
  canvas(ref="canvasElement" :height="height" :width="width")
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUpdated, watch } from 'vue';
import { RoughCanvas } from 'roughjs/bin/canvas';
import { Config } from 'roughjs/bin/core';

const rough = require('roughjs/bundled/rough.cjs');

export default defineComponent({
  name: 'MarkeredPath',

  props: {
    stroke: String,
    fill: String,
    animate: Boolean,
    path: {
      type: String,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    }
  },

  setup(props) {
    const canvasElement = ref<HTMLCanvasElement>();
    const roughCanvas = ref<RoughCanvas>();

    const config: Config = {
      options: {
        roughness: 1.5,
        bowing: 0,
        stroke: props.stroke,
        strokeWidth: 2.5,
        fill: props.fill,
        fillStyle: 'zigzag',
        fillWeight: 20,
        hachureAngle: -51,
        hachureGap: 27,
        disableMultiStroke: true
      }
    };

    const draw = () => {
      roughCanvas.value?.path(props.path);
    };

    onMounted(() => {
      roughCanvas.value = rough.canvas(canvasElement.value, config);

      draw();
    });

    onUpdated(draw);

    const intervalId = ref<number>();

    const clearCanvas = () => {
      const context = canvasElement.value?.getContext('2d');
      context?.clearRect(0, 0, context.canvas.width, context.canvas.height);
    };

    const redraw = () => {
      clearCanvas();
      draw();
    };

    watch(
      () => props.animate,
      value => {
        value ? (intervalId.value = setInterval(redraw, 75)) : clearInterval(intervalId.value);
      }
    );

    return {
      canvasElement,
      height: props.height,
      width: props.width
    };
  }
});
</script>
