<template lang="pug">
.clicker-game
  h1.currency You have {{ currency }} coins
  button(@click="addCurrency(1)") Click me!
  button(@click="resetGame") Reset Game
  button(@click="tryCreateSimpleAutoClicker") Buy Simple Auto Clicker
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'ClickerGame',
  setup() {
    const store = useStore();
    const currency = computed(() => store.state.clickerGame.currency);

    const resetGame = () => {
      store.dispatch('clickerGame/resetGame');
    };

    const addCurrency = (amountToAdd: number) => {
      store.dispatch('clickerGame/addCurrency', amountToAdd);
    };

    const tryCreateAutoClicker = (time: number) => (cost: number) => (increment: number) => {
      if (currency.value < cost) return;
      store.dispatch('clickerGame/removeCurrency', cost);
      setInterval(() => store.dispatch('clickerGame/addCurrency', increment), time);
    };

    const tryCreateSimpleAutoClicker = () => tryCreateAutoClicker(1000)(10)(1);

    return {
      currency,
      addCurrency,
      resetGame,
      tryCreateSimpleAutoClicker
    };
  }
});
</script>

<style lang="scss" scoped>
.clicker-game {
  height: 100%;
  color: #fff;
}

.currency {
  margin: 0;
  font-size: 10rem;
}
</style>
