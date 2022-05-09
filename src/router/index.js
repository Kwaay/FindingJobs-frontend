import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/LoginPage.vue';
import Signup from '../views/SignupPage.vue';
import Forgot from '../views/ForgotForm.vue';
import ResetPassword from '../views/ForgotResetPassword.vue';
import Accueil from '../views/AccueilPage.vue';
import Jobs from '../views/JobsPage.vue';
import Contact from '../views/ContactPage.vue';
// eslint-disable-next-line import/no-cycle
import store from '../store';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      auth: false,
    },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: {
      auth: false,
    },
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: Forgot,
    meta: {
      auth: false,
    },
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
    meta: {
      auth: false,
    },
  },
  {
    path: '/',
    name: 'Accueil',
    component: Accueil,
    meta: {
      auth: true,
    },
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: Jobs,
    meta: {
      auth: true,
    },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      auth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth !== true) {
    return next();
  }
  const tokenData = store.state.token;
  if (tokenData === null) return next({ name: 'Login' });

  const { token, time } = store.state.token || {};
  if (token === undefined || token.length < 1) {
    return next({ name: 'Login' });
  }

  if (time > time + 86400000) {
    return next({ name: 'Login' });
  }
  return next();
});

export default router;
