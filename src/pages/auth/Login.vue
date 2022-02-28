<template>
  <q-layout view="hHh lpR fFf">
    <HeaderPlain />

    <q-page class="docs-input row justify-center">
      <div class="col-xs-12 col-sm-6 col-md-4 col-auto q-pt-xl">
        <q-form class="q-px-sm q-pt-xl" method="POST" @submit="onSubmit">
          <div class="q-gutter-md q-pa-lg formlayout">
            <div class="row">
              <div class="col-xs-12 text-center text-h4">Log In</div>
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
              type="password"
              v-model="loginForm.password"
              label="Password"
              autocomplete="off"
              :dense="loginForm.dense"
            />
            <q-space />
            <div class="q-pa-md doc-container">
              <div class="row justify-end">
                <q-btn type="submit" class="full-width" color="secondary" label="Login" />
              </div>
            </div>
            <div class="row">
              <div class="col-xs-12 text-center q-mb-md">
                Want to Register?
                <router-link to="/register">Register</router-link>
              </div>

              <div class="col-xs-12 text-center">
                Forgot Password?
                <router-link to="/register">Forgot Password</router-link>
              </div>
            </div>
          </div>
        </q-form>
      </div>
    </q-page>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>


<script lang="ts">

import { defineComponent } from 'vue';
import axios from 'axios';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import HeaderPlain from '../../layouts/headers/Plain.vue'


export default defineComponent({
  name: 'Login',
  components: { HeaderPlain },
  setup () {
    const $q = useQuasar();

  },
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        dense: ref(true),
      },
    };
  },

  methods: {
    sendLogin (payLoad: { username: string; password: string }) {
      axios({
        method: 'post',
        url: '/auth/login',
        data: payLoad,
      })
        .then((response) => {
          if (response.data.user) {
            this.$q.cookies.set('user_token', JSON.stringify(response.data.user),
              { expires: 10, secure: true });
            this.$q.cookies.set('auth_token', JSON.stringify(response.data.token),
              { expires: 10, secure: true });
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
                message: 'Error',
              })
            }
          }
        });
    },
    onSubmit () {
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
