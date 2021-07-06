<template lang="pug">
.detailed-content
  .wrapper
    .text
      .heading: slot(name="heading" highlightClass="highlight")
      .body: slot(name="body")
      CtaButton(:href="ctaButtonHref" type="primary"): slot(name="cta-button")
    .image: slot(name="image")
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
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
  }
});
</script>

<style lang="scss" scoped>
.detailed-content {
  padding: 10rem 0;
}

.wrapper {
  display: grid;
  grid: auto-flow / 3fr 2fr;

  background-color: #fff2;
}

.text {
  margin-left: 5rem;
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
</style>
