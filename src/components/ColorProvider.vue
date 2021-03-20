<template lang="pug">
.color-provider(:style="colors")
  slot
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { isHexCode } from '@/utils/validators';

export default defineComponent({
  name: 'Color Provider',
  props: {
    colors: {
      type: Object as PropType<Record<string, string>>,
      required: true,
      validator: (obj: Record<string, string>) => {
        return Object.keys(obj).every(key => key && key.length) && Object.values(obj).every(value => isHexCode(value));
      }
    }
  }
});
</script>
