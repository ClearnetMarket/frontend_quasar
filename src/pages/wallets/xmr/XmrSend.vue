<template>
    <q-page class="docs-input widthstyle">
        <q-breadcrumbs class="text-info q-mt-md q-ml-lg">
            <template v-slot:separator>
                <q-icon size="1.5em" name="chevron_right" color="primary" />
            </template>
            <q-breadcrumbs-el label="Home" icon="home" to="/" />
        </q-breadcrumbs>

        <q-tabs v-model="tab" class="text-orange-9 q-mb-sm">
            <q-route-tab to="/wallet/xmr" name="transactions" icon="toc" label="Transactions" />
            <q-route-tab to="/wallet/xmr/recieve" name="receieve" icon="unarchive" label="Recieve" />
            <q-route-tab to="/wallet/xmr/send" name="send" icon="send" label="Send" />
        </q-tabs>

        <div class="row">
            <div class="col-12 col-sm-3"></div>
            <div class="col-12 col-sm-6">
                <q-img src="../../../assets/coin/xmr/xmr_logo_long.png" />
            </div>
            <div class="col-12 col-sm-3"></div>
        </div>

        <q-form method="post" @submit="onSubmit">
           
                <div class="col-12 col-sm-12">
                    XMR Address
                    <q-input
                        outlined
                        v-model="wallet.xmr_address"
                        label="Destination XMR Address"
                        autocomplete="off"
                        :dense="dense"
                        :rules="[
                            $rules.required('Address is Required'),
                            $rules.minLength(50, 'Your address is incorrect'),
                            $rules.maxLength(150, 'Your address is incorrect')
                        ]"
                        lazy-rules
                    />
                </div>

                <div class="col-3 col-sm-3" style="max-width:200px">
                    Amount
                    <q-input
                        outlined
                        v-model="wallet.xmr_amount"
                        label="Amount in XMR"
                        autocomplete="off"
                        mask="#.############"
                        fill-mask="0"
                        :dense="dense"
                        :rules="[
                            $rules.required('Amount is Required'),
                            $rules.numeric('Numbers only'),
                        
                        ]"
                        lazy-rules
                    />
                </div>
                   <div class="col-3 col-sm-3" style="max-width:200px">
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
    name: 'xmrsell',
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
                xmr_address: '',
                xmr_decscription: '',
                xmr_amount: '',
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
                    else {
                        this.$router.push("/login")
                    }
                })
        },
        async SendCoin (payLoad: {
            xmr_address: string,
            xmr_decscription: string,
            xmr_amount: string,
            pin: string,
        }) {
            await axios({
                method: 'post',
                url: '/xmr/send',
                data: payLoad,
                withCredentials: true,
                headers: authHeader()
            })
                .then((response) => {
                    if (response.status = 200) {
                        const message_sent = 'Success! Sent ' + this.wallet.xmr_amount + ' to ' + this.wallet.xmr_address
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
                xmr_address: this.wallet.xmr_address,
                xmr_decscription: this.wallet.xmr_decscription,
                xmr_amount: this.wallet.xmr_amount,
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