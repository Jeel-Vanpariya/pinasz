import './assets/scss/main.scss';

import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import * as ValidationProvider from 'vee-validate';
import App from './App.vue';
import router from './router';
import store from './stores';
import axios from 'axios';
import Tooltip from 'primevue/tooltip';
import FocusTrap from 'primevue/focustrap';
import JsonCSV from 'vue-json-csv';
import '@mdi/font/css/materialdesignicons.css';

const app = createApp(App);

if (window.location.hostname == 'localhost') {
  axios.defaults.baseURL = 'http://localhost:4000/api/';
} else {
  axios.defaults.baseURL = `${location.origin}/api/`;
}

app.use(store);
app.use(router);
app.use(PrimeVue, { ripple: true });
app.use(ToastService);
app.use(ConfirmationService);
app.directive('tooltip', Tooltip);
app.directive('focustrap', FocusTrap);
app.component('ValidationProvider', ValidationProvider);
app.component('downloadCsv', JsonCSV);

app.mount('#app');
