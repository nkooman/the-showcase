<template lang="pug">
.clicker-game
  button(@click="addCurrency(1)") Click me!
  span {{ currency }}
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ClickerGame',
  setup() {
    const currency = ref(0);

    const addCurrency = (amountToAdd: number) => {
      currency.value += amountToAdd;
    };

    return {
      currency,
      addCurrency
    };
  }
});
</script>

<style lang="scss" scoped>
.clicker-game {
  height: 100%;
  font-size: 2rem;
  color: #fff;
}
</style>
