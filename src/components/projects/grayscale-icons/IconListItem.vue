<template lang="pug">
li: a.link(:href="href" target="_blank"): img.image(:src="src" :alt="alt")
</template>

<script>
export default {
  name: 'IconListItem',
  props: {
    href: {
      type: String,
      required: true
    },
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.link,
.image {
  width: inherit;
  height: inherit;

  user-select: none;
}
</style>
