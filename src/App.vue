<template lang="pug">
#app
  AppNavgiation(@state-change="navigationStateChange")
  .content-wrapper(:class="{ 'navigation-open': navigationState }")
    router-view(v-slot="{ Component }")
      transition(name="slide" mode="out-in")
        component(:is="Component")
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import AppNavgiation from '@/components/AppNavigation.vue';

export default defineComponent({
  name: 'App',

  components: {
    AppNavgiation
  },

  setup() {
    const navigationState = ref(false);

    const navigationStateChange = (value: boolean) => {
      navigationState.value = value;
    };

    return { navigationState, navigationStateChange };
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

.navigation-open {
  overflow: hidden;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s;
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
