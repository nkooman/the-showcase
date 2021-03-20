<template lang="pug">
ColorProvider(:colors="colors")
  .complex-form-controls
    .wrapper
      div
        Select(v-model:value="selectedOption" placeholder="Select something..." label="Select Form Field" :options="options")
      div
        NumberWithMetricInput(v-model="numberWithMetricInputValue" :metricList="['mi', 'km']")
      NkSelectWrapper
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ColorProvider from '@/components/ColorProvider.vue';
import Select, { Option } from './FilterableSelect.vue';
import NumberWithMetricInput from './NumberWithMetricInput.vue';
import NkSelectWrapper from './NkSelectWrapper.vue';

export default defineComponent({
  name: 'ComplexFormControls',
  components: {
    ColorProvider,
    NumberWithMetricInput,
    Select,
    NkSelectWrapper
  },
  setup() {
    type NumberWithMetricInputValue = {
      value: number;
      metric: string;
    };

    const numberWithMetricInputValue = ref<NumberWithMetricInputValue>();

    const selectedOption = ref<Option>();
    const options: Array<Option> = [
      {
        label: 'Value 1',
        value: 'value1'
      },
      {
        label: 'Value 2',
        value: 'value2'
      },
      {
        label: 'Value 3',
        value: 'value3'
      }
    ];

    const colors = {
      '--caviar': '#302e2f',
      '--roycroft-copper-red': '#7b311e',
      '--indigo-batik': '#4d5c6d',
      '--reflection': '#d2d6d3',
      '--ice-cube': '#e3e4e2',
      '--extra-white': '#eff0ec'
    };

    return {
      colors,
      numberWithMetricInputValue,
      options,
      selectedOption
    };
  }
});
</script>

<style lang="scss" scoped>
@include google-font('IBM Plex Sans', (400, 500, 600, 700));

.complex-form-controls {
  height: 100%;
  padding: 1rem;

  font-family: 'IBM Plex Sans', sans-serif;

  background: var(--extra-white);
}

.wrapper {
  display: grid;
  grid: auto-fill / 1fr;
  gap: 5rem;
  max-width: 400px;
  margin: 0 auto;
  padding: 5rem 0;
}
</style>
