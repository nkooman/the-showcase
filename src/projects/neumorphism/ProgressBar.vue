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
  height: 2rem;
  width: 100%;
  border-radius: 2rem;
  display: grid;
  position: relative;
  margin: 10rem 0;
  place-items: center flex-start;
  box-shadow: -5px -5px 20px 0px $light, 10px 10px 20px 5px $dark;
}

.progress-bar-fill {
  height: 0.6rem;
  margin: 0 2%;
  border-radius: 1rem;
  background: linear-gradient(90deg, rgba(193, 34, 195, 1) 0%, rgba(255, 234, 67, 1) 100%);
}

.progress-bar-tooltip {
  position: absolute;
  height: 5rem;
  background: $background;
  width: 8rem;
  color: #fff;
  top: -6rem;
  display: grid;
  color: #a7a7a7;
  border-radius: 1rem;
  place-items: center;
  font-size: 2rem;
  box-shadow: -5px -5px 18px 0px $light, 10px 10px 20px 5px $dark;

  &::before {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;

    border-top: 10px solid $background;
    position: absolute;
    content: ' ';
    bottom: calc(-50% + 15px);
  }
}
</style>
