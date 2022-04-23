import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/LoginForm.vue';
import Signup from '../views/SignupForm.vue';
import Forgot from '../views/ForgotForm.vue';
import Accueil from '../views/AccueilView.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: Forgot,
  },
  {
    path: '/',
    name: 'Accueil',
    component: Accueil,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
