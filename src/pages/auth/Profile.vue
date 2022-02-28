<template>
<div class="col-xs-12 text-center q-mb-md">
    <h3 v-if="user">{{ user.user_name }}</h3>
    <h3 v-if="user"></h3>
    {{ user.user_id }}
    {{ msg }}
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';
import axios from 'axios';
import { useQuasar } from 'quasar';
import authHeader from '../../services/auth.header';


export default defineComponent({
  name: 'Home',
  setup () {
    const $q = useQuasar()
  },

  data () {
    return {
      token: this.allCookies,
      msg: this.msg
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    sendRequest () {
      axios({
        method: 'get',
        url: '/index',
        withCredentials: true,
        headers: authHeader()
      })
        .then((response) => {
          if (response.status == 200) {
            this.msg = response.data;
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 401) {
              this.$router.push('/login');
              this.$q.notify({
                type: 'negative',
                message: 'Error: Unauthorized',
                position: 'top'
              })

            }
            else if (error.response.status === 403) {
              this.$router.push('/login');
              this.$q.notify({
                type: 'negative',
                message: 'Error: Forbidden',
                position: 'top'
              })

            } else {
              this.$router.push('/login');
              this.$q.notify({
                type: 'negative',
                message: 'Error',
              })
            }
          }
        })
    }
  },
  created () {
    this.sendRequest();
  },
});

</script>


<style type="ts" scoped>
</style>