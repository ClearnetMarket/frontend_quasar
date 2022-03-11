<template>
    <q-page class="docs-input widthstyle">
        <q-breadcrumbs class="text-info q-mt-md q-ml-lg">
            <template v-slot:separator>
                <q-icon size="1.5em" name="chevron_right" color="primary" />
            </template>
            <q-breadcrumbs-el label="Home" icon="home" to="/" />
        </q-breadcrumbs>

        <q-tabs v-model="tab" class="text-orange-9 q-mb-sm">
            <q-route-tab to="/wallet/bch" name="transactions" icon="toc" label="Transactions" />
            <q-route-tab to="/wallet/bch/recieve" name="receieve" icon="unarchive" label="Recieve" />
            <q-route-tab to="/wallet/bch/send" name="send" icon="send" label="Send" />
        </q-tabs>

        <div class="row">
            <div class="col-12 col-sm-3"></div>
            <div class="col-12 col-sm-6">
                <q-img src="../../../assets/coin/bch/bch_logo_long.png" />
            </div>
                    <div class="col-12 col-sm-3"></div>
        </div>

    
    </q-page>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import axios from 'axios';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import authHeader from '../../../services/auth.header';
import { mapGetters } from 'vuex';


export default defineComponent({
    name: 'bchtransactions',
    setup () {
        const $q = useQuasar();
    },
    mounted () {
        this.userstatus()
    },
    data () {
        return {
            dense: ref(true),
          
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
                                .catch((error)=>{
                this.$router.push("/login")
            })
        },
       
    },
});
</script>


<style type="ts" scoped>
.widthstyle {
    max-width: 900px;
    margin: 0 auto;
}
.bordered {
    border-style: solid;
    border-width: 1px;
    border-color: #f0f2f2;
}
.bordered {
    border-style: solid;
    border-width: 1px;
    border-color: #a7a0a0;
}
.rcorners1 {
    border-radius: 5px;
}
.greyhover:hover {
    background-color: #eeeeee;
}
.wordcolor {
    color: #6b6565;
}
.rcorners1 {
    border-radius: 5px;
}
.greyhover:hover {
    background-color: #eeeeee;
}
.wordcolor {
    color: #6b6565;
}
</style>