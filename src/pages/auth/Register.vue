<template>

  <q-page class="docs-input row justify-center">

    <div class="col-xs-12 col-md-6 col-auto q-pt-xl ">
      <q-form
        class="q-px-sm q-pt-xl"
        method="POST"
        @submit="onSubmit"
      >
        <div class="q-gutter-md  q-pa-lg formlayout">
          <div class="row">
            <div class="col-xs-12 text-center text-h4">
              Get Started
            </div>
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
            v-model="registerForm.email"
            label="Email"
            autocomplete="off"
            :dense="registerForm.dense"
          />
          <q-input
            outlined
            v-model="registerForm.password"
            label="Password"
            autocomplete="off"
            :dense="registerForm.dense"
          />
          <q-input
            outlined
            v-model="registerForm.password_confirm"
            label="Confirm Password"
            autocomplete="off"
            :dense="registerForm.dense"
          />

          <q-select
            outlined
            v-model="registerForm.country"
            :options="countryList"
            option-value="id"
            option-label="name"
            label="Country"
            :dense="registerForm.dense"
          />
          <q-select
            outlined
            v-model="registerForm.currency"
            :options="currencyList"
            option-value="id"
            option-label="text"
            label="Currency"
            :dense="registerForm.dense"
          />
          <q-space />
          <div class="q-pa-md doc-container">
            <div class="row justify-end">
              <q-btn
                type="submit"
                class="full-width"
                color="secondary"
                label="Register"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 text-center q-mb-md">
              Already Register? <router-link to="/login">Login</router-link>
            </div>

            <div class="col-xs-12 text-center ">
              Forgot Password? <router-link to="/forgotpassword">Forgot Password</router-link>
            </div>
          </div>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { ref } from 'vue';

// import HeaderPlainVue from 'src/layouts/HeaderPlain.vue';

export default defineComponent({
  name: 'Register',
  // components: {HeaderPlainVue},


  data() {
    return {
      isAuthenticated: false,
      currencyList: [],
      countryList: [],
      registerForm: {
        username: '',
        email: '',
        password: '',
        password_confirm: '',
        currency: '',
        country: '',
        dense: ref(true),
      },
    };
  },
  mounted() {
    this.getCountryList();
    this.getCurrencyList();
  },

  methods: {
    async Register(payLoad: {
      username: string;
      password: string;
      email: string;
      country: string;
      currency: string;
    })
     {
      const path = 'http://172.24.211.176:5005/auth/register';
      await axios
        .post(path, payLoad, { withCredentials: false })
        .then((response) => {
          let data =  response.data.login
           console.log(data);
          if (data == true)
            {this.isAuthenticated = true;}

          else
            {this.isAuthenticated = false;}
            console.log("Error");

        })
        .catch((error) => {
          console.error(error);
        });
    },
    async getCurrencyList()  {
      const path = 'http://172.24.211.176:5005/auth/query/currency';
      await axios
        .get(path, { withCredentials: false })
        .then((response) => {
          console.log(response.data);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          this.currencyList = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async getCountryList() {
      const path = 'http://172.24.211.176:5005/auth/query/country';
      await axios
        .get(path, { withCredentials: false })
        .then((response) => {
          console.log(response.data);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          this.countryList = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async onSubmit() {
      console.log('Submitted');
      const payLoad = {
        username: this.registerForm.username,
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
