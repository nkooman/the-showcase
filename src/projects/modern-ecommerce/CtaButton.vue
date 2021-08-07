<template lang="pug">
a(:href="href").cta-button(ref="ctaButtonRef"): slot
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref, watch } from 'vue';

export default defineComponent({
  name: 'CtaButton',
  props: {
    type: {
      type: String as PropType<'primary' | 'secondary'>,
      default: 'primary'
    },
    href: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const ctaButtonRef = ref<HTMLAnchorElement>();
    const colors = {
      primary: {
        color: '#fff',
        backgroundColor: '#522298'
      },
      secondary: {
        color: '#000',
        backgroundColor: '#f9e534'
      }
    };

    const buttonColors = computed(() => colors[props.type]);

    const setButtonStyles = () => {
      ctaButtonRef.value?.style.setProperty('--button-color', buttonColors.value.color);
      ctaButtonRef.value?.style.setProperty('--button-background-color', buttonColors.value.backgroundColor);
    };

    watch(buttonColors, setButtonStyles);
    onMounted(setButtonStyles);

    return {
      ctaButtonRef
    };
  }
});
</script>

<style lang="scss" scoped>
.cta-button {
  --button-color: #fff;
  --button-background-color: var(--primary);

  display: block;
  width: 100%;
  padding: 2rem 7rem;

  color: var(--button-color);

  font-size: 2.4rem;
  text-align: center;
  text-decoration: none;

  background: var(--button-background-color);

  &:hover {
    filter: brightness(0.9);
  }
}
</style>
