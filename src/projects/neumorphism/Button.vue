<template lang="pug">
button.button(:style="activeColor")
  MaterialIcon
    slot
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { isHexCode } from '@/utils/validators';
import MaterialIcon from '@/components/MaterialIcon.vue';

export default defineComponent({
  name: 'Button',
  components: {
    MaterialIcon
  },
  props: {
    iconActiveColor: {
      type: String,
      required: false,
      default: '#a7a7a7',
      validator: (value: string) => isHexCode(value)
    }
  },
  setup({ iconActiveColor }) {
    const activeColor = computed(() => [iconActiveColor && '--active-color']);

    return {
      activeColor
    };
  }
});
</script>

<style lang="scss" scoped>
$dark: #141414;
$light: #282828;
$color: #a7a7a7;

.button {
  all: unset;

  display: grid;
  width: 5rem;
  height: 5rem;
  margin: 1rem;

  color: $color;
  font-size: 2rem;

  border-radius: 50%;
  box-shadow: -5px -5px 20px 0 $light, 10px 10px 20px 5px $dark, inset 0 0 0 0 $light, inset 0 0 0 0 $dark;
  cursor: pointer;

  transition: box-shadow 0.1s ease;
  place-items: center;

  &:active {
    box-shadow: 0 0 0 0 $dark, 0 0 0 0 $light, inset -5px -5px 20px -10px $light, inset 5px 5px 20px -10px $dark;

    i {
      color: var(--active-color);

      transform: perspective(10px) translateZ(-1px);
    }
  }
}
</style>
