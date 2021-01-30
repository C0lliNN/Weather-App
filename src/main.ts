import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);

app.use(store);

app.mount('#app');
