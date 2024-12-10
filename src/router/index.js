import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import AdminLayout from '../layouts/AdminLayout.vue';
import SeekerLayout from '../layouts/SeekerLayout.vue';
import Home from '../views/HomeView.vue';
import About from '../views/AboutView.vue';
import Services from '../views/ServicesView.vue';
import Contact from '../views/ContactView.vue';
import Login from '../views/LoginView.vue';
import AdminDashboard from '../views/AdminDashboard.vue';
import SeekerDashboard from '../views/SeekerDashboard.vue';

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: () => import('../views/HomeView.vue') // Lazy load component
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import('../views/AboutView.vue') // Lazy load component
  // },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { layout: DefaultLayout },
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { layout: DefaultLayout },
  },
  {
    path: '/services',
    name: 'Services',
    component: Services,
    meta: { layout: DefaultLayout },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: { layout: DefaultLayout },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { layout: DefaultLayout },
  },

  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { layout: AdminLayout },
  },
  {
    path: '/seeker/dashboard',
    name: 'SeekerDashboard',
    component: SeekerDashboard,
    meta: { layout: SeekerLayout },
  }

  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
