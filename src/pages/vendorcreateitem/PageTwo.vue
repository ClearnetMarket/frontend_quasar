<template>
  <q-page class="docs-input">
    <q-breadcrumbs class="text-info q-mt-md q-ml-lg">
      <template v-slot:separator>
        <q-icon size="1.5em" name="chevron_right" color="primary" />
      </template>
      <q-breadcrumbs-el label="Home" icon="home" to="/" />
    </q-breadcrumbs>

    <div class="row q-ma-none">
      <div class="col-12 text-center q-ma-none">
        <h5 class="q-mt-sm">Add Images</h5>
      </div>
    </div>

    <q-form method="post" enctype="multipart/form-data">
      <!-- Top Row-->
      <div class="row q-my-md q-pa-lg bordered rcorners1">
        <div class="col-12 font-weight-bold">
          <h5 class="q-ma-none">Images</h5>
          <hr />
        </div>
        <div class="justify-center col-12 col-sm-6 col-md-3 q-px-lg">
          <q-uploader
            class="col-12 bg-grey-5"
            style="width:100%; min-height: 250px; padding: 10px;"
            :factory="factoryFnMain"
            label="Main Image"
            field-name="boot"
            hide-upload-btn
            auto-upload
            max-file-size="5120000"
            max-files="1"
            use-chips
            dense
            accept=".jpg, .png, .gif"
            @uploaded="onUploaded"
            @failed="onFailed"
            @rejected="onRejected"
          />
        </div>
        <div class="justify-center col-12 col-sm-6 col-md-3 q-px-lg">
          <q-uploader
            class="col-12 bg-grey-5"
            style="width:100%; min-height: 250px; padding: 10px;"
            :factory="factoryFnSecondary"
            label="Secondary Image"
            field-name="boot"
            hide-upload-btn
            auto-upload
            max-file-size="5120000"
            max-files="1"
            use-chips
            dense
            accept=".jpg, .png, .gif"
            @uploaded="onUploaded"
            @failed="onFailed"
            @rejected="onRejected"
          />
        </div>
        <div class="justify-center col-12 col-sm-6 col-md-3 q-px-lg">
          <q-uploader
            class="col-12 bg-grey-5"
            style="width:100%; min-height: 250px; padding: 10px;"
            :factory="factoryFnSecondary"
            label="Secondary Image"
            field-name="boot"
            hide-upload-btn
            auto-upload
            max-file-size="5120000"
            max-files="1"
            use-chips
            dense
            accept=".jpg, .png, .gif"
            @uploaded="onUploaded"
            @failed="onFailed"
            @rejected="onRejected"
          />
        </div>
        <div class="justify-center col-12 col-sm-6 col-md-3 q-px-lg">
          <q-uploader
            class="col-12 bg-grey-5"
            style="width:100%; min-height: 250px; padding: 10px;"
            :factory="factoryFnSecondary"
            label="Secondary Image"
            field-name="boot"
            hide-upload-btn
            auto-upload
            max-file-size="5120000"
            max-files="1"
  
            accept=".jpg, .png, .gif"
            @uploaded="onUploaded"
            @failed="onFailed"
            @rejected="onRejected"
          />
        </div>
      </div>

      <div class="q-pa-md doc-container">
        <div class="row justify-end">
           <q-btn type="submit" class color="primary q-mx-md" label="Back to Info" />
          <q-btn type="submit" class color="primary" label="Add Description" />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts">
/*eslint eqeqeq:0*/
import { defineComponent } from 'vue';
import axios from 'axios';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import authHeader from '../../services/auth.header';
import { mapGetters } from 'vuex';
import { Cookies } from 'quasar';
import baseurl from '../../axios';

export default defineComponent({
  name: 'pagetwo',
  setup () {
    const $q = useQuasar();
  },
  data () {
    return {
    };
  },
  mounted () {
    this.userstatus()
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    factoryFnMain (file) {
      const authtoken = Cookies.get('auth_token')
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            url: 'http://172.23.213.116:5000/vendorcreateitem/create-item-images/main',
            headers: [{ name: 'Authorization', value: 'bearer ' + authtoken }]
          })
        }, 2000)
      })
    },

    factoryFnSecondary (file) {
      const authtoken = Cookies.get('auth_token')
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            url: 'http://172.23.213.116:5000/vendorcreateitem/create-item-images/secondary',
            headers: [{ name: 'Authorization', value: 'bearer ' + authtoken }]
          })
        }, 2000)
      })
    },


    // eslint-disable-next-line no-console
    onUploaded (info) {
      let files = info.files
      files.forEach(item => {
        this.$q.notify({
          type: 'positive',
          message: `${item.name} successfully uploaded`
        })
      })
    },
    // eslint-disable-next-line no-console
    onFailed (info) {
      let err = JSON.parse(info.xhr.response)
      console.log(err)
      let files = info.files
      files.forEach(item => {
        this.$q.notify({
          type: 'negative',
          message: `${item.name} - ${err.error} Error ${err.message}`
        })
      })
    },
    // eslint-disable-next-line no-console
    onRejected (rejectedEntries) {
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
    },
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
          else {
            this.$router.push('/');
          }
        })
    },
  }
});
</script>
