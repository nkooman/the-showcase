<template lang="pug">
nav.app-navigation(v-body-scroll-lock="isOpen" :class="{ active: isOpen }")
  AppNavigationSidebar(:isOpen="isOpen" @toggle-navigation="toggleNavigation")
  .project-container
    ul.project-list(v-if="isOpen")
      AppNavigationRouterLink(
        v-if="landingRoute"
        :path="landingRoute.path"
        :routeName="landingRoute.name?.toString() ?? ''"
        @close-navigation="closeNavigation")
      li.nested-list
        ul.year-category(v-for="[year, routes] in aggregatedProjectRoutesByCreatedOn")
          li.section-label {{ year }}
          AppNavigationRouterLink(
            v-for="{ path, name, meta } in routes"
            :desktopOnly="meta?.desktopOnly"
            :path="path"
            :routeName="name?.toString() ?? ''"
            :key="`${year} ${name?.toString() ?? ''}`"
            @close-navigation="closeNavigation")
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter, RouteRecordRaw } from 'vue-router';
import MaterialIcon from '@/components/MaterialIcon.vue';
import AppNavigationSidebar from '@/components/AppNavigationSidebar.vue';
import AppNavigationRouterLink from '@/components/AppNavigationRouterLink.vue';

export default defineComponent({
  name: 'AppNavigation',

  components: {
    MaterialIcon,
    AppNavigationSidebar,
    AppNavigationRouterLink
  },

  setup() {
    const isOpen = ref(false);

    const closeNavigation = () => {
      isOpen.value = false;
    };

    const toggleNavigation = () => {
      isOpen.value = !isOpen.value;
    };

    const router = useRouter();
    const routes = computed(() => router.options.routes as RouteRecordRaw[]);
    const allProjectRoutes = computed(() => routes.value.filter(route => route?.meta?.isProject));
    const landingRoute = computed(() => routes.value.find(route => route?.meta?.isLanding));

    const sortRouteRecordsByCreatedOn = (records: RouteRecordRaw[]) => {
      if (!records.length) return records;

      return records.slice().sort((a, b) => {
        if (!b.meta || !a.meta) return 0;

        return b.meta.createdOn.getTime() - a.meta.createdOn.getTime();
      });
    };

    type AggregatedProjectRoutes = {
      [key: number]: RouteRecordRaw[];
    };

    const aggregatedProjectRoutes = allProjectRoutes.value.reduce(
      (accumulator: AggregatedProjectRoutes, route: RouteRecordRaw) => {
        if (!route.meta) return accumulator;
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
        .map(([key, value]) => [key, sortRouteRecordsByCreatedOn(value)] as [string, RouteRecordRaw[]])
        .reverse();
    });

    return {
      isOpen,
      allProjectRoutes,
      landingRoute,
      aggregatedProjectRoutesByCreatedOn,
      closeNavigation,
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
  z-index: 100000; // Make sure the app navigation is above any content.

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

  transition: all 0.25s map-deep-get($easing, ('standard', 'expressive'));

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

  transition: opacity 0.2s map-deep-get($easing, ('standard', 'productive')) 0.2s;

  .active & {
    opacity: 1;
  }
}

.nested-list {
  padding: 0 2rem;
}

.year-category {
  display: grid;
  grid-template-columns: [label] clamp(5rem, 15vw, 10rem) [content] 1fr;
  align-items: center;
  margin: 0;
  padding: 1rem 0;

  list-style-type: none;

  ::v-deep(.item) {
    grid-column: content;
  }
}

.section-label {
  position: sticky;
  top: 2rem;

  grid-column: label;

  color: #ff8c7d;
  font-size: clamp(2.5rem, 3vw, 4rem);
  text-decoration: none;
}
</style>
