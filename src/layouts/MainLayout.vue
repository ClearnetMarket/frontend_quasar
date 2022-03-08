<template>
  <q-layout view="hHh lpR fFf" >
    <MainHeaderTop />
    <q-page-container class="htmlbody" style="max-width: 1300px; margin: 0 auto;">
      <MainHeaderMid />
      <MainHeaderBottom />
      <div v-if="user">
      <MainHeaderVendor  v-show="user.admin_role > 1"/>
  

      </div>
      <div class="q-mx-xl">
      <router-view />
      </div>
    <div class="footer row bg-primary" style="min-height: 300px;">

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
import ref from '.vue';
import { useQuasar } from 'quasar';


export default defineComponent({
  name: 'MainLayout',

  components: { MainHeaderTop, MainHeaderMid, MainHeaderBottom, MainHeaderVendor },
  
    setup () {
        const $q = useQuasar();

       
    },
    
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



<style>
.htmlbody{
  height: 100%;
   box-sizing: border-box;
   padding-bottom: 400px;;
}
.footer{
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  background-color: #efefef;
  text-align: center;
}
</style>