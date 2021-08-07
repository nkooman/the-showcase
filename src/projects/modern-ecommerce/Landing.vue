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
  font-size: clamp(4.8rem, 3vw, 6.4rem);
}

.highlight {
  color: var(--primary);
}

.tagline,
.cta-section {
  width: min-content;
}

.cta-section {
  margin-top: clamp(10rem, 10vw, 20rem);
  margin-left: 15rem;
}

@media (map-get($viewport, 'max-width-7')) {
  .landing {
    grid: 1fr 1fr / auto-flow;
    align-content: center;
    align-items: center;
    justify-items: flex-start;
    height: auto;
    padding: 1rem;

    background: hsla(0, 0%, 100%, 0.5);
    margin-inline: 3rem;
    margin-block-start: 15rem;
  }

  h1,
  h2 {
    margin-block: 1rem;
  }

  .cta-section {
    margin-top: 0;
    margin-left: 0;
  }
}
</style>
