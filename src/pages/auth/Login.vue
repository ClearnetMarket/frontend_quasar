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
              Log In
            </div>
          </div>
          <q-input
            outlined
            v-model="loginForm.username"
            label="Username"
            autocomplete="off"
            :dense="loginForm.dense"
          />
          <q-input
            outlined
            v-model="loginForm.password"
            label="Password"
            autocomplete="off"
            :dense="loginForm.dense"
          />
          <q-space />
          <div class="q-pa-md doc-container">
            <div class="row justify-end">
              <q-btn
                type="submit"
                class="full-width"
                color="secondary"
                label="Login"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 text-center q-mb-md">
              Want to Register? <router-link to="/register">Register</router-link>
            </div>

            <div class="col-xs-12 text-center ">
              Forgot Password? <router-link to="/register">Forgot Password</router-link>
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
  name: 'Login',
  // components: {HeaderPlainVue},

  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        dense: ref(true),
      },
    };
  },

  methods: {
    sendLogin(payLoad: { username: string; password: string }) {
      const path = ' http://172.24.211.176:5005/auth/login';

      axios
        .post(path, payLoad, { withCredentials: false })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onSubmit() {
      console.log('Submitted');
      const payLoad = {
        username: this.loginForm.username,
        password: this.loginForm.password,
      };
      this.sendLogin(payLoad);
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
