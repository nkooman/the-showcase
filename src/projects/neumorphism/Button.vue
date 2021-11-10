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
    const activeColor = computed(() => ({ '--active-color': iconActiveColor }));

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
  cursor: pointer;
  font-size: 2rem;
  height: 5rem;
  width: 5rem;
  margin: 1rem;
  border-radius: 50%;
  box-shadow: -5px -5px 20px 0px $light, 10px 10px 20px 5px $dark, inset 0 0 0 0 $light,
    inset 0 0 0 0 $dark;
  display: grid;
  place-items: center;
  color: $color;
  transition: box-shadow 0.1s ease;

  &:active {
    box-shadow: 0 0 0 0 $dark, 0 0 0 0 $light, inset -5px -5px 20px -10px $light,
      inset 5px 5px 20px -10px $dark;
    i {
      transform: perspective(10px) translateZ(-1px);
      color: var(--active-color);
    }
  }
}
</style>
