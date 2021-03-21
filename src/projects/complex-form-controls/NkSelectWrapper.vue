<template lang="pug">
select(is="nk-select" data-label="Custom Select")
  option Custom Option 1
  option Custom Option 2
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NkSelectWrapper'
});
</script>

<style lang="scss">
.nk-select {
  position: relative;
}

.nk-select-label {
  padding-left: 10px;

  color: var(--caviar);
  font-weight: 400;

  font-size: 14px;
}

.nk-select-field {
  display: flex;
  flex-flow: row nowrap;
  align-content: center;
  justify-content: space-between;
  height: 5rem;
  margin: 0.5rem;
  margin-bottom: 0;
  padding: 7px;

  color: var(--caviar);

  background: var(--ice-cube);
  border: solid 2px var(--reflection);
  border-radius: 5px;

  &:active {
    border: solid 2px var(--caviar);
  }
}

.nk-select-field-value {
  padding: 7px;

  color: var(--caviar);
  font-size: 18px;
  line-height: 1;

  background: transparent;
}

.nk-select-dropdown {
  display: grid;

  font-size: 24px;
  place-content: center center;

  user-select: none;
}

.nk-select-options {
  position: absolute;

  width: calc(100% - 1rem);
  margin-left: 0.5rem;

  border: solid 2px var(--reflection);
  border-radius: 5px;
}

.nk-select-option {
  width: 100%;

  padding: 7px 14px;

  font-size: 14px;

  background: var(--ice-cube);

  user-select: none;

  &:hover,
  &.hover {
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
