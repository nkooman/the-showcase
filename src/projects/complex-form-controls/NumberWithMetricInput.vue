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
  emits: ['update:state'],
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

      emit('update:state', state);
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
  margin: 0.5rem;
  padding: 7px;

  font-size: 14px;

  background: #bababa;
  border-radius: 5px;
}
</style>
