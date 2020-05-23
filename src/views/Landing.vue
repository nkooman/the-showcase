<template lang="pug">
  .landing
    span.welcome Welcome to
    h1.title The Showcase
    p.description This is a space where I can present different ideas I have for UI/UX design.
</template>

<script>
export default {
  name: 'Landing'
};
</script>

<style lang="scss" scoped>
@include google-font {
  @include google-font('Archivo Black');
  @include google-font('Lora');
}

.landing {
  padding: 2rem;
  height: 100%;
  width: 100%;

  .welcome {
    font-size: clamp(2.5rem, 4.5vw, 7.5rem);
  }

  .title {
    margin-top: 1rem;

    font-size: clamp(3rem, 9vw, 20rem);
    line-height: 50%;
  }

  .welcome,
  .title {
    font-family: 'Archivo Black', sans-serif;
    text-transform: uppercase;
  }

  .description {
    font-family: 'Lora', serif;
    font-size: clamp(2rem, 2vw, 3rem);
  }
}
</style>
