<template lang="pug">
.complex-form-controls
  div
    Select(v-model:value="selectedOption" placeholder="Select something..." label="Select Form Field" :options="options")
    span Selected Option: {{ selectedOption }}
  div
    NumberWithMetricInput(v-model="numberWithMetricInputValue" :metricList="['mi', 'km']")
    span {{ numberWithMetricInputValue?.metric }}
    span {{ numberWithMetricInputValue?.value }}
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Select, { Option } from './Select.vue';
import NumberWithMetricInput from './NumberWithMetricInput.vue';

export default defineComponent({
  name: 'ComplexFormControls',
  components: {
    NumberWithMetricInput,
    Select
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

    return {
      numberWithMetricInputValue,
      options,
      selectedOption
    };
  }
});
</script>

<style lang="scss" scoped>
@include google-font('IBM Plex Sans');

.complex-form-controls {
  width: 100%;
  height: 100%;
  padding: 1rem;

  font-family: 'IBM Plex Sans';

  background: #dedede;
}
</style>
