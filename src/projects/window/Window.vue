<template lang="pug">
.window
  img.background(src="./assets/images/landing.jpg")
  .wrapper
    .clip-path(ref="wrapperRef")
    nav
      ul
        li: a(href="/#/window") Window.
        li: a(href="/#/window") About
        li: a(href="/#/window") Contact
    .content
      section.landing(ref="landingRef")
        h1 A Snapshot of Norway
        button Take a look.
        MaterialIcon.icon swipe_down_alt
      section
        h2 Stuff!
        img(src="./assets/images/shoreline.jpg")
      section
        h2 More Stuff!
        img(src="./assets/images/mountain-view.jpg")
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import MaterialIcon from '@/components/MaterialIcon.vue';

const wrapperRef = ref<HTMLDivElement | null>(null);
const landingRef = ref<HTMLDivElement | null>(null);
const isPastLanding = ref(false);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const contentPadding = computed(() =>
  isPastLanding.value ? { content: '0', nav: '2.5rem' } : { content: '2.5rem', nav: '0' }
);
const baseInsetY = 15;
const baseInsetX = 17.5;
const insetY = ref('15vh');
const insetX = ref('17.5vw');

const options: IntersectionObserverInit = {
  root: wrapperRef.value,
  rootMargin: '0px',
  threshold: Array(100)
    .fill(0)
    .map((_, i) => i / 100)
};

onMounted(() => {
  const intersectionObserver = new IntersectionObserver(entries => {
    const ratio = parseFloat(entries[0].intersectionRatio.toPrecision(2));

    if (ratio < 0) {
      return;
    }

    if (ratio === 0) {
      insetY.value = '0';
      insetX.value = '0';
      isPastLanding.value = true;

      return;
    }

    isPastLanding.value = false;
    insetY.value = `${baseInsetY * ratio}vh`;
    insetX.value = `${baseInsetX * ratio}vw`;
  }, options);
  intersectionObserver.observe(landingRef.value!);
});
</script>

<style lang="scss" scoped>
@include google-font('Averia Serif Libre');

.window {
  font-family: 'Averia Serif Libre', sans-serif;
  width: 100%;
  height: 100%;
  position: relative;
  font-size: 2rem;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: brightness(0.5);
}

a {
  text-decoration: none;
  color: inherit;
  font-size: inherit;
}

.wrapper {
  --frame-width: 2.5rem;
  /* --inset-y: 15vh;
  --inset-x: 17.5vw; */

  position: absolute;
  inset-block: v-bind('insetY');
  inset-inline: v-bind('insetX');
  /* inset: var(--inset-y) var(--inset-x); */
  padding-block: var(--frame-width);
  padding-inline: v-bind('contentPadding.content');
  display: grid;
  grid-template-rows: auto 1fr;
  isolation: isolate;

  @media screen and (max-width: 1600px) {
    --inset-y: 15vh;
    --inset-x: 13vw;
  }

  @media screen and (max-width: 1200px) {
    --inset-y: 10vh;
    --inset-x: 10vw;
  }

  @media screen and (max-width: 768px) {
    --inset-y: 5vh;
    --inset-x: 5vw;
  }

  .clip-path {
    --clip-path-width: calc(var(--frame-width) + 2px);

    position: absolute;
    width: 100%;
    height: 100%;
    background: #fff;
    clip-path: polygon(
      0% 0%,
      0% 100%,
      var(--clip-path-width) 100%,
      var(--clip-path-width) var(--clip-path-width),
      calc(100% - var(--clip-path-width)) var(--clip-path-width),
      calc(100% - var(--clip-path-width)) calc(100% - var(--clip-path-width)),
      var(--clip-path-width) calc(100% - var(--clip-path-width)),
      var(--clip-path-width) 100%,
      100% 100%,
      100% 0%
    );
    z-index: -1;
  }
}

nav {
  width: 100%;
  background: #fff;
  padding-bottom: var(--frame-width);
  padding-inline: v-bind('contentPadding.nav');

  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
    gap: 3rem;
    align-items: baseline;
    align-content: center;
    display: grid;
    grid-template-columns: 1fr auto auto;

    li:first-child a {
      font-size: 4rem;
    }

    li:not(:first-child) a {
      position: relative;
      cursor: pointer;

      &::before {
        content: '';
        position: absolute;
        width: 0%;
        bottom: -2px;
        height: 2px;
        background: #000;
        transition: width 0.1s ease-in-out;
      }

      &:hover::before {
        width: 100%;
      }
    }
  }
}

.content {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
}

section {
  min-height: 100%;
  width: 100%;
  padding: var(--frame-width);
  background: #fff;
}

h2 {
  font-size: 5rem;
}

img {
  max-width: 100%;
}

.landing {
  background: transparent;
  display: grid;
  align-items: center;
  /* align-content: start; */
  justify-items: start;
  height: 100%;
  gap: 3rem;
  padding-top: 10rem;
  grid-template-rows: auto auto 1fr;

  @media screen and (max-width: 768px) {
    justify-content: center;
    justify-items: center;
    text-align: center;
  }

  h1 {
    max-width: 10ch;
    font-size: 7rem;
    color: #fff;
    margin: 0;
    line-height: 1;
    font-weight: 400;

    @media screen and (max-width: 768px) {
      font-size: 5rem;
    }
  }

  button {
    font-family: inherit;
    background: none;
    color: #fff;
    appearance: none;
    border: 5px #fff solid;
    position: relative;
    padding: 2rem 5rem;
    font-size: 2.5rem;
    overflow: hidden;
    isolation: isolate;
    cursor: pointer;
    transition: color 0.5s;

    @media screen and (max-width: 768px) {
      padding: 1.5rem 2.5rem;
      border-width: 3px;
      width: 100%;
    }

    &::before {
      content: '';
      background: #fff;
      position: absolute;
      inset: 0;
      transform: translateX(-100%);
      transition: transform 0.2s;
      z-index: -1;
    }

    &:hover {
      color: #000;

      &::before {
        transform: translateX(0);
      }
    }
  }

  @keyframes bounce {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }

  .icon {
    color: #fff;
    font-size: 4rem;
    align-self: end;
    justify-self: center;
    animation: bounce 1.5s infinite;
  }
}
</style>
