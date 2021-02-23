import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import { directives } from './directives';
import store from './store';

const app = createApp(App).use(store);
app.use(router);
app.use(store);

directives.forEach(([name, directive]) => app.directive(name, directive));

app.mount('#app');
