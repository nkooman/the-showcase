<template lang="pug">
.neumorphism
  .wrapper
    .button-group
      Button(iconActiveColor="#ff8a7d") favorite
      Button(iconActiveColor="#b5ffc1") share
      Button(iconActiveColor="#82b0ff") settings
      Button(iconActiveColor="#796bff") palette
    .input-group
      Input(placeholder="Username...")
      Input(type="password" placeholder="Password...")
      Input(type="email" placeholder="Email...")
    Gauge
    ProgressBar
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from './Button.vue';
import ProgressBar from './ProgressBar.vue';
import Gauge from './Gauge.vue';
import Input from './Input.vue';

export default defineComponent({
  name: 'Neumorphism',
  components: {
    Button,
    ProgressBar,
    Gauge,
    Input
  }
});
</script>

<style lang="scss" scoped>
@include google-font('Rubik');

.neumorphism {
  height: min-content;
  min-height: 100%;
  padding: 2rem;

  font-family: 'Rubik', sans-serif;

  background: #1d1d1d;
}

.wrapper {
  max-width: 400px;
  margin: 5rem auto 0;
}

.button-group {
  display: grid;
  grid: 1fr / repeat(4, 1fr);
  gap: 2rem;
  width: 100%;
  margin-bottom: 5rem;
}

.input-group {
  display: grid;
  grid: 1fr 1fr 1fr / 1fr;
  gap: 2rem;
  margin-bottom: 5rem;
}
</style>
