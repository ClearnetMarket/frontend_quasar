<template>
    <q-page class="docs-input widthstyle">
        <q-breadcrumbs class="text-info q-mt-md q-ml-lg">
            <template v-slot:separator>
                <q-icon size="1.5em" name="chevron_right" color="primary" />
            </template>
            <q-breadcrumbs-el label="Home" icon="home" to="/" />
        </q-breadcrumbs>

        <q-tabs v-model="tab" class="text-orange-9 q-mb-sm">
            <q-route-tab to="/wallet/btc" name="transactions" icon="toc" label="Transactions" />
            <q-route-tab to="/wallet/btc/recieve" name="receieve" icon="unarchive" label="Recieve" />
            <q-route-tab to="/wallet/btc/send" name="send" icon="send" label="Send" />
        </q-tabs>
        <div class="row">
            <div class="col-12 col-sm-3"></div>
            <div class="col-12 col-sm-6">
                <q-img src="../../../assets/coin/btc/btc_logo_long.png" />
            </div>
            <div class="col-12 col-sm-3"></div>
        </div>

        <div class="q-mt-md bg-grey-3">
            *Transactions are processed in the order received and can take a bit of time
            to show depending on volume.
            <div class>Green: Deposit</div>
            <div class>Red: Withdrawl</div>
            <div class>Blue: Recieved BTC</div>
            <div class>Orange: Sent BTC</div>

            <div class="row">
                <div class="col-12">
                    White: Pending
                    <strong>Confirmed at 6 Confirmations</strong>
                </div>
            </div>
        </div>

        <div v-if="transactions">
            <!--#1 = Wallet created -->
            <!--#2 = Withdrawl -->
            <!--#3 = Deposit -->
            <!--#4 = send coin to escrow -->
            <!--#5 = send coin to user -->
            <!--#6 = clearnet_webapp profit -->
            <!--#7 = sent coin to holdings -->
            <!--#8 = sent coin from holdings -->
            <div class="row q-pa-md">
                <div class="col-3">Time</div>
                <div class="col-3">Description</div>
                <div class="col-3">Amount</div>
                <div class="col-3">Balance</div>
            </div>
            <div v-for="t in transactions">
                <!-- Wallet Created -->
                <div
                    v-if="t.category === 1"
                    class="row bg-white q-ma-sm bordered rcorners1 q-pa-md"
                    :key="t.id"
                    :name="t.id"
                >
                    <div class="col-3">{{ relativeDate(t.created) }}</div>
                    <div class="col-3">Wallet Created</div>
                    <div class="col-3">--</div>
                    <div class="col-3">Balance: 0 </div>
                </div>
                <!-- WithDrawl -->
                <div
                    v-if="t.category === 2"
                    class="row bg-red-5 q-ma-sm bordered rcorners1 q-pa-md"
                    :key="t.id"
                    :name="t.id"
                >
                    <div class="col-3">{{ relativeDate(t.created) }}</div>
                    <div class="col-3">
                        <div class="row">
                            <div class="col-12">Withdrawl</div>
                            <div class="col-12">Fee: {{ t.fee }}</div>
                            <div class="col-12">TXID: {{ t.txid }}</div>
                            <div class="col-12">Comment: {{ t.commentbtc }}</div>
                        </div>
                    </div>
                    <div class="col-3">-{{ t.amount }}</div>
                    <div class="col-3">Balance: {{t.balance}}</div>
                </div>
                <!--#3 = Deposit -->
                <div
                    v-if="t.category === 3"
                    class="row bg-green-6 q-ma-sm bordered rcorners1 q-pa-md"
                    :key="t.id"
                    :name="t.id"
                >
                    <div class="col-3">{{ relativeDate(t.created) }}</div>
                    <div class="col-3">
                        <div class="row">
                            <div class="col-12">Deposit</div>
                            <div v-if="t.confirmations >= 6">
                                <div class="col-12">Confirmed</div>
                            </div>
                            <div v-else>
                                <div class="col-12">UnConfirmed: {{ t.confirmations }}</div>
                            </div>
                            <div class="col-12">TXID: {{ t.txid }}</div>
                        </div>
                    </div>
                    <div class="col-3">{{ t.amount }}</div>
                       <div class="col-3">
                           <div v-if="t.confirmed === 0">
                            <div v-if="t.balance - t.amount === 0">
                                0 + {{ t.amount }}
                            </div>
                            <div v-else>
                                  {{ t.balance - t.amount }} + {{ t.amount }}
                            </div>
                            <div v-else>
                                 {{ t.balance }}
                            </div>
                           </div>
                       </div>
                </div>
                <!--#4 = send coin to escrow -->
                <div
                    v-if="t.category === 4"
                    class="row bg-orange-5 q-ma-sm bordered rcorners1 q-pa-md"
                    :key="t.id"
                    :name="t.id"
                >
                    <div class="col-3">{{ relativeDate(t.created) }}</div>
                    <div class="col-3">
                        <div class="row">
                            <div class="col-12">Transaction</div>
                            <div v-if="t.orderid">
                                <router-link
                                    class="linkcolor_shopping"
                                    :to="{ name: 'item', params: { id: t.orderid } }"
                                >Transaction Order # {{ t.orderid }}</router-link>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">-{{ t.amount }}</div>
                    <div class="col-3">{{t.balance}}</div>
                </div>
                <!--#5 = sent coin to user -->
                <div
                    v-if="t.category === 5"
                    class="row bg-orange-5 q-ma-sm bordered rcorners1 q-pa-md"
                    :key="t.id"
                    :name="t.id"
                >
                    <div class="col-3">{{ relativeDate(t.created) }}</div>
                    <div class="col-3">
                        <div class="row">
                            <div class="col-12">Transaction</div>
                            <div v-if="t.orderid">
                                <router-link
                                    class="linkcolor_shopping"
                                    :to="{ name: 'item', params: { id: t.orderid } }"
                                >Transaction Order # {{ t.orderid }}</router-link>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">{{ t.amount }}</div>
                         <div class="col-3">{{t.balance}}</div>
                </div>
                <!--#6 = clearnet_webapp profit -->
                <div
                    v-if="t.category === 6"
                    class="row bg-blue-6 q-ma-sm bordered rcorners1 q-pa-md"
                    :key="t.id"
                    :name="t.id"
                >
                    <div class="col-3">{{ relativeDate(t.created) }}</div>
                    <div class="col-3">
                        <div class="row">
                            <div class="col-12">Transaction</div>
                            <div v-if="t.orderid">
                                <router-link
                                    class="linkcolor_shopping"
                                    :to="{ name: 'item', params: { id: t.orderid } }"
                                >Transaction Order # {{ t.orderid }}</router-link>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">{{ t.amount }}</div>
                     <div class="col-3">{{t.balance}}</div>
                </div>
                <!--#7 = sent coin to holdings -->
                <div
                    v-if="t.category === 7"
                    class="row bg-blue-6 q-ma-sm bordered rcorners1 q-pa-md"
                    :key="t.id"
                    :name="t.id"
                >
                    <div class="col-3">{{ relativeDate(t.created) }}</div>
                    <div class="col-3">
                        <div class="row">
                            <div class="col-12">Transaction</div>
                            <div v-if="t.orderid">
                                <router-link
                                    class="linkcolor_shopping"
                                    :to="{ name: 'item', params: { id: t.orderid } }"
                                >Transaction Order # {{ t.orderid }}</router-link>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">{{ t.amount }}</div>
                          <div class="col-3">{{t.balance}}</div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="q-mt-md text-center">You have no transactions at this time ....</div>
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
import { formatDistance } from 'date-fns'

export default defineComponent({
    name: 'btctransactions',
    setup () {
        const $q = useQuasar();
    },
    mounted () {
        this.userstatus();

    },

    data () {
        return {
            dense: ref(true),
            transactions: [],
            date: Date.now(),
            tab: []

        };
    },
    filters: {
        relativeDate (value) {

            var d = value;
            var e = (new Date(d).valueOf());
            return formatDistance(e, new Date())
        }
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
                        this.btctransactions();
                    }
                })
                .catch((error) => {
                    this.$router.push("/login")
                })
        },
        async btctransactions () {
            await axios({
                method: 'get',
                url: '/btc/transactions',
                withCredentials: true,
                headers: authHeader()
            })
                .then((response) => {
                    if (response.status = 200) {
                        if (response.data.length > 1) {
                            this.transactions = response.data;
                        }
                    }
                })
        },
        relativeDate (value) {
            console.log("here")
            var d = value;
            var e = (new Date(d).valueOf());
            return formatDistance(e, new Date())
        }
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

. {
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
</style>