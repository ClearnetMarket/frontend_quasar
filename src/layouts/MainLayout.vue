<template>
  <q-layout view="hHh lpR fFf" >
    <MainHeaderTop />
    <q-page-container  style="max-width: 1300px; margin: 0 auto;">
      <MainHeaderMid />
      <MainHeaderBottom />
      <MainHeaderVendor  v-show="user.admin_role > 1"/>
      <div class="q-mx-xl">
      <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import MainHeaderTop from './headers/MainHeaderTop.vue';
import MainHeaderMid from './headers/MainHeaderMid.vue';
import MainHeaderBottom from './headers/MainHeaderBottom.vue';
import MainHeaderVendor from './headers/MainHeaderVendor.vue';

export default defineComponent({
  name: 'MainLayout',

  components: { MainHeaderTop, MainHeaderMid, MainHeaderBottom, MainHeaderVendor },
  computed: {
    ...mapGetters(['user']),
  },

  methods: {
    logout () {
      localStorage.clear();
      this.$store.dispatch('user', null);
      this.$q.cookies.remove('user_token')
      this.$q.cookies.remove('auth_token')
      this.$q.notify({
        type: 'negative',
        message: 'You are now logged out.',
        badgeStyle: 'opacity: 0',
        position: 'top',
      });


    },
  },
});
</script>

