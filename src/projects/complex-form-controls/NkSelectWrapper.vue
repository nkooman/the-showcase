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
.nk-select-option.hover,
.nk-select-option:hover {
  background: red;
}
</style>
