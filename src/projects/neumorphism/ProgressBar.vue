<template lang="pug">
.progress-bar
  .progress-bar-fill(ref="progressBarFill")
  .progress-bar-tooltip(ref="progressTooltip") {{ progressFill }}%
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import anime from 'animejs';

export default defineComponent({
  name: 'ProgressBar',
  setup() {
    const progressBarFill = ref();
    const progressTooltip = ref();
    const progressFill = ref();
    onMounted(() => {
      const progressBarAnimation = () => {
        const randomWidth = anime.random(0, 96);
        anime({
          targets: progressBarFill.value,
          width: `${randomWidth}%`,
          easing: 'easeOutExpo',
          duration: 3000,
          complete: progressBarAnimation
        });
        anime({
          targets: progressTooltip.value,
          left: `calc(${randomWidth}% - 3rem)`,
          easing: 'easeOutExpo',
          duration: 3000,
          update: () => {
            progressFill.value = Math.round((randomWidth / 96) * 100);
          }
        });
      };
      progressBarAnimation();
    });

    return {
      progressBarFill,
      progressTooltip,
      progressFill
    };
  }
});
</script>

<style lang="scss" scoped>
$dark: #141414;
$light: #282828;
$background: #1d1d1d;

.progress-bar {
  position: relative;

  display: grid;
  width: 100%;
  height: 2rem;
  margin: 10rem 0;

  border-radius: 2rem;
  box-shadow: -5px -5px 20px 0 $light, 10px 10px 20px 5px $dark;
  place-items: center flex-start;
}

.progress-bar-fill {
  height: 0.6rem;
  margin: 0 2%;

  background: linear-gradient(90deg, rgba(193, 34, 195, 1) 0%, rgba(255, 234, 67, 1) 100%);
  border-radius: 1rem;
}

.progress-bar-tooltip {
  position: absolute;
  top: -6rem;

  display: grid;
  width: 8rem;
  height: 5rem;

  color: #fff;
  color: #a7a7a7;
  font-size: 2rem;

  background: $background;
  border-radius: 1rem;
  box-shadow: -5px -5px 18px 0 $light, 10px 10px 20px 5px $dark;
  place-items: center;

  &::before {
    position: absolute;
    bottom: calc(-50% + 15px);

    width: 0;
    height: 0;

    border-top: 10px solid $background;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;

    content: ' ';
  }
}
</style>
