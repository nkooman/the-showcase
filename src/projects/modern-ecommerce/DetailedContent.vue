<template lang="pug">
.detailed-content
  .wrapper(:style="flexDirection")
    .text
      .heading: slot(name="heading" highlightClass="highlight")
      .body: slot(name="body")
      .button: CtaButton(:href="ctaButtonHref" type="primary"): slot(name="cta-button")
    .image: slot(name="image")
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import CtaButton from './CtaButton.vue';

export default defineComponent({
  name: 'DetailedContent',
  components: {
    CtaButton
  },
  props: {
    imagePosition: {
      type: String as PropType<'left' | 'right'>,
      required: true
    },
    ctaButtonHref: {
      type: String,
      required: true
    }
  },
  setup({ imagePosition }) {
    const flexDirection = computed(() => ({ '--flex-direction': imagePosition === 'left' ? 'row-reverse' : 'row' }));

    return {
      flexDirection
    };
  }
});
</script>

<style lang="scss" scoped>
.detailed-content {
  padding-block: 10rem;
}

.wrapper {
  --flex-direction: row;

  display: flex;
  flex-direction: var(--flex-direction);
  gap: 5rem;
  justify-content: space-between;

  background-color: rgba(255, 255, 255, 0.05);
  padding-block: 6rem;
  padding-inline-start: 10rem;
}

.heading ::v-deep(*) {
  color: #fff;
  font-weight: 400;
  font-size: 6.4rem;
}

::v-deep(.highlight) {
  color: var(--secondary);
}

.body {
  color: #fff;
  font-size: 2.4rem;
}

.button {
  width: fit-content;
}

.image {
  height: 100%;

  filter: grayscale(1);

  ::v-deep(img) {
    object-fit: cover;
    object-position: center;
  }
}
</style>
