<template>


</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'Home',

  setup () {
    const $q = useQuasar();
  },
  mytoken () {

  },
  data () {
    return {
      token: null
    };
  },
  computed: {
    ...mapGetters(['user']),
  },

  methods: {

  },
});

</script>


<style type="ts" scoped>
</style>