<template>
  <q-page class="docs-input">
    <q-breadcrumbs class="text-info q-mt-md q-ml-lg">
      <template v-slot:separator>
        <q-icon size="1.5em" name="chevron_right" color="primary" />
      </template>
      <q-breadcrumbs-el label="Home" icon="home" to="/" />
      <q-breadcrumbs-el label="Account" icon="person" to="/account" />
    </q-breadcrumbs>

    <q-parallax src="../../assets/vendor/img_trade.jpg"></q-parallax>
    <div class="row q-mt-lg">
      <div class="col-12 text-center">
        <h4>Vendor Signup</h4>
      </div>
    </div>
    <div class="row q-mb-lg">
      <div class="col-12 text-center">
        Digital Currency is one of the best inventions of modern time. It allows the world to trade goods and services
        with the ease of a single currency. It enables a free market, and puts the power back into peoples hands. We
        can create a better market, built on the free hand of reputation, to enable even the basic of services and goods in every country.
        Start selling today, and build a better world for tomorrow.
      </div>
    </div>
    <div class="row q-mb-lg">
      <div class="col-12 col-sm-4 text-center">
        <span class="fa fa- btc" aria-hidden="true" style="font-size: 40px;"></span>
        <br />
        <h3 class="q-pb-md">No Fees</h3>
        <p>Selling without any hidden fees. No signup or annual fee.</p>
      </div>

      <div class="col-12 col-sm-4 text-center">
        <span class="fa fa- random" aria-hidden="true" style="font-size: 40px;"></span>
        <br />
        <h3 class="q-pb-md">Privacy</h3>
        <p>
          Sell with privacy. We don't store your personal information. Sell with
          confidence that your information is never sold, distributed, or used without your knowledge.
        </p>
      </div>

      <div class="col-12 col-sm-4 text-center">
        <span class="fa fa- user" aria-hidden="true" style="font-size: 40px;"></span>

        <h3 class="q-pb-md">Build your rep</h3>
        <p>
          With our unique leveling system, you can showcase your achievements and experience. Our profile box
          helps customers have trust in you.
        </p>
      </div>
    </div>

    <div class="row" style="margin-bottom: 100px;">
      <div class="col-12 text-center">
        <q-form class="q-px-sm q-pt-xl" method="POST" @submit="onSubmit">
          <q-toggle  v-model="accept" label="I accept the license and terms" />
          <q-btn type="submit" class="full-width" color="secondary" label="Update" />
        </q-form>
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
  name: 'sell',
  setup () {
    const $q = useQuasar();
  },
  mounted(){
    this.userstatus()
  },
  data () {
    return {
      verification: '',
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
            this.user_admin = response.data.user.admin_role
           if (this.user_admin != 0){
             this.$router.push('/vendor/itemsforsale');
           }
          }
            else 
          {

          }
        })
    },
     async updateuser (payLoad: {
      verification: string;
    })
     {
      await axios({
        method: 'post',
        url: '/vendor/become-vendor',
        data: payLoad,
        withCredentials: true,
        headers: authHeader()
      })
        .then((response) => {
          if (response.status = 200) {

            this.$q.notify({
              type: 'positive',
              message: 'Success! You Are not a vendor',
              position: 'top'
            })
             this.$router.push('/vendor/itemsforsale');
          }
        })
    },
    async onSubmit () {
      console.log('Submitted');
      const payLoad = {
        verification: this.registerForm.username,

      };
      await this.Register(payLoad);
    },
  },
});
</script>
