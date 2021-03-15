<template lang="pug">
.select(ref="selectRef")
  span.label(@click="open") {{ label }}
  .select-value(@click="open")
    input.filter-input(v-model="filterInput" v-if="isOpen" ref="filterInputRef" @keyup.esc="close")
    span.placeholder(v-if="!hasSelected && !isOpen") {{ placeholder }}
    span.selected-value(v-if="hasSelected && !isOpen") {{ selected?.label }}
  .select-options(v-show="show")
    .select-option(
      v-for="option in filteredOptions"
      @click="selectAndClose(option)"
      :key="`${option.label}_${Math.random()}`")
      span {{ option.label }}
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, PropType, ref, watch } from 'vue';
import { useOnOutsidePress } from 'vue-composable';

export type Option = Object & {
  label: string;
  value: string;
};

export default defineComponent({
  name: 'Select',
  emits: ['update:value'],
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
      default: 'Select an option...'
    }
  },
  setup(props, { emit }) {
    const selectRef = ref<HTMLDivElement>();
    const filterInputRef = ref<HTMLInputElement>();
    const show = ref(false);

    // Display
    const isOpen = computed(() => show.value);

    const open = () => {
      show.value = true;
      nextTick(() => filterInputRef.value?.focus());
    };

    const close = () => {
      nextTick(() => filterInputRef.value?.blur());
      show.value = false;
    };

    useOnOutsidePress(selectRef, close);

    // Filtering
    const filterInput = ref('');
    const optionIncludesValue = (option: Option) =>
      option.label.includes(filterInput.value) || option.value.includes(filterInput.value);
    const filteredOptions = computed(() => props.options.filter(optionIncludesValue));

    // Selection
    const selected = ref<Option>();
    const hasSelected = computed(() => selected.value !== null);
    const selectAndClose = (option: Option) => {
      selected.value = option;
      close();
    };

    watch(selected, () => emit('update:value', selected.value));

    return {
      selectRef,
      filterInputRef,
      show,
      open,
      selectAndClose,
      selected,
      hasSelected,
      isOpen,
      filterInput,
      filteredOptions
    };
  }
});
</script>

<style lang="scss" scoped>
.select-value {
  margin: 0.5rem;
  padding: 7px;

  font-size: 14px;

  background: #bababa;
  border-radius: 5px;
}

.label {
  margin-left: 0.5rem;

  font-size: 14px;
}

.filter-input,
.placeholder,
.selected-value {
  height: 28px;
  padding: 7px;

  color: #444;

  background: transparent;
  border: none;
}

.select-options {
  margin: 0.5rem;

  font-size: 14px;
}

.select-option {
  width: 100%;
  padding: 7px 14px;

  background: #bababa;

  &:hover {
    filter: brightness(0.9);
  }

  &:first-child {
    border-radius: 5px 5px 0 0;
  }

  &:last-child {
    border-radius: 0 0 5px 5px;
  }
}
</style>
