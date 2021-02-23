<template lang="pug">
.neumorphism
  .wrapper
    .button-group
      Button(iconActiveColor="#ff8a7d") favorite
      Button(iconActiveColor="#b5ffc1") share
      Button(iconActiveColor="#9ec2ff") settings
      Button(iconActiveColor="#bcb5ff") add
    .input-group
      Input(placeholder="Username...")
      Input(placeholder="Password...")
      Input(placeholder="Email...")
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
  background: #1d1d1d;
  height: 100%;
  padding: 2rem;
  font-family: 'Rubik', sans-serif;
}

.wrapper {
  max-width: 400px;
  margin: 5rem auto 0;
}

.button-group {
  display: grid;
  grid: 1fr / repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 5rem;
  width: 100%;
}

.input-group {
  display: grid;
  grid: 1fr 1fr 1fr / 1fr;
  gap: 2rem;
  margin-bottom: 5rem;
}
</style>
