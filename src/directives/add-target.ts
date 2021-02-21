import { Directive } from 'vue';

export const AddTarget: [string, Directive] = [
  'add-target',
  {
    mounted(el, binding) {
      el.querySelectorAll('a').forEach((element: Element) =>
        element.setAttribute('target', (binding.value as unknown) as string)
      );
    }
  }
];
