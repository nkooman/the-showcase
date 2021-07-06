<template lang="pug">
.landing
  .tagline
    h1
      span.highlight Look
      =" "
      | Different.
      br
      span.highlight Feel
      =" "
      | Different.
  .cta-section
    h2
      | Sale Up to
      br
      span.highlight 50%
      =" "
      | Off
    CtaButton(href="#/modern-ecommerce" type="secondary") Shop Now
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CtaButton from './CtaButton.vue';

export default defineComponent({
  name: 'Landing',
  components: {
    CtaButton
  }
});
</script>

<style lang="scss" scoped>
.landing {
  display: grid;
  grid: auto-flow / 1fr 1fr;
  justify-items: center;
  width: 100%;
  height: 100%;
}

h1,
h2 {
  font-weight: 400;

  white-space: nowrap;
}

h1 {
  font-size: clamp(4.8rem, 5vw, 9.6rem);
}

h2 {
  font-size: clamp(4.8rem, 5vw, 6.4rem);
}

.highlight {
  color: var(--primary);
}

.tagline,
.cta-section {
  width: min-content;
}

.cta-section {
  margin-top: 20rem;
  margin-left: 15rem;
}
</style>
