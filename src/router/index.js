import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import AdminLayout from '../layouts/AdminLayout.vue';
import SeekerLayout from '../layouts/SeekerLayout.vue';
import GuestLayout from '../layouts/GuestLayout.vue';
import Home from '../views/HomePages/HomeView.vue';
import About from '../views/HomePages/AboutView.vue';
import Services from '../views/HomePages/ServicesView.vue';
import Jobs from '../views/HomePages/JobsView.vue';
import Pricing from '../views/HomePages/PricingView.vue';
import Contact from '../views/HomePages/ContactView.vue';
import Login from '../views/Auth/LoginView.vue';
import SeekerFill_Info from '../views/Auth/SeekerFill_Info.vue';
import Register from '../views/Auth/RegisterView.vue';
import CodetoRegister from '../views/Auth/CodeToRegister.vue';
import ForgotPassword from '../views/Auth/ForgotPasswordView.vue';
import AdminDashboard from '../views/Admin/AdminDashboard.vue';
import SeekerDashboard from '../views/Seeker/SeekerDashboard.vue';

const routes = [
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
    path: '/jobs',
    name: 'Jobs',
    component: Jobs,
    meta: { layout: DefaultLayout },
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: Pricing,
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
    meta: { layout: SeekerLayout, requiresAuth: true }, // Protect this route
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

// Global navigation guard to protect all routes
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token'); // Check if token exists in localStorage

  // If the route requires authentication (requiresAuth is set to true) and the token is not found
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    // Redirect to the login page
    next({ name: 'Login' });
  } else {
    // Otherwise, proceed to the route
    next();
  }
});

export default router;
