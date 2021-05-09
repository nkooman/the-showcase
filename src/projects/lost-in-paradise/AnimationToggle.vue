<template lang="pug">
label.switch
  input(v-model="toggle" type="checkbox")
  div
    span Animations?
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVModel } from 'vue-composable';

export default defineComponent({
  name: 'AnimationToggle',
  emits: ['update:animationToggle'],
  props: {
    animationToggle: Boolean
  },
  setup(props) {
    const toggle = useVModel(props, 'animationToggle');

    return {
      toggle
    };
  }
});
</script>

<style lang="scss" scoped>
// CSS from here: https://codepen.io/aaroniker/pen/rNNLQVe
$blue: #46c1d0;
$yellow: #fede35;
$red: #ee5456;
$gray: #525252;
$black: #252226;
$white: #f9f9f9;

.switch {
  --duration: 0.3s;
  cursor: pointer;

  input {
    display: none;

    & + div {
      position: relative;

      &::before,
      &::after {
        --s: 1;
        position: absolute;
        top: 10px;

        width: 24px;
        height: 4px;

        background: $black;
        transform: scaleX(var(--s));

        transition: transform var(--duration) ease;

        content: '';
      }

      &::before {
        --s: 0;
        left: 0;

        border-radius: 2px 0 0 2px;
        transform-origin: 0 50%;
      }

      &::after {
        left: 28px;

        border-radius: 0 2px 2px 0;
        transform-origin: 100% 50%;
      }

      span {
        padding-left: 56px;

        color: $black;
        font-size: 3rem;
        line-height: 24px;

        &::before {
          --x: 0;
          --b: #{$gray};
          --s: 4px;
          position: absolute;
          top: 0;
          left: 0;

          width: 24px;
          height: 24px;

          border-radius: 50%;
          box-shadow: inset 0 0 0 var(--s) var(--b);
          transform: translateX(var(--x));

          transition: box-shadow var(--duration) ease, transform var(--duration) ease;

          content: '';
        }

        &:not(:empty) {
          padding-left: 64px;
        }
      }
    }

    &:checked {
      & + div {
        &::before {
          --s: 1;
        }

        &::after {
          --s: 0;
        }

        span {
          &::before {
            --x: 28px;
            --s: 12px;
            --b: #{$blue};
          }
        }
      }
    }
  }
}
</style>
