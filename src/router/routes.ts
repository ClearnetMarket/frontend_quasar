import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') }],
  },

  {
    path: '/login',
    component: () => import('layouts/HeaderPlain.vue'),
    children: [{ path: '', component: () => import('pages/auth/Login.vue') }],
  },
  
  {
    path: '/register',
    component: () => import('layouts/HeaderPlain.vue'),
    children: [{ path: '', component: () => import('pages/auth/Register.vue') }],
  },
  {
    path: '/forgotpassword',
    component: () => import('layouts/HeaderPlain.vue'),
    children: [{ path: '', component: () => import('pages/auth/ForgotPassword.vue') }],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/error/Error404.vue'),
  },
];

export default routes;
