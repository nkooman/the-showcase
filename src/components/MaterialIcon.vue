<template lang="pug">
i.material-icons
  slot
</template>

<script>
export default {
  name: 'MaterialIcon'
};
</script>

<style lang="scss" scoped>
@include google-font('Material Icons');
</style>
