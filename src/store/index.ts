import { store } from 'quasar/wrappers';
import { InjectionKey } from 'vue';
import {createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
} from 'vuex';
import createPersistedState from "vuex-persistedstate";


import auth from "../store/auth";

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export interface StateInterface {


}

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>;
    
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<StateInterface>> =
  Symbol('vuex-key');

export default store(function (/* { ssrContext } */) {
  const Store = createStore<StateInterface>({
    modules: {
      auth
    },
     plugins: [createPersistedState()],

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING,
  });

  return Store;
});

export function useStore() {
  return vuexUseStore(storeKey);
}
