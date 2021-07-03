<template lang="pug">
.modernism
  .grid
    h1.title-container
      JustifyText(:word="'Modernism'")
    .author
      JustifyText(:word="'Nicholas'")
      JustifyText(:word="'Kooman'")
      JustifyText(:word="'2021'")
    .photo
    .d
    .e
    .menu
      span menu
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import JustifyText from './JustifyText.vue';

export default defineComponent({
  name: 'Modernism',
  components: {
    JustifyText
  }
});
</script>

<style lang="scss" scoped>
@include google-font('Inconsolata');

.modernism {
  width: 100%;
  height: 100%;

  background: hsl(0, 0%, 95%);
  cursor: url('./assets/white-circle.png'), default;

  * {
    font-family: 'Inconsolata', sans-serif;
    text-transform: uppercase;
  }
}

.grid {
  display: grid;
  grid: repeat(auto-fit, 50px) / repeat(24, 1fr);
  grid-template-areas:
    'a a a a a ✏ ✏ ✏ 📷 📷 📷 📷 📷 📷 📷 📷 d d d e e e 🍔 🍔'
    'a a a a a ✏ ✏ ✏ 📷 📷 📷 📷 📷 📷 📷 📷 d d d e e e 🍔 🍔'
    '. . . . . . . . 📷 📷 📷 📷 📷 📷 📷 📷 . . . . . . . .'
    '. . . . . . . . 📷 📷 📷 📷 📷 📷 📷 📷 . . . . . . . .'
    '. . . . . . . . 📷 📷 📷 📷 📷 📷 📷 📷 . . . . . . . .'
    '. . . . . . . . 📷 📷 📷 📷 📷 📷 📷 📷 . . . . . . . .'
    '. . . . . . . . 📷 📷 📷 📷 📷 📷 📷 📷 . . . . . . . .'
    '. . . . . . . . 📷 📷 📷 📷 📷 📷 📷 📷 . . . . . . . .';

  /* @media screen and (max-width: 1366px) {
  } */

  @media screen and (max-width: 768px) {
    grid: repeat(auto-fit, 50px) / repeat(12, 1fr);
    grid-template-areas:
      'a a a a a a ✏ ✏ ✏ ✏ 🍔 🍔'
      'a a a a a a ✏ ✏ ✏ ✏ 🍔 🍔'
      '📷 📷 📷 📷 📷 📷 📷 📷 📷 📷 📷 📷'
      '📷 📷 📷 📷 📷 📷 📷 📷 📷 📷 📷 📷'
      '📷 📷 📷 📷 📷 📷 📷 📷 📷 📷 📷 📷'
      '📷 📷 📷 📷 📷 📷 📷 📷 📷 📷 📷 📷'
      'd d d d d e e e e e e e'
      'd d d d d e e e e e e e';
  }
  gap: 1px;
  width: 100%;
  height: 100%;

  background: black;

  * {
    margin: 0;
  }

  > * {
    background: white;
  }
}

.title-container {
  display: grid;
  grid-area: a;
  width: 100%;
  padding: 1rem;

  font-size: clamp(3rem, 3vw, 5rem);
  text-align: justify;
  text-justify: inter-character;
  place-items: center center;
}

.author {
  display: grid;
  grid: repeat(3, 1fr) / 1fr;
  grid-area: ✏;
  gap: 1px;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  font-size: clamp(1.5rem, 1.5vw, 2.5rem);

  background: black;

  > * {
    display: inline-flex;
    align-items: center;
    height: 100%;
    padding: 0 1rem;

    background: white;
  }
}

.photo {
  grid-area: 📷;

  background: url('./assets/modern-art.jpg');
  background-repeat: no-repeat;
}

.d {
  grid-area: d;
}

.e {
  grid-area: e;
}

.menu {
  display: grid;
  grid-area: 🍔;

  font-size: 2rem;

  place-items: center center;
}
</style>
