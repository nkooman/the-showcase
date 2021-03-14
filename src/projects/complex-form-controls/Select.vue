<template lang="pug">
.select(ref="selectRef" @click="show = true")
  span.select-label {{ label }}
  .select-value
    input()
    span {{ placeholder }}
    span {{ }}
  .select-options(v-show="show")
    .select-option(
      v-for="option in options"
      @click="selectAndClose(option)"
      :key="`${option.label}_${Math.random()}`")
      span {{ option.label }}

</template>

<script lang="ts">
import { defineComponent, PropType, ref, watchEffect } from 'vue';
import { useOnOutsidePress } from 'vue-composable';

export type Option = Object & {
  label: string;
  value: string;
};

export default defineComponent({
  name: 'Select',
  emits: ['value:update'],
  props: {
    label: {
      type: String,
      required: false,
      default: ''
    },
    options: {
      type: Array as PropType<Array<Option>>,
      required: true
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    }
  },
  setup(_, { emit }) {
    const selectRef = ref<Element>();
    const show = ref(false);
    const value = ref<Option>();

    useOnOutsidePress(selectRef, () => {
      show.value = false;
    });

    const selectAndClose = (option: Option) => {
      value.value = option;
      show.value = false;
    };

    watchEffect(() => {
      emit('value:update', value);
    });

    return {
      selectRef,
      show,
      selectAndClose
    };
  }
});
</script>

<style lang="scss" scoped></style>
