import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import AdminLayout from '../layouts/AdminLayout.vue';
import SeekerLayout from '../layouts/SeekerLayout.vue';
import GuestLayout from '../layouts/GuestLayout.vue';
import Home from '../views/HomeView.vue';
import About from '../views/AboutView.vue';
import Services from '../views/ServicesView.vue';
import Contact from '../views/ContactView.vue';
import Login from '../views/Auth/LoginView.vue';
import SeekerFill_Info from '../views/Auth/SeekerFill_Info.vue';
import Register from '../views/Auth/RegisterView.vue';
import CodetoRegister from '../views/Auth/CodeToRegister.vue';
import ForgotPassword from '../views/Auth/ForgotPasswordView.vue';
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
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { layout: DefaultLayout },
  },

  {
    path: '/forgot_password',
    name: 'ForgotPassword',
    component: ForgotPassword,
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
  },

  {
    path: '/seeker/code/register',
    name: 'CodeToRegister',
    component: CodetoRegister,
    meta: { layout: GuestLayout },
  },
  
  {
    path: '/seeker/fill/info',
    name: 'SeekerFill_Info',
    component: SeekerFill_Info,
    meta: { layout: GuestLayout },
  },

  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
