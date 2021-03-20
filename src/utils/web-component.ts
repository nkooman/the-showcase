import { WebComponent } from '@/types';

export const defineComponents = (components: Array<WebComponent>) => {
  components.forEach(([tag, component, options]) => window.customElements.define(tag, component, options));
};
