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
        <h5 class="q-mt-sm">My Items for item</h5>
      </div>
    </div>

    <div class="row q-mb-lg">
      <div class="col-12">
        <q-btn color="primary" icon="mode_edit" label="Create New Item" to="/vendor/createitem" />
      </div>
    </div>

    <div v-for="(item, index) in items">
      <div class="row bg-grey-2 rounded-borders q-mb-sm">
        <div class="col-12 col-sm-3 col-pa-sm">
          <q-img spinner-color="white" src="http://picsum.photos/100/100" />
        </div>
        <div class="col-12 col-sm-9 col-md-7 q-px-lg q-py-md">
          <div class="col-12 text-h6">{{ item.item_title }}</div>

          <q-rating
            v-model="item.item_rating"
            max="5"
            size="sm"
            color="yellow-4"
            icon="star_border"
            icon-selected="star"
            icon-half="star_half"
            readonly
          />
          <div class="col-12">Total Sold: {{ item.total_sold }}</div>
          <div class="col-12">Total Views: {{ item.view_count }}</div>
          <div class="col-12">Total Views: {{ item.review_count }}</div>
        </div>
        <div class="col-12 col-sm-12 col-md-2 col-pa-sm">
          <div class="col-12">
            <q-btn
              class="btn-fixed-width q-my-sm"
              color="primary"
              text-color="white"
              label="Edit item"
               v-on:click="gotoitem(item.uuid)"
            />
          </div>
          <div class="col-12">
            <q-btn
              class="btn-fixed-width q-my-sm"
              color="accent"
              text-color="white"
              label="Clone Item"
              v-on:click="cloneitem(item.uuid)"
            />
          </div>
          <div class="col-12">
            <q-btn
              class="btn-fixed-width q-my-sm"
              color="red-14"
              text-color="white"
              label="Delete Item"
                v-on:click="deleteitem(item.uuid)"
            />
          </div>
        </div>
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
  name: 'forsale',
  setup () {
    const $q = useQuasar();
  },
  mounted () {
    this.getvendoritems();


  },
  data () {
    return {
      items: [],

      accept: ref(false),
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    gotoitem(itemid){
      this.$router.push({name:'edititem', params: {id: itemid }});  
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
            this.$router.push("/login")
          }
        })
    },
    async getvendoritems () {
      await axios({
        method: 'get',
        url: '/vendorcreate/itemsforsale',
        withCredentials: true,
        headers: authHeader()
      })
        .then((response) => {
          if (response.status = 200) {
            this.items = response.data
         
          }
        })
    },
      async cloneitem (itemid) {
      await axios({
        method: 'get',
        url: '/vendorcreate/clone-item/' + itemid,
        withCredentials: true,
        headers: authHeader()
      })
        .then((response) => {
          if (response.status = 200) {
            this.getvendoritems();
              this.$q.notify({
              type: 'positive',
              message: 'Successfully cloned item.',
              position: 'top'
            })
          }else{
               this.$q.notify({
              type: 'negative',
              message: 'Error cloning item.',
              position: 'top'
            })
          }
        })
    },
      async deleteitem (itemid) {
      await axios({
        method: 'delete',
        url: '/vendorcreate/delete-item/' + itemid,
        withCredentials: true,
        headers: authHeader()
      })
        .then((response) => {
          if (response.status = 200) {
             this.getvendoritems();
              this.$q.notify({
              type: 'positive',
              message: 'Successfully deleted item.',
              position: 'top'
            })
          }else{
               this.$q.notify({
              type: 'negative',
              message: 'Error deleting item.',
              position: 'top'
            })
          }
        })
    },
  }
});
</script>
