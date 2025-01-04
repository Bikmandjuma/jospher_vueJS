import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/css/tailwind.css'; // Import Tailwind CSS
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel';
import $ from 'jquery';
// @ts-ignore
import Toast from 'vue-toastification'; 
import 'vue-toastification/dist/index.css'; // Import the required styles

// @ts-ignore
window.$ = $; // Make sure jQuery is available globally

// Initialize Vue with Toast plugin
createApp(App)
  .use(router)
  .use(Toast) // Make sure Toast is added to the app
  .mount('#app');
