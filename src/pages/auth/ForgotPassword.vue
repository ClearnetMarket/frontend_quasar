<template>
  <q-page class="docs-input row justify-center">

    <div class="col-xs-12 col-md-6 col-auto q-pt-xl ">
      <p class="text-center ">
        In order to unlock your account, please enter your account seed below.
      </p>
      <q-form
        class="q-pt-xl "
        method="POST"
        @submit="onSubmit"
      >
        <div class="q-gutter-md  q-pa-lg formlayout">
          <div class="row">
            <div class="col-xs-12 text-center text-h4">
              Unlock Account
            </div>
          </div>
          <q-input
            outlined
            v-model="wordForm.word0"
            label="Word 1"
            autocomplete="off"
            :dense="wordForm.dense"
          />
          <q-input
            outlined
            v-model="wordForm.word1"
            label="Word 2"
            autocomplete="off"
            :dense="wordForm.dense"
          />
          <q-input
            outlined
            v-model="wordForm.word2"
            label="Word 3"
            autocomplete="off"
            :dense="wordForm.dense"
          />
          <q-input
            outlined
            v-model="wordForm.word3"
            label="Word 4"
            autocomplete="off"
            :dense="wordForm.dense"
          />
          <q-input
            outlined
            v-model="wordForm.word4"
            label="Word 5"
            autocomplete="off"
            :dense="wordForm.dense"
          />
          <q-input
            outlined
            v-model="wordForm.word5"
            label="Word 6"
            autocomplete="off"
            :dense="wordForm.dense"
          />
          <div class="q-pa-md doc-container">
            <div class="row justify-end">
              <q-btn
              class="full-width"
                type="submit"
                color="secondary"
                label="Register"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12 text-center q-mb-md">
              Want to Register? <router-link to="/register">Register</router-link>
            </div>

            <div class="col-xs-12 text-center ">
              Login Here <router-link to="/login">Login</router-link>
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
      wordForm: {
        word0: '',
        word1: '',
        word2: '',
        word3: '',
        word4: '',
        word5: '',

        dense: ref(true),
      },
    };
  },

  methods: {
    sendLogin(payLoad: {
      word0: string;
      word1: string;
      word2: string;
      word3: string;
      word4: string;
      word5: string;
    }) {
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
        word0: this.wordForm.word0,
        word1: this.wordForm.word1,
        word2: this.wordForm.word2,
        word3: this.wordForm.word3,
        word4: this.wordForm.word4,
        word5: this.wordForm.word5,
      };
      this.sendLogin(payLoad);
    },
  },
});
</script>


<style type="ts" scoped>
.center_text {
  text-align: center;
  display: inline-block;
}
</style>
