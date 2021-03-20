<template lang="pug">
.select(ref="selectRef")
  span.label(id="select-label" @click="open") {{ label }}
  .select-value(role="button" aria-labelledby="select-label" @click="open" :class="{ active: isOpen }")
    input.filter-input(v-model="filterInput" v-if="isOpen" ref="filterInputRef" :tabindex="0" @keyup.esc="close")
    span.placeholder(v-if="!hasSelected && !isOpen") {{ placeholder }}
    span.selected-value(v-if="hasSelected && !isOpen") {{ selected?.label }}
    .expand(@click.stop="toggle" title="Open dropdown")
      MaterialIcon expand_more
  .select-options(v-show="show")
    .select-option(
      v-for="option in filteredOptions"
      @click="selectAndClose(option)"
      :key="`${option.label}_${Math.random()}`")
      span {{ option.label }}
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, PropType, ref, watch } from 'vue';
import MaterialIcon from '@/components/MaterialIcon.vue';
import { useOnOutsidePress } from 'vue-composable';

export type Option = Object & {
  label: string;
  value: string;
};

export default defineComponent({
  name: 'FilterableSelect',
  emits: ['update:value'],
  components: {
    MaterialIcon
  },
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

    // Filtering
    const filterInput = ref('');
    const toLowercaseAndRemoveWhitespace = (value: string) => value.toLowerCase().replace(/\s/g, '');
    const optionIncludesValue = (option: Option, include: string) =>
      toLowercaseAndRemoveWhitespace(option.value).includes(toLowercaseAndRemoveWhitespace(include)) ||
      toLowercaseAndRemoveWhitespace(option.label).includes(toLowercaseAndRemoveWhitespace(include));
    const filteredOptions = computed(() => props.options.filter(option => optionIncludesValue(option, filterInput.value)));

    // Display
    const isOpen = computed(() => show.value);

    const open = () => {
      show.value = true;
      nextTick(() => filterInputRef.value?.focus());
    };

    const close = () => {
      nextTick(() => filterInputRef.value?.blur());
      filterInput.value = '';
      show.value = false;
    };

    const toggle = () => {
      isOpen.value ? close() : open();
    };

    useOnOutsidePress(selectRef, close);

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
      toggle,
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
.select {
  position: relative;
}

.select-value {
  display: flex;
  flex-flow: row nowrap;
  align-content: center;
  justify-content: space-between;
  height: 5rem;
  margin: 0.5rem;
  margin-bottom: 0;
  padding: 7px;

  background: var(--ice-cube);
  border: solid 2px var(--reflection);
  border-radius: 5px;
}

.active {
  border: solid 2px var(--caviar);
}

.expand {
  display: grid;

  font-size: 24px;
  place-content: center center;

  user-select: none;

  &:hover {
    cursor: pointer;
  }
}

.label {
  padding-left: 10px;

  color: var(--caviar);
  font-weight: 400;

  font-size: 14px;
}

.filter-input {
  width: 100%;

  color: var(--caviar);

  border: none;
  outline: none;

  appearance: none;
}

.filter-input,
.placeholder,
.selected-value {
  padding: 7px;

  color: var(--caviar);
  font-size: 18px;
  line-height: 1;

  background: transparent;
}

.select-options {
  position: absolute;

  width: calc(100% - 1rem);

  margin-left: 0.5rem;

  border: solid 2px var(--reflection);

  border-radius: 5px;
}

.select-option {
  width: 100%;

  padding: 7px 14px;

  font-size: 14px;

  background: var(--ice-cube);

  user-select: none;

  &:hover,
  &:focus {
    filter: brightness(0.9);
  }

  &:first-child {
    border-radius: 3px 3px 0 0;
  }

  &:last-child {
    border-radius: 0 0 3px 3px;
  }
}
</style>
