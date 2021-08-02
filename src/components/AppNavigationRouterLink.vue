<template lang="pug">
router-link(
  custom
  v-slot="{ href, navigate, isActive, isExactActive }"
  :to="props.path")
    li.item(:class="{ 'router-link-active': isActive, 'router-link-exact-active': isExactActive, 'desktop-only': desktopOnly }")
      a.link(
        :href="href"
        @click="[() => navigate($event), closeNavigation]")
        | {{ routeName }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppNavigationRouterLink',

  props: {
    path: {
      type: String,
      required: true
    },
    routeName: {
      type: String,
      required: true
    },
    desktopOnly: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  emits: ['close-navigation'],

  setup(props, context) {
    const closeNavigation = () => context.emit('close-navigation');

    return {
      props,
      closeNavigation
    };
  }
});
</script>

<style lang="scss" scoped>
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
  text-decoration: line-through from-font white;

  opacity: 0.5;

  pointer-events: none;
}

@media (map-get($viewport, 'max-width-7')) {
  .desktop-only {
    display: none;
  }
}
</style>
