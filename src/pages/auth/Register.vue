<template>
  <q-page class="docs-input">
    <div class="row justify-center">
      <div class="col-xs-12 col-md-6 col-auto q-pt-xl">
        <q-form class="q-px-sm q-pt-xl" method="POST" @submit="onSubmit">
          <div class="q-gutter-md q-pa-lg formlayout">
            <div class="row">
              <div class="col-xs-12 text-center text-h4">Get Started</div>
            </div>
            <q-input
              outlined
              v-model="registerForm.username"
              label="Username"
              autocomplete="off"
              :dense="registerForm.dense"
            />
              <q-input
              outlined
              v-model="registerForm.display_username"
              label="Display username (Can be changed.  This is what appears to other users.)"
              autocomplete="off"
              :dense="registerForm.dense"
            />
            <q-input
              outlined
              v-model="registerForm.email"
              label="Email"
              autocomplete="off"
              :dense="registerForm.dense"
            />
            <q-input
              outlined
              v-model="registerForm.password"
              label="Password"
              type="password"
              autocomplete="off"
              :dense="registerForm.dense"
            />
            <q-input
              outlined
              v-model="registerForm.password_confirm"
              label="Confirm Password"
              type="password"
              autocomplete="off"
              :dense="registerForm.dense"
            />

            <q-input
              outlined
              v-model="registerForm.pin"
              label="4 Digit Wallet Pin"
              type="password"
              autocomplete="off"
              :dense="registerForm.dense"
            />

            <q-select
              outlined
              v-model="registerForm.country"
              :options="countryList"
              option-value="value"
              option-label="name"
              label="Country"
              :dense="registerForm.dense"
            />
            <q-select
              outlined
              v-model="registerForm.currency"
              :options="currencyList"
              option-value="value"
              option-label="text"
              label="Currency"
              :dense="registerForm.dense"
            />
            <q-space />
            <div class="q-pa-md doc-container">
              <div class="row justify-end">
                <q-btn type="submit" class="full-width" color="secondary" label="Register" />
              </div>
            </div>
            <div class="row">
              <div class="col-xs-12 text-center q-mb-md">
                Already Register?
                <router-link to="/login">Login</router-link>
              </div>

              <div class="col-xs-12 text-center">
                Forgot Password?
                <router-link to="/forgotpassword">Forgot Password</router-link>
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


export default defineComponent({
  name: 'Register',
  // components: {HeaderPlainVue},
  setup () {
    const $q = useQuasar();
    const usercookie = $q.cookies.get('cookie_name')
  },
  data () {
    return {
      isAuthenticated: false,
      currencyList: [],
      countryList: [],
      registerForm: {
        username: '',
        display_username: '',
        email: '',
        pin:'',
        password: '',
        password_confirm: '',
        currency: '',
        country: '',
        dense: ref(true),
      },
    };
  },
  mounted () {
    this.getCountryList();
    this.getCurrencyList();
  },

  methods: {
    async Register (payLoad: {
      display_username: string;
      username: string;
      password: string;
      email: string;
      pin:string;
      country: string;
      currency: string;
    }) {
      const path = '/auth/register';
      axios({
        method: 'post',
        url: path,
        data: payLoad,
        withCredentials: true,
      })
        .then((response) => {
          if (response.data.user) {
            this.$q.cookies.set('auth_user', JSON.stringify(response.data.user),
              { expires: 10, secure: true });
            // localStorage.setItem('auth_token-token', response.data.token)
            this.$q.cookies.set('auth_token', JSON.stringify(response.data.token),
              { expires: 10, secure: true, });

            this.$store.dispatch('user', response.data.user);

            this.$router.push('/');
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 401) {
              this.$q.notify({
                type: 'negative',
                message: 'Error: Unauthorized',
                position: 'top'
              })
              this.$store.commit('loginFailure')

            } else if (error.response.status === 403) {
              this.$q.notify({
                type: 'negative',
                message: 'Error: Forbidden',
                position: 'top'
              })
            } else {
              this.$q.notify({
                type: 'negative',
                message: 'Error: Forbidden',
                position: 'top'
              })
            }
          }
        });
    },
    async getCurrencyList () {
      const path = '/auth/query/currency';

      axios({
        method: 'get', //you can set what request you want to be
        url: path,
        withCredentials: true,
        data: '',
      })
        .then((response) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          this.currencyList = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async getCountryList () {
      const path = '/auth/query/country';
      await axios
        .get(path, { withCredentials: true })
        .then((response) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          this.countryList = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async onSubmit () {
      console.log('Submitted');
      const payLoad = {
        username: this.registerForm.username,
        pin: this.registerForm.pin,
        display_username: this.registerForm.display_username,
        password: this.registerForm.password,
        email: this.registerForm.email,
        currency: this.registerForm.currency,
        country: this.registerForm.country,
      };
      await this.Register(payLoad);
    },
  },
});
</script>


<style type="ts" scoped>
.formlayout {
  max-width: 450px;
  margin: 0 auto;
}
</style>
