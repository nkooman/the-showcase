<template lang="pug">
input.input(:type="type" :placeholder="placeholder")
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Input',
  props: {
    placeholder: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: false,
      default: 'text'
    }
  }
});
</script>

<style lang="scss" scoped>
$dark: #141414;
$light: #282828;
$background: #1d1d1d;
$color: #a7a7a7;

.input {
  height: 3rem;
  padding: 1rem 3rem;

  color: $color;
  font-size: 2rem;

  background: $background;
  border-radius: 5rem;
  box-shadow: inset -5px -5px 5px -5px $light, inset 5px 5px 20px -5px $dark;
  all: unset;

  &::placeholder {
    color: #525252;
  }
}
</style>
