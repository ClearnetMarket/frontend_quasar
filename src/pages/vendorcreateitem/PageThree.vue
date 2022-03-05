<template>
  <q-page class="docs-input">
    <q-breadcrumbs class="text-info q-mt-md q-ml-lg">
      <template v-slot:separator>
        <q-icon size="1.5em" name="chevron_right" color="primary" />
      </template>
      <q-breadcrumbs-el label="Home" icon="home" to="/" />
    </q-breadcrumbs>
    
    <div class="row q-my-md q-pa-lg bordered rcorners1">
      <div class="col-12 font-weight-bold">
        <h5 class="q-ma-none">Item Description</h5>
        <hr />
      </div>
    </div>
    <div class="q-pa-md q-gutter-sm">
      <form autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false">
        <div class="row bordered rcorners1">
          <div class="col-12 font-weight-bold">
            <q-editor toolbar-bg="secondary" ref="editorRef" @paste="onPaste" v-model="editor" />
          </div>
        </div>
      </form>
    </div>
    <div class="q-pa-md doc-container">
      <div class="row justify-end">
          <q-btn type="submit" class color="primary q-mx-md" label="Back to Images" />
        <q-btn type="submit" class color="primary" label="Add Shipping" />
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
  name: 'pagethree',
  setup () {
    const $q = useQuasar();
    return {
      editor: ref('Add your description here')

    }
  },
  data () {
    return {
      CreateItemForm: {
        title: '',

      },
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
        })
    },
    async Register (payLoad: {
      title: string;
      digital_currency_1: string;
      digital_currency_2: string;
      digital_currency_3: string;
      item_condition: string;
      item_count: string;
      category_name_0: string;
      category_id_0: string;
      price: string;
      currency: string;
      keywords: string;
    }) {
      const path = '/vendor-create/create-item-info';
      axios({
        method: 'post',
        url: path,
        data: payLoad,
        withCredentials: true,
      })
        .then((response) => {
          if (response.data.user) {

            this.$router.push('');
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
  }
});
</script>
