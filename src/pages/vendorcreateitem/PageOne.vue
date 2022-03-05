<template>
    <q-page class="docs-input q-mb-xl">
        <q-breadcrumbs class="text-info q-mt-md q-ml-lg">
            <template v-slot:separator>
                <q-icon size="1.5em" name="chevron_right" color="primary" />
            </template>
            <q-breadcrumbs-el label="Home" icon="home" to="/" />
            <q-breadcrumbs-el label="My Items" icon="local_mall" to="/vendor/itemsforsale" />
        </q-breadcrumbs>

        <div class="row q-ma-none">
            <div class="col-12 text-center q-ma-none">
                <h5 class="q-mt-sm">Create an Item</h5>
            </div>
        </div>

        <q-form method="post" enctype="multipart/form-data" @submit="onSubmit">
            <!-- Top Row-->
            <div class="row q-my-md q-pa-lg bordered rcorners1">
                <div class="col-12 font-weight-bold">
                    <h5 class="q-ma-none">Item Info</h5>
                    <hr />
                </div>

                <!-- Title-->
                <div class="col-2 q-pa-sm">Title</div>
                <div class="col-4 q-pa-sm">
                    <q-input
                        outlined
                        v-model="CreateItemForm.title"
                        label="Item Title"
                        autocomplete="off"
                        :dense="CreateItemForm.dense"
                        :rules="[
                            val => !!val || '* Required',
                            val => val.length > 10 || 'Please use minimum 10 character',
                        ]"
                        lazy-rules
                    />
                </div>
                <div class="col-6 q-pa-sm">The title is the headline for your listing</div>

                <!-- Category -->
                <div class="col-2 q-pa-sm">Category</div>
                <div class="col-4 q-pa-sm">
                    <q-select
                        outlined
                        v-model="CreateItemForm.category_id_0"
                        :options="categoryList"
                        option-value="cat_id"
                        option-label="name"
                        label="Condition"
                        :dense="CreateItemForm.dense"
                        :rules="[
                            val => !!val || '* Required',
                        
                        ]"
                        lazy-rules
                    />
                </div>
                <div
                    class="col-6 q-pa-sm"
                >The category of your item. Used for searches, and finding your item.</div>

                <!-- Condition -->
                <div class="col-2 q-pa-sm">Condition</div>
                <div class="col-4 q-pa-sm">
                    <q-select
                        outlined
                        v-model="CreateItemForm.condition"
                        :options="conditionList"
                        option-value="id"
                        option-label="text"
                        label="Condition"
                        :dense="CreateItemForm.dense"
                        :rules="[val => !!val || '* Required']"
                        lazy-rules
                    />
                </div>
                <div class="col-6 q-pa-sm">The condition of your item</div>
            </div>

            <!-- Bottom Row -->

            <div class="row q-my-md q-pa-lg bordered rcorners1">
                <div class="col-12 font-weight-bold">
                    <h5 class="q-ma-none">Pricing</h5>
                    <hr />
                </div>
                <!--   Price-->
                <div class="col-2 q-pa-sm">Price</div>
                <div class="col-4 q-pa-sm">
                    <q-input
                        outlined
                        v-model="CreateItemForm.price"
                        label="Item Price"
                        autocomplete="off"
                        mask="#.##"
                        fill-mask="0"
                        reverse-fill-mask
                        :dense="CreateItemForm.dense"
                        :rules="[val => !!val || '* Required',
                        ]"
                        lazy-rules
                    />
                </div>
                <div class="col-6 q-pa-sm">The price of the item in your local currency</div>

                <!-- Currency -->

                <div class="col-2 q-pa-sm">Currency</div>
                <div class="col-4 q-pa-sm">
                    <q-select
                        outlined
                        v-model="CreateItemForm.currency"
                        :options="currencyList"
                        option-value="id"
                        option-label="text"
                        label="Currency"
                        :dense="CreateItemForm.dense"
                    />
                </div>
                <div class="col-6 q-pa-sm">The currency you are selling this item in.</div>

                <!-- Item Count-->

                <div class="col-2 q-pa-sm">Quantity</div>
                <div class="col-3 q-pa-sm">
                    <q-input
                        outlined
                        v-model="CreateItemForm.item_count"
                        type="number"
                        style="max-width: 200px"
                    />
                </div>
                <div class="col-6 q-pa-sm">How many items you are selling</div>

                <!-- BTC CASH Acepted -->

                <div class="col-12 q-pa-sm">
                    <q-toggle v-model="CreateItemForm.digital_currency_1" label="Accept Bitcoin" />
                </div>
                <div class="col-12 q-pa-sm">
                    <q-toggle
                        v-model="CreateItemForm.digital_currency_2"
                        label="Accept Bitcoin Cash"
                    />
                </div>
                <div class="col-12 q-pa-sm">
                    <q-toggle v-model="CreateItemForm.digital_currency_3" label="Monero" />
                </div>
            </div>
            <!-- Third Row-->

            <div class="row q-my-md q-pa-lg bordered rcorners1">
                <!-- KEYWORDS -->

                <div class="col-12 font-weight-bold">
                    <h5 class="q-ma-none">KeyWords</h5>
                    <hr />
                </div>
                <div class="row">
                    <div class="col-6 q-pa-sm">
                        <q-input
                            outlined
                            v-model="CreateItemForm.keywords"
                            label="Comma seperated keywords"
                            autocomplete="off"
                            :dense="CreateItemForm.dense"
                        />
                    </div>
                    <div class="col-6 q-pa-sm">
                        Keywords are import to find your item in the Clearnet Market search engine. Comma seperated keywords are
                        required to
                        find your items.
                    </div>
                </div>
            </div>

            <!-- Create Button -->

            <div class="q-pa-md doc-container">
                <div class="row justify-end">
                    <q-btn type="submit" class color="primary" label="Add Images" />
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
import authHeader from '../../services/auth.header';
import { mapGetters } from 'vuex';


export default defineComponent({
    name: 'pageone',
    setup () {
        const $q = useQuasar();

    },
    mounted () {
        this.getCategoryList();
        this.getConditionList();
        this.getCurrencyList();
    },
    data () {
        return {
            currencyList: [],
            categoryList: [],
            conditionList: [],
            CreateItemForm: {
                title: '',
                digital_currency_1: '',
                digital_currency_2: '',
                digital_currency_3: '',
                item_condition: '',
                item_count: '',
                category_id_0: '',
                price: '',
                currency: '',
                keywords: '',
                dense: ref(true),
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
        },
        async CreateItem (payLoad: {
            title: string;
            digital_currency_1: string;
            digital_currency_2: string;
            digital_currency_3: string;
            item_condition: string;
            item_count: string;

            category_id_0: string;
            price: string;
            currency: string;
            keywords: string;
        }) {
            const path = '/vendor-create/create-item-info';
            axios({
                method: 'post',
                url: path,
                data: payLoad,
                withCredentials: true,
            })
                .then((response) => {
                    if (response.data.user) {

                        this.$router.push('');
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        if (error.response.status === 401) {
                            this.$q.notify({
                                type: 'negative',
                                message: 'Error: Unauthorized',
                                position: 'top'
                            })
                            this.$store.commit('loginFailure')

                        } else if (error.response.status === 403) {
                            this.$q.notify({
                                type: 'negative',
                                message: 'Error: Forbidden',
                                position: 'top'
                            })
                        } else {
                            this.$q.notify({
                                type: 'negative',
                                message: 'Error: Forbidden',
                                position: 'top'
                            })
                        }
                    }
                });
        },
        async getCurrencyList () {
            const path = '/vendorcreateitem/query/currency';
            axios({
                method: 'get', //you can set what request you want to be
                url: path,
                withCredentials: true,
                data: '',
            })
                .then((response) => {
                    this.currencyList = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        async getCategoryList () {
            const path = '/vendorcreateitem/query/category';
            await axios({
                method: 'get', //you can set what request you want to be
                url: path,
                withCredentials: true,
                data: '',
            })
                .then((response) => {
                    this.categoryList = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        async getConditionList () {
            const path = '/vendorcreateitem/query/condition';
            await axios({
                method: 'get', //you can set what request you want to be
                url: path,
                withCredentials: true,
                data: '',
            })
                .then((response) => {

                    this.conditionList = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        async onSubmit () {
            console.log('Submitted');
            const payLoad = {
                title: this.CreateItemForm.title,
                digital_currency_1: this.CreateItemForm.digital_currency_1,
                digital_currency_2: this.CreateItemForm.digital_currency_2,
                digital_currency_3: this.CreateItemForm.digital_currency_3,
                item_condition: this.CreateItemForm.item_condition,
                item_count: this.CreateItemForm.item_count,

                category_id_0: this.CreateItemForm.category_id_0,
                price: this.CreateItemForm.price,
                currency: this.CreateItemForm.currency,
                keywords: this.CreateItemForm.keywords,
            };
            await this.CreateItem(payLoad);
        },
    }
});
</script>

<style type="scss">
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
</style>