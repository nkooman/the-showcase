<template lang="pug">
.markered-background
  canvas.canvas(ref="canvas" v-bind="canvasSize")
  .wrapper(ref="wrapper")
    slot
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUpdated } from 'vue';

const rough = require('roughjs/bundled/rough.cjs');

export default defineComponent({
  name: 'MarkeredBackground',

  props: {
    stroke: String,
    fill: String
  },

  setup(props) {
    const canvas = ref<HTMLCanvasElement>();
    const wrapper = ref<HTMLDivElement>();
    const canvasSize = ref();
    const config = {
      options: {
        roughness: 3,
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

      const context = canvas.value.getContext('2d');

      if (context) {
        context.clearRect(0, 0, canvas.value.width, canvas.value.height);
      }

      const roughCanvas = rough.canvas(canvas.value, config);

      const height = wrapper.value.offsetHeight;
      const width = wrapper.value.offsetWidth;

      canvasSize.value = { height, width };
      roughCanvas.rectangle(width * 0.1, height * 0.1, width * 0.8, height * 0.8);
    };

    onMounted(draw);
    onUpdated(draw);

    return {
      canvas,
      wrapper,
      canvasSize
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
</style>
