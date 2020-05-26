<template lang="pug">
  nav.app-navigation(:class="{ active: isOpen }")
    .sidebar
      a.menu-toggle(role="button" @click="toggleNavigation" aria-label="Toggle menu")
        i.material-icons {{ menuIcon }}
      .project-title(v-show="!isOpen") {{ currentRouteName }}
      .project-selector
        a.backward(role="button" aria-label="Navigate backward" @click="navigateBackward"): i.material-icons chevron_left
        a.forward(role="button" aria-label="Navigate forward" @click="navigateForward"): i.material-icons chevron_right
    .project-container
      ul.project-list(v-if="isOpen")
        router-link(
          exact
          v-for="({ path, name }, index) in allProjectRoutesOrLanding"
          v-slot="{ href, route, navigate, isActive, isExactActive }"
          :to="path"
          :key="index")
          li.item(
            :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']")
            a.link(
              :href="href"
              @click="[navigate($event), closeNavigation()]")
              | {{ name }}
</template>

<script>
export default {
  name: 'AppNavigation',

  data: () => ({
    isOpen: false,
    hover: {
      top: ''
    }
  }),

  computed: {
    currentRouteName() {
      return this.$route.name;
    },

    allProjectRoutesOrLanding() {
      return this.$router.options.routes.filter(route => route?.meta?.isProject || route?.meta?.isLanding);
    },

    menuIcon() {
      return this.isOpen ? 'close' : 'menu';
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
};
</script>

<style lang="scss" scoped>
@include google-font('Archivo Black');
@include google-font('Lora');

$app-navigation-width: 7.5rem;

.app-navigation {
  position: fixed;

  font-family: 'Lora';

  @media (map-get($viewport, 'min-width-7')) {
    top: 0;
  }

  @media (map-get($viewport, 'max-width-7')) {
    left: 0;
  }
}

.project-container {
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0;

  background: #20272e;
  white-space: nowrap;
  transition: all 0.25s ease;

  @media (map-get($viewport, 'min-width-7')) {
    height: 100%;
    margin-left: $app-navigation-width;
    width: 0;
  }

  @media (map-get($viewport, 'max-width-7')) {
    height: 0;
    margin-top: $app-navigation-width;
    width: 100%;
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
  transition: opacity 0.2s ease 0.2s;

  list-style-type: none;
  opacity: 0;

  .active & {
    opacity: 1;
  }
}

.link {
  display: block;
  padding: 0.5rem 2rem;
  transition: all 0.05s ease-in-out;

  color: #fff;
  font-size: clamp(2.5rem, 3vw, 4rem);
  text-decoration: none;

  @media (map-get($viewport, 'min-width-7')) {
    opacity: 0.5;

    &:hover {
      padding-left: 4rem;

      backdrop-filter: brightness(1.2);
      opacity: 1;
    }
  }
}

.router-link-exact-active {
  opacity: 0.5;
  pointer-events: none;
  text-decoration: line-through;
}

.sidebar {
  align-items: center;
  display: inline-grid;
  gap: 0 2rem;
  grid: 1fr / [menu] 1fr [title] 4fr [selector] 2fr;
  height: $app-navigation-width;
  justify-content: space-between;
  width: 100vw;

  background: #1b2127;

  @media (map-get($viewport, 'min-width-7')) {
    gap: 2rem 0;
    grid: [menu] 1fr [title] 4fr [selector] 2fr / 1fr;
    height: 100vh;
    width: $app-navigation-width;
  }
}

.menu-toggle {
  grid-area: menu;

  cursor: pointer;
  user-select: none;
}

.project-selector {
  grid-area: selector;

  user-select: none;
}

.menu-toggle,
.project-selector {
  display: block;
  padding: 1.5rem;

  text-align: center;

  .material-icons {
    color: #fff;
    font-size: clamp(3rem, 3vw, 4rem);
  }
}

.backward,
.forward {
  margin: 0.25rem;

  cursor: pointer;
}

.project-title {
  grid-area: title;
  transform: rotate(180deg);

  display: block;
  line-height: $app-navigation-width;
  overflow: hidden;
  width: $app-navigation-width;
  writing-mode: vertical-rl;

  color: #fff;
  font-family: 'Archivo Black';
  font-size: clamp(2rem, 3vw, 3rem);
  font-weight: 700;
  letter-spacing: 2px;
  text-align: center;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;

  @media (map-get($viewport, 'max-width-7')) {
    transform: none;

    width: 100%;

    writing-mode: horizontal-tb;
  }
}
</style>
