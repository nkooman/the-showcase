<template lang="pug">
  a.link(
    :href="href"
    :title="title"
    :target="isExternal ? '_blank' : '_self'")
    MaterialIcon.icon(v-if="iconBefore") {{ iconBefore }}
    span.text(v-if="text") {{ text }}
    MaterialIcon.icon(v-if="iconAfter") {{ iconAfter }}
</template>

<script>
import MaterialIcon from '@/components/MaterialIcon';

export default {
  name: 'LinkIcon',

  components: {
    MaterialIcon
  },

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
.link {
  color: inherit;
  font-weight: 800;
  white-space: nowrap;
  text-decoration: none;

  &:hover .text {
    text-decoration: underline;
  }
}

.icon {
  vertical-align: middle;
}
</style>
