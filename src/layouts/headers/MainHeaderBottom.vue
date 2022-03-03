<template>
    <div class="row text-center bg-primary text-white font-weight-bold q-pa-none q-ma-">
        <div class="col-xs-6 col-sm-auto">
            <div class="q-px-sm q-py-none">
                <q-btn-dropdown flat
                    color="none"
                    push
                    no-caps
                    icon="fas fa-align-justify"
                    label="Categories "
                >
                    <q-list>
                        <q-item
                            clickable
                            v-close-popup
                            v-for="item in categoriesList"
                            v-bind:key="item.id"
                        >
                            <q-item-section>
                                <q-item-label>{{ item.name }}</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-btn-dropdown>
            </div>
        </div>
        <div class="col-xs-6 col-sm-auto">
            <div class="q-px-sm q-py-none">
                <q-btn-dropdown flat
                    color="none"
                    push
                    no-caps
                    icon="fab fa-bitcoin"
                    label="Wallets"
                >
                    <q-list>
                        <q-item clickable v-close-popup to="/wallet/btc">
                            <q-item-section avatar>
                                <q-img
                                    src="../../assets/coin/btc/btc_small_21.png"
                                    style="max-width: 25px"
                                    :ratio="1"
                                />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Bitcoin</q-item-label>
                                <!-- <q-item-label caption>{{ btcbalance }}</q-item-label> -->
                            </q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup to="/wallet/bch">
                            <q-item-section avatar>
                                <q-img
                                    src="../../assets/coin/bch/bch_small1.png"
                                    style="max-width: 25px"
                                    :ratio="1"
                                />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Bitcoin Cash</q-item-label>
                                <!-- <q-item-label caption>{{ bchbalance }}</q-item-label> -->
                            </q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup to="/wallet/xmr">
                            <q-item-section avatar>
                                <q-img
                                    src="../../assets/coin/xmr/xmr_small.png"
                                    style="max-width: 25px"
                                    :ratio="1"
                                />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Monero</q-item-label>
                                <!-- <q-item-label caption>{{ xmrbalance }}</q-item-label> -->
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-btn-dropdown>
            </div>
        </div>

        <div class="col-grow gt-sm"></div>
        <div class="col-auto q-px-lg q-pt-sm text-no-wrap gt-sm">
            <q-img src="../../assets/coin/btc/btc_small_21.png" style="max-width: 25px" :ratio="1" />
            {{ btcprice }}
        </div>
        <div class="col-auto q-px-lg q-pt-sm text-no-wrap gt-sm">
            <q-img src="../../assets/coin/xmr/xmr_small.png" style="max-width: 25px" :ratio="1" />
            {{ xmrprice }}
        </div>
        <div class="col-auto q-px-lg q-pt-sm q-mr-xl text-no-wrap gt-sm">
            <q-img src="../../assets/coin/bch/bch_small1.png" style="max-width: 25px" :ratio="1" />
            {{ bchprice }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import axios from 'axios';


export default defineComponent({
    name: 'MainHeaderBottom',
    data () {
        return {
            btcprice: null,
            xmrprice: null,
            bchprice: null,

            // btcbalance: null,
            // xmrbalance: null,
            // bchbalance: null,

            categoriesList: {},
        }
    },
    computed: {
        ...mapGetters(['user']),
    },
    mounted () {
        this.getbtcprice();
        this.getbchprice();
        this.getxmrprice();

        // this.getxmrbalance();
        // this.getbchbalance();
        // this.getbtcbalance();

        this.getCategoryList();
    },

    methods: {
        //  Get prices of current coins
        async getxmrprice () {
            await axios({
                method: 'get',
                url: '/xmr/price',
            })
                .then((response) => {
                    if (response.data) {
                        this.xmrprice = response.data.price_xmr_usd
                    }
                })
        },
        async getbchprice () {
            await axios({
                method: 'get',
                url: '/bch/price',
            })
                .then((response) => {
                    if (response.data) {
                        this.bchprice = response.data.bch_price_usd
                    }
                })
        },
        async getbtcprice () {
            await axios({
                method: 'get',
                url: '/btc/price',
            })
                .then((response) => {
                    if (response.data) {
                        this.btcprice = response.data.btc_price_usd
                    }
                })
        },
        // //  Get balances for dropdowns
        // async getxmrbalance () {
        //     await axios({
        //         method: 'get',
        //         url: '/xmr/balance',
        //     })
        //         .then((response) => {
        //             if (response.data) {
        //                 this.xmrbalance = response.data.xmr_balance
        //             }
        //         })
        // },

        // async getbchbalance () {
        //     await axios({
        //         method: 'get',
        //         url: '/bch/balance',
        //     })
        //         .then((response) => {
        //             if (response.data) {
        //                 this.bchbalance = response.data.bch_balance
        //             }
        //         })
        // },
        // async getbtcbalance () {
        //     await axios({
        //         method: 'get',
        //         url: '/btc/balance',
        //     })
        //         .then((response) => {
        //             if (response.data) {
        //                 this.btcbalance = response.data.btc_balance
        //             }
        //         })
        // },
        async getCategoryList () {
            const path = '/category/sidebar';
            await axios
                .get(path, { withCredentials: true })
                .then((response) => {
                    this.categoriesList = response.data;
                })
                .catch((error) => {

                });
        },


        logout () {
            localStorage.clear();
            this.$store.dispatch('user', null);
            this.$q.cookies.remove('user_token')
            this.$q.cookies.remove('auth_token')
            this.$q.notify({
                type: 'negative',
                message: 'You are now logged out.',
                badgeStyle: 'opacity: 0',
                position: 'top',
            });
        },
    },
});
</script>
