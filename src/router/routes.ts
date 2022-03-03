import { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import { Cookies } from 'quasar';

const routes: RouteRecordRaw[] = [
  // Main Pages no login
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('pages/Index.vue'),
      },
    ],
  },

  // Main Login Required  pages
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: (to, from, next) => {
      const loggedIn = Cookies.get('auth_token');
      console.log(loggedIn);
      if (!loggedIn || loggedIn == null) {
        next('/login');
      } else {
        next();
      }
    },
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('pages/auth/Profile.vue'),
      },
      {
        path: '/sell',
        name: 'sell',
        component: () => import('pages/vendor/Sell.vue'),
      },
      {
        path: '/vendor/itemsforsale',
        name: 'forsale',
        component: () => import('pages/vendor/itemsForSale.vue'),
      },
      {
        path: '/vendor/pageone',
        name: 'createone',
        component: () => import('pages/vendorcreateitem/PageOne.vue'),
      },
      {
        path: '/vendor/pagetwo',
        name: 'createtwo',
        component: () => import('pages/vendorcreateitem/PageTwo.vue'),
      },
      {
        path: '/vendor/pagethree',
        name: 'createthree',
        component: () => import('pages/vendorcreateitem/PageThree.vue'),
      },
      {
        path: '/vendor/pagefour',
        name: 'createfour',
        component: () => import('pages/vendorcreateitem/PageFour.vue'),
      },
    ],
  },

  // Plain Stuff
  {
    path: '/auth',
    component: () => import('layouts/SimpleLayout.vue'),
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('pages/auth/Login.vue'),
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('pages/auth/Register.vue'),
      },
      {
        path: '/forgotpassword',
        name: 'forgotpassword',
        component: () => import('pages/auth/ForgotPassword.vue'),
      },
    ],
  },

  // Plain  Account
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: (to, from, next) => {
      const loggedIn = Cookies.get('auth_token');
      console.log(loggedIn);
      if (!loggedIn || loggedIn == null) {
        next('/login');
      } else {
        next();
      }
    },
    children: [
      {
        path: '/account',
        name: 'account',
        component: () => import('src/pages/auth/account/AccountHome.vue'),
      },
      {
        path: '/account/profile',
        name: 'accountprofile',
        component: () => import('src/pages/auth/account/ProfileBasic.vue'),
      },
      {
        path: '/changepassword',
        name: 'changepassword',
        component: () => import('pages/auth/ChangePassword.vue'),
      },
      {
        path: '/changepin',
        name: 'changepin',
        component: () => import('pages/auth/ChangePin.vue'),
      },
      {
        path: '/account-seed',
        name: 'accountseed',
        component: () => import('pages/auth/AccountSeed.vue'),
      },
      {
        path: '/account-seed-confirm',
        name: 'accountseedconfirm',
        component: () => import('pages/auth/AccountSeedConfirm.vue'),
      },
    ],
  },

  // Error Pages
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/error/Error404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // Currently not working due to history mode?
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = Cookies.get('auth_token');

  if (loggedIn == null) {
    next({ name: 'login' });
  }
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next({ name: 'login' });
  }
});

export default routes;
