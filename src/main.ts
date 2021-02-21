import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import { directives } from './directives';

const app = createApp(App);
app.use(router);

directives.forEach(([name, directive]) => app.directive(name, directive));

app.mount('#app');
