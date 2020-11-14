<template lang="pug">
nav.app-navigation(:class="{ active: isOpen }")
  .sidebar
    a.menu-toggle(role="button" @click="toggleNavigation" aria-label="Toggle menu")
      MaterialIcon.menu-icon {{ menuIcon }}
    .project-title(:title="currentRouteName") {{ currentRouteName }}
    .project-selector
      a.backward(role="button" aria-label="Navigate backward" @click="navigateBackward")
        MaterialIcon.menu-icon chevron_left
      a.forward(role="button" aria-label="Navigate forward" @click="navigateForward")
        MaterialIcon.menu-icon chevron_right
  .project-container
    ul.project-list(v-if="isOpen")
      router-link(
        exact
        custom
        v-slot="{ href, navigate, isActive, isExactActive }"
        :to="landingRoute.path")
        li.item.landing-link(:class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']")
          a.link(
            :href="href"
            @click="[navigate($event), closeNavigation()]")
            | {{ landingRoute.name }}
      li.nested-list
        ul.year-category(v-for="[year, routes] in aggregatedProjectRoutesByCreatedOn")
          li.section-label(:key="Math.random()") {{ year }}
          router-link(
            exact
            custom
            v-for="{ path, name } in routes"
            v-slot="{ href, navigate, isActive, isExactActive }"
            :to="path"
            :key="Math.random()")
            li.item(:class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']")
              a.link(
                :href="href"
                @click="[navigate($event), closeNavigation()]")
                | {{ name }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouteRecordRaw } from 'vue-router';

import MaterialIcon from '@/components/MaterialIcon.vue';

export default defineComponent({
  name: 'AppNavigation',

  components: {
    MaterialIcon
  },

  data: () => ({
    isOpen: false
  }),

  computed: {
    // TODO: Make this just type string.
    currentRouteName(): string | symbol | null | undefined {
      return this.$router.currentRoute.value.name;
    },

    allProjectRoutes(): RouteRecordRaw[] {
      return this.$router.options.routes.filter(route => route?.meta?.isProject);
    },

    // TODO: Make this type just RouteRecordRaw.
    landingRoute(): RouteRecordRaw | undefined {
      return this.$router.options.routes.find(route => route?.meta?.isLanding);
    },

    // TODO: Removed the any typing.
    // TODO: Fix "Property 'reduce' does not exist on type '() => RouteRecordRaw[]'".
    aggregatedProjectRoutesByCreatedOn() {
      return Object.entries(
        ((this.allProjectRoutes as unknown) as RouteRecordRaw[]).reduce((accumulator: any, route: RouteRecordRaw) => {
          const year = route?.meta?.createdOn.getFullYear();

          return {
            ...accumulator,
            [year]: [...(accumulator?.[year]?.length ? accumulator[year] : []), route]
          };
        }, {})
      )
        .map(([key, value]) => {
          return [key, (value as RouteRecordRaw[]).slice().sort((a, b) => b?.meta?.createdOn - a?.meta?.createdOn)];
        })
        .reverse();
    },

    menuIcon(): 'close' | 'menu' {
      return this.isOpen ? 'close' : 'menu';
    }
  },

  watch: {
    isOpen(value) {
      this.$emit('state-change', value);
    }
  },

  methods: {
    closeNavigation() {
      this.isOpen = false;
    },

    openNavigation() {
      this.isOpen = true;
    },

    toggleNavigation() {
      this.isOpen = !this.isOpen;
    },

    navigateBackward() {
      const index = this.allProjectRoutes.findIndex(route => route.name === this.currentRouteName);

      if (index <= 0) return;

      const { path } = this.allProjectRoutes[index - 1];

      this.$router.push({ path });
    },

    navigateForward() {
      const index = this.allProjectRoutes.findIndex(route => route.name === this.currentRouteName);

      if (index >= this.allProjectRoutes.length) return;

      const { path } = this.allProjectRoutes[index + 1];

      this.$router.push({ path });
    }
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

  color: #ff8c7d;
  font-size: clamp(2.5rem, 3vw, 4rem);
  text-decoration: none;
}

.link {
  display: block;
  padding: 0.5rem 2rem;

  color: #fff;
  font-size: clamp(2.5rem, 3vw, 4rem);
  text-decoration: none;

  transition: all 0.05s ease-in-out;

  @media (map-get($viewport, 'min-width-7')) {
    opacity: 0.5;

    &:hover {
      padding-left: 4rem;

      opacity: 1;
    }
  }
}

.router-link-exact-active {
  text-decoration: line-through;

  opacity: 0.5;

  pointer-events: none;
}

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

.menu-toggle,
.project-selector {
}

.menu-icon {
  color: #fff;
  font-size: clamp(3rem, 3vw, 4rem);

  &:active {
    filter: brightness(0.5);
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
</style>
