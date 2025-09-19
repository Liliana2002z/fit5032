import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue' 
import FirebaseSigninView from '../views/FirebaseSigninView.vue' 
import AccessDeniedView from '../views/AccessDeniedView.vue';
import { useAuth } from '@/services/authService';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true },
  },
  {
    path: '/Firelogin',
    name: 'Firelogin',
    component: FirebaseSigninView,
  },
  {
    path: '/Fireregister',
    name: 'Fireregister',
    component: FirebaseRegisterView,
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: AccessDeniedView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router