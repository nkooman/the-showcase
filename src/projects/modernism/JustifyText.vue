<template lang="pug">
span.justify-text
  span(v-for="character in characters") {{ character }}
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'JustifyText',
  props: {
    word: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const characters = computed(() => [...props.word]);

    return {
      characters
    };
  }
});
</script>

<style lang="scss" scoped>
.justify-text {
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
}
</style>
