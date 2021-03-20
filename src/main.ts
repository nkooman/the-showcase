import { createApp } from 'vue';
import { filterableSelectElement } from '@/web-components';
import { defineComponents } from '@/utils/web-component';
import App from './App.vue';
import { router } from './router';
import { directives } from './directives';

const app = createApp(App);
app.use(router);
defineComponents([filterableSelectElement]);
directives.forEach(([name, directive]) => app.directive(name, directive));
app.mount('#app');
