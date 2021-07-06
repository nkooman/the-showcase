<template lang="pug">
.modern-ecommerce
  .above-fold
    img.background-image(src="./assets/woman-sitting.png" alt="Woman sitting")
    section
      Navigation
      Landing
  .below-fold
    DetailedContent(ctaButtonHref="#/modern-ecommerce")
      template(#heading="{ highlightClass }")
        h2
          | Let Your
          br
          | Skin
          =" "
          span(:class="highlightClass") Breathe
      template(#body)
        p
          | Whether you are at the gym working out or shooting hoops on the court with your friends, Lopes Active Apparel will keep you cool, dry, and comfortable.
          | Using top of the line ultra-lightweight, sweat-wicking fabric and breathable mesh, Lopes Active Apparel keeps you focused on pushing yourself to new limits.
          | Lopes Active Apparel provides the most breathable clothing allowing your skin to breath without sacrificing comfortability or looks.
      template(#cta-button) Shop Now
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navigation from './Navigation.vue';
import Landing from './Landing.vue';
import DetailedContent from './DetailedContent.vue';

export default defineComponent({
  name: 'ModernEcommerce',
  components: {
    Navigation,
    Landing,
    DetailedContent
  }
});
</script>

<style lang="scss">
.modern-ecommerce {
  --primary: #522298;
  --secondary: #f9e534;

  *::selection {
    color: #fff;

    background: var(--primary);
  }
}
</style>

<style lang="scss" scoped>
@include google-font('Yeseva One', 400);
@include google-font('Montserrat', 400);

.modern-ecommerce {
  font-family: 'Yeseva One', serif;

  background: #000;

  & ::v-deep(p) {
    max-width: clamp(45ch, 50%, 75ch);

    font-family: 'Montserrat', sans-serif;
    line-height: 1.5;
  }
}

.above-fold {
  position: relative;

  min-height: 100vh;
}

.background-image {
  position: absolute;
  z-index: 0;

  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;

  filter: grayscale(1);
}

section {
  position: relative;
}
</style>
