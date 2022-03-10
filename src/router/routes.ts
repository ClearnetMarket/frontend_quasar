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
        path: '/vendor/createitem',
        name: 'createquick',
        component: () => import('pages/vendorcreateitem/CreateItem.vue'),
      },
            {
        path: '/vendor/edititem/:id',
        name: 'edititem',
        component: () => import('pages/vendorcreateitem/EditItem.vue'),
      },
         
    ],
  },


  // Account  Logged in Required
  {
    path: '/wallet',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: (to, from, next) => {
      const loggedIn = Cookies.get('auth_token');
  
      if (!loggedIn || loggedIn == null) {
        next('/login');
      } else {
        next();
      }
    },
    children: [
      {
        path: '/wallet/btc',
        name: 'btcwallet',
        component: () => import('src/pages/wallets/btc/BtcTransactions.vue'),
      },
      {
        path: '/wallet/btc/send',
        name: 'btcwalletsend',
        component: () => import('src/pages/wallets/btc/BtcSend.vue'),
      },
      {
        path: '/wallet/btc/recieve',
        name: 'btcwalletrecieve',
        component: () => import('src/pages/wallets/btc/BtcRecieve.vue'),
      },
      {
        path: '/wallet/bch',
        name: 'bchwallet',
        component: () => import('src/pages/wallets/bch/BchTransactions.vue'),
      },
 
      {
        path: '/wallet/bch/send',
        name: 'bchwalletsend',
        component: () => import('src/pages/wallets/bch/BchSend.vue'),
      },
            {
        path: '/wallet/bch/recieve',
        name: 'bchwalletrecieve',
        component: () => import('src/pages/wallets/bch/BchRecieve.vue'),
      },
      {
        path: '/wallet/xmr',
        name: 'xmrwallet',
        component: () => import('src/pages/wallets/xmr/XmrTransactions.vue'),
      },
            {
        path: '/wallet/xmr/send',
        name: 'xmrwalletsend',
        component: () => import('src/pages/wallets/xmr/XmrSend.vue'),
      },
            {
        path: '/wallet/xmr/recieve',
        name: 'xmrwalletrecieve',
        component: () => import('src/pages/wallets/xmr/XmrRecieve.vue'),
      },

     
    ],
  },





  // Plain Stuff
  {
    path: '/',
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
  // Account  Logged in Required
  {
    path: '/account',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: (to, from, next) => {
      const loggedIn = Cookies.get('auth_token');
  
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
