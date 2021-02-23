<template lang="pug">
.city-pop
  .content-wrapper
    img.background(src="./assets/background.jpg")
    .artist
      h1.title Mariya Takeuchi
      h1.title.jp-vertical-text 竹内 まりや
      .image-wrapper
        img.image(src="./assets/mariya_takeuchi.jpg")
        //- This is reversed so that the natural stacking order will order correctly.
        .afterimage.offset-4
        .afterimage.offset-3
        .afterimage.offset-2
        .afterimage.offset-1
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CityPop'
});
</script>

<style lang="scss" scoped>
@include google-font('Noto Sans JP', 900);

$blue: #9bbfd1;
$magenta: #cd9bd1;
$yellow: #fff766;
$purple: #a49bd1;
$green: #9bd1a9;

$padding: clamp(2rem, 6vmax, 10rem);

.city-pop {
  width: 100%;
  height: 100%;
  padding: $padding;
  overflow: hidden;

  font-family: 'Noto Sans JP', sans-serif;

  background: $yellow;
}

.content-wrapper {
  position: relative;

  width: 100%;

  height: 100%;
}

.background {
  position: absolute;
  z-index: 0;

  width: 100%;

  height: 100%;
  object-fit: cover;

  filter: grayscale(0.1) sepia(0.2) contrast(1.1) brightness(0.8);
}

.jp-vertical-text {
  writing-mode: vertical-rl;
}

.artist {
  position: relative;
  z-index: 1;

  width: 100%;

  height: 100%;
}

.title {
  margin: 0;
  padding: calc(0.5 * #{$padding});

  color: $yellow;
  font-weight: 900;
  font-size: clamp(4rem, 5vmax, 8rem);
  line-height: 1;
}

.image-wrapper {
  position: absolute;
  top: 0;

  width: 100%;
  height: 100%;
}

$top: calc(100% - clamp(10rem, 30%, 20rem));
$right: calc(-0.5 * #{$padding});
$offset: calc(-0.5 * #{$padding});
$image-size: clamp(15rem, 22vmax, 40rem);

$colors: (
  1: $green,
  2: $blue,
  3: $magenta,
  4: $purple
);

.image {
  position: absolute;

  top: $top;
  right: $right;
  z-index: 10;

  width: $image-size;
  height: $image-size;
  object-fit: cover;

  transform: translateY(-50%);
}

.afterimage {
  position: absolute;
  top: $top;
  right: $right;

  width: $image-size;
  height: $image-size;

  &.offset {
    @each $index, $color in $colors {
      $calculated-offset: calc(#{$index} * #{$offset});

      &-#{$index} {
        background: $color;
        transform: translate($calculated-offset, calc(-50% + #{$calculated-offset}));
      }
    }
  }
}
</style>
