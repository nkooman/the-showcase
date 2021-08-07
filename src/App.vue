<template lang="pug">
AppNavgiation
.content-wrapper
  router-view(v-slot="{ Component }")
    transition(name="slide" mode="out-in")
      component(:is="Component")
  AppFooter
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AppNavgiation from '@/components/AppNavigation.vue';
import AppFooter from '@/components/AppFooter.vue';

export default defineComponent({
  name: 'App',

  components: {
    AppNavgiation,
    AppFooter
  }
});
</script>

<style lang="scss">
@import '~@/styles/globals';
</style>

<style lang="scss" scoped>
$app-navigation-width: 7.5rem;

.content-wrapper {
  position: relative;

  width: 100%;
  height: 100%;

  background: #1a1e22;

  // Add padding to account for AppNavigation
  @media (map-get($viewport, 'min-width-7')) {
    padding-left: $app-navigation-width;
  }

  @media (map-get($viewport, 'max-width-7')) {
    padding-top: $app-navigation-width;
  }
}

.slide-enter-active {
  transition: all 0.25s map-deep-get($easing, ('entrance', 'expressive'));
}

.slide-leave-active {
  transition: all 0.25s map-deep-get($easing, ('exit', 'expressive'));
}

.slide-enter,
.slide-leave-to {
  @media (map-get($viewport, 'min-width-7')) {
    transform: translateX(-100%);
  }

  @media (map-get($viewport, 'max-width-7')) {
    transform: translateY(-100%);
  }
}
</style>
