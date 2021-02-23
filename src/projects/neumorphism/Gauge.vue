<template lang="pug">
.gauge
  .inner-gauge
    span {{ percentComplete }}%
  svg.gauge-fill(height="20rem" width="20rem")
    path.gauge-fill-path(d="M25,100a75,75 0 1,0 150,0a75,75 0 1,0 -150,0" stroke-linecap="round" ref="gaugeFillPath")

</template>

<script lang="ts">
import { defineComponent, onMounted, ref, onBeforeUnmount } from 'vue';
import anime from 'animejs';
import GradientPath from 'gradient-path';

export default defineComponent({
  name: 'Gauge',
  setup() {
    const gaugeFillPath = ref();
    const isForward = ref(true);
    const percentComplete = ref(0);
    const gaugeAnimation = ref();

    onMounted(() => {
      const gp = new GradientPath({
        path: gaugeFillPath.value,
        segments: 15,
        samples: 10,
        precision: 10
      });

      const colors = [
        { color: 'rgba(193, 34, 195, 1)', pos: 0 },
        { color: 'rgba(255, 234, 67, 1)', pos: 0.5 },
        { color: 'rgba(193, 34, 195, 1)', pos: 1 }
      ];

      gp.render({
        type: 'circle',
        stroke: colors,
        fill: colors,
        strokeWidth: 1,
        width: 25
      });

      const animation = (direction: string) => {
        gaugeAnimation.value = anime({
          targets: document.querySelectorAll('.gauge-fill .circle-sample'),
          opacity: [0, 1],
          easing: 'easeInOutSine',
          duration: 1,
          direction,
          delay: anime.stagger(20),
          update: anim => {
            percentComplete.value = Math.round(anim.progress);
          },
          complete: () => {
            setTimeout(() => {
              isForward.value = !isForward.value;
              animation(isForward.value ? 'normal' : 'reverse');
            }, 1000);
          }
        });
      };

      animation('normal');
    });

    onBeforeUnmount(() => {
      gaugeAnimation.value.remove(document.querySelectorAll('.gauge-fill .circle-sample'));
    });

    return {
      gaugeFillPath,
      percentComplete
    };
  }
});
</script>

<style lang="scss" scoped>
$dark: #141414;
$light: #282828;
$background: #1d1d1d;

.gauge {
  margin: 0 auto;
  box-shadow: -5px -5px 20px 0px $light, 10px 10px 20px 5px $dark;
  height: 20rem;
  width: 20rem;
  display: grid;
  place-items: center;
  border-radius: 50%;
}

.inner-gauge {
  box-shadow: inset -5px -5px 20px -5px $light, inset 5px 5px 20px -5px $dark;
  height: 50%;
  width: 50%;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #a7a7a7;
  font-size: 2rem;
}

.gauge-fill {
  position: absolute;
  transform: rotate(83deg);
}
</style>
