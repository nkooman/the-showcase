<template lang="pug">
nav.app-navigation(:class="{ active: isOpen }")
  AppNavigationSidebar(:isOpen="isOpen" @toggle-navigation="toggleNavigation")
  .project-container
    ul.project-list(v-if="isOpen")
      AppNavigationRouterLink(
        :path="landingRoute.path"
        :routeName="landingRoute.name"
        @close-navigation="closeNavigation")
      li.nested-list
        ul.year-category(v-for="[year, routes] in aggregatedProjectRoutesByCreatedOn")
          li.section-label {{ year }}
          AppNavigationRouterLink(
            v-for="{ path, name } in routes"
            :path="path"
            :routeName="name"
            :key="`${year} ${name}`"
            @close-navigation="closeNavigation")
</template>

<script lang="ts">
import { defineComponent, ref, computed, watchEffect } from 'vue';

import { router, ProjectRoute } from '@/router';
import MaterialIcon from '@/components/MaterialIcon.vue';
import AppNavigationSidebar from '@/components/app-navigation/AppNavigationSidebar.vue';
import AppNavigationRouterLink from '@/components/app-navigation/AppNavigationRouterLink.vue';

export default defineComponent({
  name: 'AppNavigation',

  components: {
    MaterialIcon,
    AppNavigationSidebar,
    AppNavigationRouterLink
  },

  setup(_, context) {
    const isOpen = ref(false);

    watchEffect(() => context.emit('state-change', isOpen.value));

    const routes = computed(() => router.options.routes as ProjectRoute[]);

    const allProjectRoutes = computed(() => routes.value.filter(route => route?.meta?.isProject));

    const landingRoute = computed(() => routes.value.find(route => route?.meta?.isLanding));

    const sortRouteRecordsByCreatedOn = (records: ProjectRoute[]) => {
      if (!records.length) return records;

      return records.slice().sort((a, b) => b.meta.createdOn.getTime() - a.meta.createdOn.getTime());
    };

    type AggregatedProjectRoutes = {
      [key: number]: ProjectRoute[];
    };

    const aggregatedProjectRoutes = allProjectRoutes.value.reduce(
      (accumulator: AggregatedProjectRoutes, route: ProjectRoute) => {
        const year: number = route.meta.createdOn.getFullYear();

        return {
          ...accumulator,
          // Spreads already aggregated routes from a given year into an array,
          // then adds the current route to the same array.
          [year]: [...(accumulator?.[year]?.length ? accumulator[year] : []), route]
        } as AggregatedProjectRoutes;
      },
      {}
    );

    const aggregatedProjectRoutesByCreatedOn = computed(() => {
      return Object.entries(aggregatedProjectRoutes)
        .map(([key, value]) => [key, sortRouteRecordsByCreatedOn(value)])
        .reverse();
    });

    const closeNavigation = () => {
      isOpen.value = false;
    };

    const openNavigation = () => {
      isOpen.value = true;
    };

    const toggleNavigation = () => {
      isOpen.value = !isOpen.value;
    };

    return {
      isOpen,
      allProjectRoutes,
      landingRoute,
      aggregatedProjectRoutesByCreatedOn,
      closeNavigation,
      openNavigation,
      toggleNavigation
    };
  }
});
</script>

<style lang="scss" scoped>
@include google-font('Archivo Black');
@include google-font('Lora');

$app-navigation-width: 7.5rem;

.app-navigation {
  position: fixed;
  z-index: 100; // Make sure the app navigation is above any content.

  font-family: 'Lora', serif;

  @media (map-get($viewport, 'min-width-7')) {
    top: 0;
  }

  @media (map-get($viewport, 'max-width-7')) {
    left: 0;
  }
}

.project-container {
  position: absolute;
  top: 0;

  overflow-x: hidden;
  overflow-y: auto;

  white-space: nowrap;

  background: #20272e;

  transition: all 0.25s ease;

  @media (map-get($viewport, 'min-width-7')) {
    width: 0;
    height: 100%;
    margin-left: $app-navigation-width;
  }

  @media (map-get($viewport, 'max-width-7')) {
    width: 100%;
    height: 0;
    margin-top: $app-navigation-width;
  }

  .active & {
    @media (map-get($viewport, 'min-width-7')) {
      width: calc(100vw - #{$app-navigation-width});
    }

    @media (map-get($viewport, 'max-width-7')) {
      height: calc(100vh - #{$app-navigation-width});
    }
  }
}

.project-list {
  margin: 0;
  padding: 2rem 0;

  list-style-type: none;
  opacity: 0;

  transition: opacity 0.2s ease 0.2s;

  .active & {
    opacity: 1;
  }
}

.nested-list {
  padding: 0 2rem;
}

.year-category {
  display: grid;
  grid-template-columns: [label] min-content [content] 1fr;
  align-items: center;
  margin: 0;
  padding: 1rem 0;

  list-style-type: none;

  .item {
    grid-column: content;
  }
}

.section-label {
  position: sticky;
  top: 2rem;

  grid-column: label;
  min-width: 10rem;

  color: #ff8c7d;
  font-size: clamp(2.5rem, 3vw, 4rem);
  text-decoration: none;
}
</style>
