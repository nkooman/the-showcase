import { Directive } from 'vue';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

export const BodyScrollLock: [string, Directive] = [
  'body-scroll-lock',
  {
    beforeUpdate(el, binding) {
      binding.value ? disableBodyScroll(el) : enableBodyScroll(el);
    },
    beforeUnmount() {
      clearAllBodyScrollLocks();
    }
  }
];
