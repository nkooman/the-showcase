<template lang="pug">
.stacked-title
  .layer(v-for="color in colors")
</template>

<script>
export default {
  name: 'StackedTitle',

  props: {
    text: {
      type: String,
      required: true
    },

    offset: {},

    colors: {
      type: Array,
      required: true,
      validator(arr) {
        // Color Hexcode Regex
        const regex = /^#[0-9a-f]{3,6}$/i;

        return arr.every(color => regex.test(color));
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.stacked-title {
  font-size: inherit;
  font-family: inherit;
}

.layer {
  font-size: inherit;
}
</style>
