<template>
    <q-page class="docs-input">
        <q-breadcrumbs class="text-info q-mt-md q-ml-lg">
            <template v-slot:separator>
                <q-icon size="1.5em" name="chevron_right" color="primary" />
            </template>
            <q-breadcrumbs-el label="Home" icon="home" to="/" />
        </q-breadcrumbs>


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
    name: 'pagefour',
    setup () {
        const $q = useQuasar();
    },
    data () {
        return {
            CreateItemForm: {
            title: '',
            digital_currency_1: '',
            digital_currency_2: '',
            digital_currency_3: '',
            item_condition: '',
            item_count: '',
            category_name_0: '',
            category_id_0: '',
            price: '',
            currency: '',
            keywords: '',
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
