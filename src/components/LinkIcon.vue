<template lang="pug">
  a.link(
    :href="href"
    :title="title"
    :target="isExternal ? '_blank' : '_self'")
    i.material-icons(v-if="iconBefore") {{ iconBefore }}
    span.text(v-if="text") {{ text }}
    i.material-icons(v-if="iconAfter") {{ iconAfter }}
</template>

<script>
export default {
  name: 'LinkIcon',

  props: {
    href: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    text: String,
    iconBefore: String,
    iconAfter: String,
    isExternal: Boolean
  }
};
</script>

<style lang="scss" scoped>
@include google-font('Material Icons');

.link {
  color: inherit;
  font-weight: 800;
  text-decoration: none;

  &:hover .text {
    text-decoration: underline;
  }
}
</style>
