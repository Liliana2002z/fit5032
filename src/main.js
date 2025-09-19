// import './assets/main.css'
// import '@/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
// import DataTable from 'primevue/datatable'
// import Column from 'primevue/Column'

import { initializeApp } from "firebase/app"; 
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAmH8DzX_lx1idpWtM64VEVgNFddfrh5Iw",
	authDomain: "week7-xiaoqian.firebaseapp.com",
	projectId: "week7-xiaoqian",
	storageBucket: "week7-xiaoqian.firebasestorage.app",
	messagingSenderId: "805282837107",
	appId: "1:805282837107:web:690f8d645ecb1c58c1f006"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)
// app.component('DataTable', DataTable)
// app.component('Column', Column)

app.mount('#app')