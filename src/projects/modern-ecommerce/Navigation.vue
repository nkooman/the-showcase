<template lang="pug">
.navigation
  .logo
  ul
    li: a(href="#/modern-ecommerce") Home
    li: a(href="#/modern-ecommerce") Men
    li: a(href="#/modern-ecommerce") Women
    li: a(href="#/modern-ecommerce") About
    li.shopping-cart: a(href="#/modern-ecommerce"): MaterialIcon shopping_bag
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MaterialIcon from '@/components/MaterialIcon.vue';

export default defineComponent({
  name: 'Navigation',
  components: {
    MaterialIcon
  }
});
</script>

<style lang="scss" scoped>
.navigation {
  display: grid;
  grid: 1fr / min-content 1fr;
  padding: 4rem 10rem;
}

ul {
  display: grid;
  grid: 1fr / auto-flow;
  gap: 10rem;
  align-items: flex-end;
  justify-self: flex-end;

  list-style-type: none;
}

li {
  font-size: 24px;
}

a {
  position: relative;

  display: grid;

  color: #000;

  text-decoration: none;

  &::before {
    position: absolute;
    bottom: -5px;
    left: 0;

    width: 100%;
    height: 3px;

    // I have no clue why this psuedo-element won't inherit the colors from the parent.
    background-color: #522298;
    transform: scaleX(0);
    visibility: hidden;

    transition: all 0.2s ease-in-out 0s;

    content: '';
  }

  &:hover::before {
    transform: scaleX(1);
    visibility: visible;
  }
}

.shopping-cart {
  font-size: 32px;

  a:hover {
    color: var(--primary);
  }

  a::before {
    all: unset;
  }
}
</style>
