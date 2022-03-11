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

        

        <q-form method="post" @submit="onSubmit">
           
                <div class="col-12 col-sm-12">
                    Bch Address
                    <q-input
                        outlined
                        v-model="wallet.bch_address"
                        label="Destination BCH Address"
                        autocomplete="off"
                        :dense="dense"
                        :rules="[
                            $rules.required('Title is Required'),
                            $rules.minLength(25, 'Your address is incorrect'),
                            $rules.maxLength(100, 'Your address is incorrect')
                        ]"
                        lazy-rules
                    />
                </div>
           
                <div class="col-12 col-sm-12">
                    Description
                    <q-input
                        outlined
                        v-model="wallet.bch_address"
                        label="Transaction Description"
                        autocomplete="off"
                        :dense="dense"
                        :rules="[
                            $rules.minLength(2, 'Your description should have at least 2 characters'),
                            $rules.maxLength(250, 'Your description should not be larger than 250 letters')
                        ]"
                        lazy-rules
                    />
                </div>
                <div class="col-12" style="max-width:200px">
                    Amount
                    <q-input
                        outlined
                        v-model="wallet.bch_amount"
                        label="Amount in BCH"
                        autocomplete="off"
                        mask="#.########"
                        fill-mask="0"
                        :dense="dense"
                        :rules="[
                            $rules.required('Amount is Required'),
                            $rules.numeric('Numbers only'),
                        
                        ]"
                        lazy-rules
                    />
                </div>
                <div class="col-12 col-sm-12" style="max-width:200px">
                    Wallet Pin
                    <q-input
                        outlined
                        v-model="wallet.pin"
                        label="Wallet Pin"
                        autocomplete="off"
                        :dense="dense"
                        :rules="[
                            $rules.required('Pin is Required'),
                            $rules.minLength(4, 'Your pin should be 4 numbers'),
                            $rules.maxLength(4, 'Your pin should be 4 numbers')
                        ]"
                        lazy-rules
                    />
                </div>
      
            <div class="q-pa-md doc-container">
                <div class="row justify-end">
                    <q-btn type="submit" class color="accent" label="Send Coin" />
                </div>
            </div>
        </q-form>
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
    name: 'bchsend',
    setup () {
        const $q = useQuasar();
    },
    mounted () {
        this.userstatus()
    },
    data () {
        return {
            dense: ref(true),
            wallet: {
                bch_address: '',
                bch_decscription: '',
                bch_amount: '',
                pin: '',
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
                                .catch((error)=>{
                this.$router.push("/login")
            })
        },
        async SendCoin (payLoad: {
            bch_address: string,
            bch_decscription: string,
            bch_amount: string,
            pin: string,
        }) {
            await axios({
                method: 'post',
                url: '/bch/send',
                data: payLoad,
                withCredentials: true,
                headers: authHeader()
            })
                .then((response) => {
                    if (response.status = 200) {
                        const message_sent = 'Success! Sent ' + this.wallet.bch_amount + ' to ' + this.wallet.bch_address
                        this.$q.notify({
                            type: 'positive',
                            message: message_sent,
                            position: 'top'
                        })
                        this.$router.push('/vendor/itemsforsale');
                    }
                })
        },
        async onSubmit () {

            const payLoad = {
                bch_address: this.wallet.bch_address,
                bch_decscription: this.wallet.bch_decscription,
                bch_amount: this.wallet.bch_amount,
                pin: this.wallet.pin,
            };
            await this.SendCoin(payLoad);
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