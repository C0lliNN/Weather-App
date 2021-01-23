import { createApp } from 'vue';
import VueIntl from 'vue-intl';
import App from './App.vue';
import store from './store';
import intlConfig from './intl'

const app = createApp(App);

app.use(store);
app.use(VueIntl, intlConfig);

app.mount('#app');
