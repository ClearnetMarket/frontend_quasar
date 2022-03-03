<template>
  <q-page class="docs-input">

    <q-breadcrumbs class="text-info q-mt-md q-ml-lg">
      <template v-slot:separator>
        <q-icon size="1.5em" name="chevron_right" color="primary" />
      </template>
      <q-breadcrumbs-el label="Home" icon="home" to="/" />
      <q-breadcrumbs-el label="Account" icon="person" to="/account" />
    </q-breadcrumbs>
    <div class="row justify-center">
      <div class="col-xs-12 col-sm-6 col-md-6 q-pt-xs">
        <div class="text-center">
          <h5>Change Profile Information</h5>
        </div>

        <div class="col-xs-12 col-sm-6 col-md-6 q-py-sm q-pl-sm">Welcome {{ user_email }}</div>
        <div class="col-xs-12 col-sm-6 col-md-6 q-py-sm q-pl-sm">Email: {{ user_name }}</div>
        <q-form class="q-px-sm q-pt-xs" method="POST" @submit="onSubmit">
          <div class="q-gutter-md formlayout">
            <q-select
              outlined
              v-model="country"
              :options="countryList"
              option-value="id"
              option-label="name"
              label="Country"
              :dense="dense"
            />
            <q-select
              outlined
              v-model="currency"
              :options="currencyList"
              option-value="id"
              option-label="text"
              label="Currency"
              :dense="dense"
            />
            <q-space />
            <div class="q-pa-md doc-container">
              <div class="row justify-end">
                <q-btn type="submit" class="full-width" color="secondary" label="Update" />
              </div>
            </div>
          </div>
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
import authHeader from '../../../services/auth.header';
import { mapGetters } from 'vuex';


export default defineComponent({
  name: 'Login',
  components: {},

  setup (){
    const $q = useQuasar();
  },

  data () {
    return {
      currencyList: [],
      countryList: [],
      currencydefault: '',
      countrydefault: '',
      currency: '',
      country: '',
      user_email: '',
      user_name:'',
      dense: ref(true),
    };
  },

  computed: {
    ...mapGetters(['user']),
  },

  mounted () {
    this.userstatus()
    this.getCountryList();
    this.getCurrencyList();
    this.getuserinfo();
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
            this.user_email = response.data.user.user_email
            this.user_name = response.data.user.user_name
          }
            else 
          {

          }
        })
    },
    async updateuser (payLoad: {
      country: string;
      currency: string;
    })
     {
      await axios({
        method: 'put',
        url: '/info/user-info-update',
        data: payLoad,
        withCredentials: true,
        headers: authHeader()
      })
        .then((response) => {
          if (response.status = 200) {

            this.$q.notify({
              type: 'positive',
              message: 'Success!  Updated your profile',
              position: 'top'
            })
          }
        })
    },
    async getuserinfo () {
      await axios({
        method: 'get',
        url: '/info/country-currency',
        withCredentials: true,
        headers: authHeader()
      })
        .then((response) => {
          if (response.status = 200) {
            this.currencydefault = response.data.currency;
            this.countrydefault = response.data.country;
            this.country = this.countrydefault;
            this.currency = this.currencydefault;
          }
        })
    },
    async getCurrencyList () {
      const path = '/auth/query/currency';

      await axios({
        method: 'get', //you can set what request you want to be
        url: path,
        withCredentials: true,
        data: '',
      })
        .then((response) => {
          this.currencyList = response.data;
        })
        .catch((error) => {

        });
    },
    async getCountryList () {
      const path = '/auth/query/country';
      await axios
        .get(path, { withCredentials: true })
        .then((response) => {

          this.countryList = response.data;
        })
        .catch((error) => {
        });
    },
    async onSubmit () {
      const payLoad = {
        currency: this.currency,
        country: this.country,
      };
      await this.updateuser(payLoad);

    },

  },
});
</script>


<style type="ts" scoped>
.bordered {
  border-style: solid;
  border-width: 1px;
  border-color: #eeeeee;
}
.bordered {
  border-style: solid;
  border-width: 1px;
  border-color: #a7a0a0;
}
.rcorners1 {
  border-radius: 15px;
}
.greyhover:hover {
  background-color: #eeeeee;
}
.wordcolor {
  color: #6b6565;
}
</style>
