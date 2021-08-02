<template lang="pug">
.depth
  - var layerCount = 40;
  - for (var i = 0; i < layerCount; i += 1)
    .wrapper
      .container
        - for (var j = 0; j < 4; j += 1)
          span.text Depth
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Depth'
});
</script>

<style lang="scss" scoped>
@include google-font('Syncopate', 700);

$layer-count: 40;
$text-color: hsl(0, 0%, 100%);
$z-index: 100;

.depth {
  position: relative;

  display: grid;
  height: 100%;

  font-family: 'Syncopate', sans-serif;
  place-items: center;

  @media (map-get($viewport, 'max-width-7')) {
    transform: scale(0.5);
  }

  .wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: $z-index;

    width: min-content;
    margin-right: -50%;

    transform: translate(-50%, -50%);

    &:first-child {
      padding: 10rem;

      @media (map-get($viewport, 'max-width-7')) {
        padding: 5rem;
      }

      border: white 2px solid;

      .container {
        filter: drop-shadow(0 0 40px hsla(0, 0%, 100%, 0.7));
      }
    }
  }

  /* stylelint-disable no-descending-specificity */
  .container {
    /* stylelint-enable no-descending-specificity */
    position: relative;

    display: grid;
    grid-template-areas: 'top top' 'left right' 'bottom bottom';
    width: min-content;
  }

  @for $i from 2 through $layer-count {
    $j: $i - 1;
    .wrapper:nth-child(#{$i}) {
      z-index: $z-index - $i + 1;

      perspective: 50px;

      perspective-origin: center;

      .container {
        transform: rotate($j * -2deg) translateZ(-#{$j}px);

        .text {
          color: darken($text-color, $j * 1%);

          font-size: #{10 - ($j * 0.2)}rem;
        }
      }
    }
  }

  .text {
    width: min-content;

    color: $text-color;

    font-size: 10rem;
    text-transform: uppercase;
    -webkit-text-stroke: 1px black;
  }

  .text:nth-child(1) {
    grid-area: top;

    margin-bottom: -10px;
  }

  .text:nth-child(2) {
    grid-area: left;

    transform: rotate(180deg);
    writing-mode: vertical-lr;
  }

  .text:nth-child(3) {
    grid-area: right;

    justify-self: end;

    writing-mode: vertical-rl;
  }

  .text:nth-child(4) {
    grid-area: bottom;
    margin-top: -10px;

    transform: rotate(180deg);
  }
}
</style>
