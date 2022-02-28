<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <router-link to="/">Clearnet Market</router-link>
        </q-toolbar-title>
        <div v-if="user">
          <q-btn @click="logout()" class="q-ma-sm" color="secondary" label="Logout" />
        </div>
        <div v-if="!user">
          <q-btn href="/login" class="q-ma-sm" color="None" label="Sign In" />
          <q-btn href="/register" class="q-ma-sm" color="secondary" label="Register" />
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'HeaderPlain',
  setup () {
    const $q = useQuasar();
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    logout () {
      this.$q.cookies.remove('user_token')
      this.$q.cookies.remove('auth_token')
      this.$store.dispatch('user', null);
      this.$router.push({ name: 'home' })

    }
  }
});
</script>
