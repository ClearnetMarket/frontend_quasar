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
                        v-model="CreateItemForm.basicInfo.title"
                        label="Item Title"
                        autocomplete="off"
                        :dense="CreateItemForm.dense"
                        :rules="[
                            $rules.required('Title is Required'),
                            $rules.minLength(10, 'Your title should have at least 10 letters'),
                            $rules.maxLength(250, 'Your title should not be larger than 0 letters')
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
                        v-model="CreateItemForm.basicInfo.category_id_0"
                        :options="categoryList"
                        option-value="cat_id"
                        option-label="name"
                        label="Condition"
                        :dense="CreateItemForm.dense"
                        :rules="[
                            $rules.required('Category is Required'),
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
                        v-model="CreateItemForm.basicInfo.item_condition"
                        :options="conditionList"
                        option-value="id"
                        option-label="text"
                        label="Condition"
                        :dense="CreateItemForm.dense"
                        :rules="[
                            $rules.required('Category is Required'),
                        ]"
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
                        v-model="CreateItemForm.pricingInfo.price"
                        label="Item Price"
                        autocomplete="off"
                        mask="#.##"
                        fill-mask="0"
                        reverse-fill-mask
                        :dense="CreateItemForm.dense"
                        :rules="[
                            $rules.required('Price is Required'),
                            $rules.numeric('Numbers only'),
                            $rules.minValue(1), 'Minimum value of 1'
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
                        v-model="CreateItemForm.pricingInfo.currency"
                        :options="currencyList"
                        option-value="id"
                        option-label="text"
                        label="Currency"
                        :dense="CreateItemForm.dense"
                        :rules="[
                            $rules.required('Currency is Required'),
                        ]"
                        lazy-rules
                    />
                </div>
                <div class="col-6 q-pa-sm">The currency you are selling this item in.</div>

                <!-- Item Count-->
                <div class="col-2 q-pa-sm">Quantity</div>
                <div class="col-3 q-pa-sm">
                    <q-input
                        outlined
                        v-model="CreateItemForm.pricingInfo.item_count"
                        type="number"
                        style="max-width: 200px"
                        :rules="[
                            $rules.required('Amount is Required'),
                            $rules.numeric('Numbers only'),
                            $rules.minValue(1), 'Minimum value of 1'
                        ]"
                        lazy-rules
                    />
                </div>
                <div class="col-6 q-pa-sm">How many items you are selling</div>

                <!-- BTC Acepted -->
                <div class="col-12 q-pa-sm">
                    <q-toggle
                        v-model="CreateItemForm.pricingInfo.digital_currency_1"
                        value="one"
                        label="Accept Bitcoin"
                    />
                </div>

                <!-- BTC CASH Acepted -->
                <div class="col-12 q-pa-sm">
                    <q-toggle
                        v-model="CreateItemForm.pricingInfo.digital_currency_2"
                        label="Accept Bitcoin Cash"
                        value="two"
                    />
                </div>
                <!-- Monero Acepted -->
                <div class="col-12 q-pa-sm">
                    <q-toggle
                        v-model="CreateItemForm.pricingInfo.digital_currency_3"
                        value="three"
                        label="Monero"
                    />
                </div>
            </div>

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
                            v-model="CreateItemForm.basicInfo.keywords"
                            label="Comma seperated keywords"
                            autocomplete="off"
                            :dense="CreateItemForm.dense"
                            :rules="[
                                $rules.required('Title is Required'),
                                $rules.minLength(10, 'Your title should have at least 10 letters'),
                                $rules.maxLength(250, 'Your title should not be larger than 0 letters')
                            ]"
                            lazy-rules
                        />
                    </div>
                    <div class="col-6 q-pa-sm">
                        Keywords are import to find your item in the Clearnet Market search engine. Comma seperated keywords are
                        required to
                        find your items.
                    </div>
                </div>
            </div>
            <!-- Images -->
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
                        max-file-size="5120000"
                        max-files="1"
                        use-chips
                        dense
                        accept=".jpg, .png, .gif"
                        @uploaded="onUploaded"
                        @failed="onFailed"
                        @rejected="onRejected"
                        :rules="[
                            $rules.required('Main Image Required'),
                        ]"
                        lazy-rules
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
                        max-file-size="5120000"
                        max-files="1"
                        accept=".jpg, .png, .gif"
                        @uploaded="onUploaded"
                        @failed="onFailed"
                        @rejected="onRejected"
                    />
                </div>
            </div>
            <!-- Description -->
            <div class="row q-my-md q-pa-lg bordered rcorners1">
                <div class="col-12 font-weight-bold">
                    <h5 class="q-ma-none">Item Description</h5>
                    <hr />
                </div>
                <div class="col-12 font-weight-bold">
                    <q-editor
                        toolbar-bg="secondary"
                        ref="editorRef"
                        @paste="onPaste"
                        v-model="CreateItemForm.basicInfo.item_description"
                        :rules="[
                            $rules.required('Description is required'),
                            $rules.minLength(25),
                        ]"
                        lazy-rules
                    />
                </div>
            </div>
            <div class="row q-my-md q-pa-lg bordered rcorners1">
                <div class="col-12 font-weight-bold">
                    <h5 class="q-ma-none">Shipping</h5>
                    <hr />
                </div>
                <div class="col-12 font-weight-bold">
                    <div class="row q-mb-lg">
                        <div class="col-12 col-sm-12 col-md-3">
                            <q-toggle
                                v-model="CreateItemForm.shippingInfo.free_shipping"
                                label="Free Shipping"
                            />
                        </div>
                        <div class="col-12 col-sm-12 col-md-3">
                            <q-input
                                outlined
                                v-model="CreateItemForm.shippingInfo.free_shipping_days"
                                label="Estimate days"
                                autocomplete="off"
                                :dense="CreateItemForm.dense"
                            />
                        </div>
                    </div>
                    <div class="row q-mb-md">
                        <div class="col-12 col-sm-12 col-md-3">
                            <q-toggle
                                v-model="CreateItemForm.shippingInfo.shipping_2"
                                label="Option 2"
                            />
                        </div>
                        <div class="col-12 col-sm-12 col-md-3">
                            <q-input
                                outlined
                                v-model="CreateItemForm.shippingInfo.shipping_2_days"
                                label="Estimate days"
                                autocomplete="off"
                                :dense="CreateItemForm.dense"
                            />
                        </div>
                        <div class="col-12 col-sm-12 col-md-3">
                            <q-input
                                outlined
                                v-model="CreateItemForm.shippingInfo.shipping_2_price"
                                label="Item Price"
                                autocomplete="off"
                                mask="#.##"
                                fill-mask="0"
                                reverse-fill-mask
                                :dense="CreateItemForm.dense"
                                :rules="[
                                
                                    $rules.numeric('Numbers only'),
                                    $rules.minValue(1), 'Minimum value of 1'
                                ]"
                                lazy-rules
                            />
                        </div>
                    </div>
                    <div class="row q-mb-md">
                        <div class="col-12 col-sm-12 col-md-3">
                            <q-toggle
                                v-model="CreateItemForm.shippingInfo.shipping_3"
                                label="Option 3"
                            />
                        </div>
                        <div class="col-12 col-sm-12 col-md-3">
                            <q-input
                                outlined
                                v-model="CreateItemForm.shippingInfo.shipping_3_days"
                                label="Estimate days "
                                autocomplete="off"
                                :dense="CreateItemForm.dense"
                            />
                        </div>
                        <div class="col-12 col-sm-12 col-md-3">
                            <q-input
                                outlined
                                v-model="CreateItemForm.shippingInfo.shipping_3_price"
                                label="Item Price"
                                autocomplete="off"
                                mask="#.##"
                                fill-mask="0"
                                reverse-fill-mask
                                :dense="CreateItemForm.dense"
                                :rules="[
                                
                                    $rules.numeric('Numbers only'),
                                    $rules.minValue(1), 'Minimum value of 1'
                                ]"
                                lazy-rules
                            />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Create Button -->
            <div class="q-pa-md doc-container">
                <div class="row justify-end">
                    <q-btn type="submit" class color="primary" label="Create Item" />
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
import { Cookies } from 'quasar';

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
                dense: ref(true),
                basicInfo: {
                    title: '',
                    category_id_0: '',
                    item_condition: '',
                    item_description: '',
                    keywords: '',
                },
                pricingInfo: {
                    digital_currency_1: '',
                    digital_currency_2: '',
                    digital_currency_3: '',
                    item_count: '',
                    price: '',
                    currency: '',
                },
                shippingInfo: {
                    free_shipping: '',
                    free_shipping_days: '',
                    shipping_2: '',
                    shipping_2_days: '',
                    shipping_2_price: '',
                    shipping_3: '',
                    shipping_3_days: '',
                    shipping_3_price: '',
                },
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
            item_condition: string;
            item_description: string;
            category_id_0: string;
            keywords: string;

            item_count: string;
            digital_currency_1: string;
            digital_currency_2: string;
            digital_currency_3: string;
            price: string;
            currency: string;

            free_shipping: string;
            free_shipping_days: string;
            shipping_2: string;
            shipping_2_days: string;
            shipping_2_price: string;
            shipping_3: string;
            shipping_3_days: string;
            shipping_3_price: string;
        }) {
            const path = '/vendor-create/create-item-info';


            axios({
                method: 'post',
                url: path,
                data: payLoad,
                withCredentials: true,
                headers: authHeader()

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
        async CreateItemImages (payLoad: {
        })
         {
            const auth_token = Cookies.get('auth_token')
            const path = '/vendor-create/create-item-info-images';
            axios({
                method: 'post',
                url: path,
                data: payLoad,
                headers: {
                    'Authorization': 'bearer ' + auth_token,
                    'Content-Type': 'multipart/form-data'
                },
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

        factoryFnMain (file) {
            const authtoken = Cookies.get('auth_token')
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        url: 'http://192.168.1.101:5000/vendorcreateitem/create-item-images/main',
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
                        url: 'http://192.168.1.101:5000/vendorcreateitem/create-item-images/secondary',
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

        async onSubmit () {
            const payLoad = {
                title: this.CreateItemForm.basicInfo.title,
                item_condition: this.CreateItemForm.basicInfo.item_condition,
                item_description: this.CreateItemForm.basicInfo.item_description,
                keywords: this.CreateItemForm.basicInfo.keywords,
                category_id_0: this.CreateItemForm.basicInfo.category_id_0,

                digital_currency_1: this.CreateItemForm.pricingInfo.digital_currency_1,
                digital_currency_2: this.CreateItemForm.pricingInfo.digital_currency_2,
                digital_currency_3: this.CreateItemForm.pricingInfo.digital_currency_3,
                item_count: this.CreateItemForm.pricingInfo.item_count,
                price: this.CreateItemForm.pricingInfo.price,
                currency: this.CreateItemForm.pricingInfo.currency,

                free_shipping: this.CreateItemForm.shippingInfo.free_shipping,
                free_shipping_days: this.CreateItemForm.shippingInfo.free_shipping_days,
                shipping_2: this.CreateItemForm.shippingInfo.shipping_2,
                shipping_2_days: this.CreateItemForm.shippingInfo.shipping_2_days,
                shipping_2_price: this.CreateItemForm.shippingInfo.shipping_2_price,
                shipping_3: this.CreateItemForm.shippingInfo.shipping_3,
                shipping_3_days: this.CreateItemForm.shippingInfo.shipping_3_days,
                shipping_3_price: this.CreateItemForm.shippingInfo.shipping_3_price,
            };
            this.CreateItem(payLoad);
        },
    },
});
</script>


<style type="ts" scoped>
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