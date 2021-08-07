<template lang="pug">
.modern-ecommerce
  .above-fold
    img.background-image(src="./assets/woman-sitting.png" alt="Woman sitting")
    section
      Navigation
      Landing
  .below-fold
    DetailedContent(ctaButtonHref="#/modern-ecommerce" imagePosition="right")
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
      template(#image): img(src="@/projects/modern-ecommerce/assets/man-sitting.png" alt="")
    DetailedContent(ctaButtonHref="#/modern-ecommerce" imagePosition="left")
      template(#heading="{ highlightClass }")
        h2
          span(:class="highlightClass") Enhance
          =" "
          | Your Performance
      template(#body)
        p
          | Lopes Active Apparel’s ultra-lightweight, form fitting design allows you to not only look your best but perform at your best.
          | The lightweight design lets you move faster by reducing drag and the form fitting design ensures you have a full range of motion without sacrificing performance.
          | Whether it’s a jog on the beach or free climbing in the mountains, Lopes Active Apparel will have you looking your best and performing your best.
      template(#cta-button) Shop Now
      template(#image): img(src="@/projects/modern-ecommerce/assets/woman-stretching.png" alt="")
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
