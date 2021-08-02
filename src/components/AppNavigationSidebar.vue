<template lang="pug">
.sidebar
  a.menu-toggle(role="button" @click="toggleNavigation" aria-label="Toggle menu")
    MaterialIcon.menu-icon {{ menuIcon }}
  .project-title(:title="currentRouteName") {{ currentRouteName }}
  .project-selector
    a.backward(role="button" title="Navigate backward" aria-label="Navigate backward" @click="navigateBackward")
      MaterialIcon.menu-icon chevron_left
    a.forward(role="button" title="Navigate forward" aria-label="Navigate forward" @click="navigateForward")
      MaterialIcon.menu-icon chevron_right
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';

import MaterialIcon from '@/components/MaterialIcon.vue';

export default defineComponent({
  name: 'AppNavigationSidebar',

  emits: ['toggleNavigation'],

  components: {
    MaterialIcon
  },

  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },

  setup(props, context) {
    const router = useRouter();
    const currentRouteName = computed(() => router.currentRoute.value.name?.toString());

    const allProjectRoutes = computed(() => router.options.routes.filter(route => route?.meta?.isProject));

    const currentRouteIndex = computed(() =>
      allProjectRoutes.value.findIndex(route => route.name === router.currentRoute.value.name)
    );

    const isStartOfRoutes = computed(() => currentRouteIndex.value <= 0);
    const isEndOfRoutes = computed(() => currentRouteIndex.value >= allProjectRoutes.value.length - 1);
    const getPathByIndex = (index: number) => allProjectRoutes.value[index].path;

    const navigateBackward = () => {
      if (isStartOfRoutes.value) return;

      const path = getPathByIndex(currentRouteIndex.value - 1);

      router.push({ path });
    };

    const navigateForward = () => {
      if (isEndOfRoutes.value) return;

      const path = getPathByIndex(currentRouteIndex.value + 1);

      router.push({ path });
    };

    enum MenuIcons {
      Close = 'close',
      Menu = 'menu'
    }

    const menuIcon = computed((): MenuIcons => (props.isOpen ? MenuIcons.Close : MenuIcons.Menu));

    const toggleNavigation = () => context.emit('toggleNavigation');

    return {
      currentRouteName,
      navigateBackward,
      navigateForward,
      menuIcon,
      toggleNavigation
    };
  }
});
</script>

<style lang="scss" scoped>
$app-navigation-width: 7.5rem;

.sidebar {
  display: inline-grid;
  grid: 1fr / [menu] 2fr [title] 5fr [selector] 2fr;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: $app-navigation-width;

  background: #1b2127;

  @media (map-get($viewport, 'min-width-7')) {
    grid: [menu] 2fr [title] 5fr [selector] 2fr / 1fr;
    width: $app-navigation-width;
    height: 100vh;
  }
}

.menu-toggle {
  display: block;
  grid-area: menu;
  padding-left: 1.5rem;

  text-align: center;

  cursor: pointer;

  user-select: none;

  @media (map-get($viewport, 'min-width-7')) {
    padding-top: 1.5rem;
    padding-left: 0;
  }
}

.project-title {
  grid-area: title;
  width: $app-navigation-width;
  overflow: hidden;

  color: #fff;
  font-size: clamp(1.5rem, 3vw, 3rem);
  font-family: 'Archivo Black', sans-serif;
  line-height: $app-navigation-width;
  letter-spacing: 2px;
  white-space: nowrap;
  text-align: center;
  text-transform: uppercase;
  text-overflow: ellipsis;

  transform: rotate(180deg);
  writing-mode: vertical-rl;

  @media (map-get($viewport, 'max-width-7')) {
    width: 100%;

    transform: none;

    writing-mode: horizontal-tb;
  }
}

.project-selector {
  display: flex;
  flex-flow: row nowrap;
  grid-area: selector;
  padding-right: 1.5rem;

  text-align: center;

  user-select: none;

  @media (map-get($viewport, 'min-width-7')) {
    flex-flow: column nowrap;
    padding-right: 0;
    padding-bottom: 1.5rem;
  }
}

.menu-icon {
  color: #fff;
  font-size: clamp(3rem, 3vw, 4rem);

  &:active {
    filter: brightness(0.5);
  }

  &.disabled {
    cursor: none;
    filter: brightness(0.5);

    pointer-events: none;
  }
}

.backward,
.forward {
  margin: 0.25rem;

  cursor: pointer;

  &:active {
    filter: brightness(0.5);
  }
}
</style>
