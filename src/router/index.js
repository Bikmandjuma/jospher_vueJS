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
import SeekerInformation from '../views/Seeker/SeekerInformation.vue';
import SeekerProfile from '../views/Seeker/SeekerProfile.vue';
import JobCategory from '../views/Seeker/SeekerJobCategory.vue';
import JobPosition from '../views/Seeker/SeekerJobPosition.vue';
import RecommendationJob from '../views/Seeker/SeekerRecommendation.vue';
import SeekerPaymentPlan from '../views/Seeker/SeekerPaymentPlan.vue';
import SeekerPayment from '../views/Seeker/SeekerPayment.vue';
import SeekerPassword from '../views/Seeker/SeekerPassword.vue';
import SeekerUpdateInfo from '../views/Seeker/SeekerUpdateInfo.vue';
import SeekerResetCodePassword from '../views/Auth/CodeToResetPassword.vue';
import SeekerResetPassword from '../views/Auth/ResetPassword.vue';

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
    meta: { layout: AdminLayout , requiresAuth : true},
  },
  {
    path: '/seeker/dashboard',
    name: 'SeekerDashboard',
    component: SeekerDashboard,
    meta: { layout: SeekerLayout , requiresAuth : true,pageTitle: "Dashboard" },
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

  {
    path: '/seeker/information',
    name: 'SeekerInformation',
    component: SeekerInformation,
    meta: { 
      layout: SeekerLayout  , 
      requiresAuth : true
      ,pageTitle: "Information" },
  },

  {
    path: '/seeker/profile',
    name: 'SeekerProfile',
    component: SeekerProfile,
    meta: { 
      layout: SeekerLayout  ,
      requiresAuth : true,
      pageTitle: "Profile" },
  },

  {
    path: '/seeker/job_category',
    name: 'JobCategory',
    component: JobCategory,
    meta: { 
      layout: SeekerLayout  ,
      requiresAuth : true,
      pageTitle: "Job_category" },
  },

  {
    path: '/seeker/job_position',
    name: 'JobPosition',
    component: JobPosition,
    meta: { 
      layout: SeekerLayout  ,
      requiresAuth : true,
      pageTitle: "Job_position" },
  },

  {
    path: '/seeker/recommendation_job',
    name: 'RecommendationJob',
    component: RecommendationJob,
    meta: { 
      layout: SeekerLayout  ,
      requiresAuth : true,
      pageTitle: "Recom.. Job" },
  },

  {
    path: '/seeker/payment_plan',
    name: 'PaymentPlan',
    component: SeekerPaymentPlan,
    meta: { 
      layout: SeekerLayout  ,
      requiresAuth : true,
      pageTitle: "Payment plan" },
  },

  {
    path: '/seeker/payment',
    name: 'Payment',
    component: SeekerPayment,
    meta: { 
      layout: SeekerLayout  ,
      requiresAuth : true,
      pageTitle: "Payment" },
  },

  {
    path: '/seeker/updateInfo',
    name: 'UpdateInfo',
    component: SeekerUpdateInfo,
    meta: { 
      layout: SeekerLayout  ,
      requiresAuth : true,
      pageTitle: "Update_info" },
  },

  {
    path: '/seeker/password',
    name: 'Password',
    component: SeekerPassword,
    meta: { 
      layout: SeekerLayout  ,
      requiresAuth : true,
      pageTitle: "Password" },
  },

  {
    path: '/seeker/reset/code/password',
    name: 'ResetCodePassword',
    component: SeekerResetCodePassword,
    meta: { layout: GuestLayout },
  },

  {
    path: '/seeker/reset/password',
    name: 'ResetPassword',
    component: SeekerResetPassword,
    meta: { layout: GuestLayout },
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("auth_token");

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
