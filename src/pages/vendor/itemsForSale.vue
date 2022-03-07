<template>
  <q-page class="docs-input">
    <q-breadcrumbs class="text-info q-mt-md q-ml-lg">
      <template v-slot:separator>
        <q-icon size="1.5em" name="chevron_right" color="primary" />
      </template>
      <q-breadcrumbs-el label="Home" icon="home" to="/" />
     
    </q-breadcrumbs>


<div class="row q-ma-none">
    <div class="col-12 text-center q-ma-none">
        <h5 class="q-mt-sm">My Items for item</h5>
    </div>
</div>

<div class="row">
    <div class="col-12">
      <q-btn color="primary" icon="mail" label="Create New Item" to="/vendor/createitem"/>
    </div>
</div>



  </q-page>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import axios from 'axios';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import authHeader from '../../services/auth.header';
import { mapGetters } from 'vuex';


export default defineComponent({
  name: 'forsale',
  setup () {
    const $q = useQuasar();
  },

  data () {
    return {
      items: [],
      accept: ref(false),
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    async userstatus () {
      await axios({
        method: 'get',
        url: '/auth/whoami',
        withCredentials: true,
        headers: authHeader()
      })
        .then((response) => {
          if (response.status = 200) {
           
          }
            else 
          {

          }
        })
    },
    async getvendoritems () {
      await axios({
        method: 'get',
        url: '/vendor-create/itemsforsale',
        withCredentials: true,
        headers: authHeader()
      })
        .then((response) => {
          if (response.status = 200) {
            this.items = response.data.items
          }
          
        })
    },
  }
  


});
</script>
