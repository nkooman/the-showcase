<template lang="pug">
.number-with-metric-input
  input.number-input(v-model="number" type="number")
  select.metric-input(v-model="metric")
    option(v-for="item in metricList" :key="`${item}_${Math.random()}`") {{ item }}
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watchEffect } from 'vue';

export default defineComponent({
  name: 'NumberWithMetricInput',
  emits: ['state:update'],
  props: {
    metricList: {
      type: Array as PropType<Array<string>>,
      required: true
    }
  },
  setup(_, { emit }) {
    const number = ref(0);
    const metric = ref('');

    watchEffect(() => {
      const state = {
        value: number,
        metric
      };

      emit('state:update', state);
    });

    return {
      number,
      metric
    };
  }
});
</script>

<style lang="scss" scoped>
.number-with-metric-input {
  background: #bababa;
  padding: 7px;
  margin: 0.5rem;
  font-size: 14px;
  border-radius: 5px;
}
</style>
