<template lang="pug">
i.material-icons
  slot
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MaterialIcon'
});
</script>

<style lang="scss" scoped>
@include google-font('Material Icons');

.material-icons {
  font-size: inherit;
}
</style>
