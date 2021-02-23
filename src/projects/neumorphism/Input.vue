<template lang="pug">
input.input(:placeholder="placeholder")
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Input',
  props: {
    placeholder: {
      type: String,
      required: false
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
  all: unset;
  background: $background;
  height: 3rem;
  padding: 1rem 3rem;
  font-size: 2rem;
  color: $color;
  box-shadow: inset -5px -5px 5px -5px $light, inset 5px 5px 20px -5px $dark;
  border-radius: 5rem;

  &::placeholder {
    color: #525252;
  }
}
</style>
