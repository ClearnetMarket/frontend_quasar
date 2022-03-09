<template >
    <q-page class="docs-input q-mb-xl widthstyle">
        <q-breadcrumbs class="q-mt-md q-ml-lg">
            <template v-slot:separator>
                <q-icon size="1.5em" name="chevron_right" />
            </template>
            <q-breadcrumbs-el label="Home" icon="home" :to="{ name: 'home' }" />
            <q-breadcrumbs-el label="My Items" icon="local_mall" :to="{ name: 'forsale' }" />
        </q-breadcrumbs>

        <div class="row q-ma-none">
            <div class="col-12 text-center q-ma-none">
                <h5 class="q-mt-sm">Create an Item</h5>
            </div>
        </div>

        <!-- Images -->
        <div class="row q-my-md q-pa-lg bordered rcorners1">
            <div class="col-12 font-weight-bold">
                <h5 class="q-ma-none">Images</h5>
                <hr />
            </div>

            <div class="justify-center col-12 col-sm-6 col-md-3 q-px-lg">
                <div v-if="marketitem.image_one_server">
                    <q-btn
                        color="negative"
                        text-color="white"
                        label="Delete Image"
                        @click="deleteitemimage(marketitem.image_one_server)"
                    />
                    <q-img :src=marketitem.image_one_url :ratio="1" />
                </div>
                <div v-else>
                    <q-uploader
                        class="col-12 bg-grey-5"
                        style="width:100%; min-height: 250px; padding: 10px;"
                        :factory="factoryFnMain"
                        label="Main Image"
                        field-name="main_image"
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
            </div>
            <div class="justify-center col-12 col-sm-6 col-md-3 q-px-lg">
                <div v-if="marketitem.image_two_server">
                    <q-btn
                        color="negative"
                        text-color="white"
                        label="Delete Image"
                        @click="deleteitemimage(marketitem.image_two_server)"
                    />
                      <q-img :src=marketitem.image_two_url :ratio="1" />
                </div>
                <div v-else>
                    <q-uploader
                        class="col-12 bg-grey-5"
                        style="width:100%; min-height: 250px; padding: 10px;"
                        :factory="factoryFnMain"
                        label="Second Image"
                        field-name="image_two"
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
            </div>
            <div class="justify-center col-12 col-sm-6 col-md-3 q-px-lg">
                <div v-if="marketitem.image_three_server">
                    <q-btn
                        color="negative"
                        text-color="white"
                        label="Delete Image"
                        @click="deleteitemimage(marketitem.image_three_server)"
                    />
                       <q-img :src=marketitem.image_three_url :ratio="1" />
                </div>
                <div v-else>
                    <q-uploader
                        class="col-12 bg-grey-5"
                        style="width:100%; min-height: 250px; padding: 10px;"
                        :factory="factoryFnMain"
                        label="Third Image"
                        field-name="image_three"
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
            </div>
            <div class="justify-center col-12 col-sm-6 col-md-3 q-px-lg">
                <div v-if="marketitem.image_four_server">
                    <q-btn
                        color="negative"
                        text-color="white"
                        label="Delete Image"
                        @click="deleteitemimage(marketitem.image_four_server)"
                    />
                       <q-img :src=marketitem.image_four_url :ratio="1" />
                </div>
                <div v-else>
                    <q-uploader
                        class="col-12 bg-grey-5"
                        style="width:100%; min-height: 250px; padding: 10px;"
                        :factory="factoryFnMain"
                        label="Fourth Image"
                        field-name="image_four"
                        auto-upload
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
        </div>
        <q-form method="post" enctype="multipart/form-data" @submit="onSubmit">
            <!-- Top Row-->
            <div class="row q-my-md q-pa-lg bordered rcorners1">
                <div class="col-12 font-weight-bold">
                    <h5 class="q-ma-none q-pb-md">Item Info</h5>
                </div>
                <!-- Title-->
                <div class="col-12 col-sm-12 q-pa-sm">
                    Title
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
                <!-- Category -->
                <div class="col-12 col-sm-6 q-pa-sm">
                    Category
                    <q-select
                        outlined
                        v-model="CreateItemForm.basicInfo.category_id_0"
                        :options="categoryList"
                        option-value="value"
                        option-label="name"
                        label="Condition"
                        :dense="CreateItemForm.dense"
                        :rules="[
                            $rules.required('Category is Required'),
                        ]"
                        lazy-rules
                    />
                </div>
                <!-- Condition -->
                <div class="col-12 col-sm-6 q-pa-sm">
                    Condition
                    <q-select
                        outlined
                        v-model="CreateItemForm.basicInfo.item_condition"
                        :options="conditionList"
                        option-value="value"
                        option-label="text"
                        label="Condition"
                        :dense="CreateItemForm.dense"
                        :rules="[
                            $rules.required('Condition is Required'),
                        ]"
                        lazy-rules
                    />
                </div>
            </div>
            <!-- Bottom Row -->
            <div class="row q-my-md q-pa-lg bordered rcorners1">
                <div class="col-12 font-weight-bold">
                    <h5 class="q-ma-none q-pb-md">Pricing</h5>
                </div>
                <!-- Price-->
                <div class="col-12 col-sm-6 q-pa-sm">
                    Price
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
                    />The price of the item in your local currency
                </div>
                <!-- Item Count-->
                <div class="col-12 col-sm-6 q-pa-sm">
                    Quantity
                    <q-input
                        outlined
                        v-model="CreateItemForm.pricingInfo.item_count"
                        type="number"
                        :dense="CreateItemForm.dense"
                        style="max-width: 200px"
                        :rules="[
                            $rules.required('Amount is Required'),
                            $rules.numeric('Numbers only'),
                            $rules.minValue(1), 'Minimum value of 1'
                        ]"
                        lazy-rules
                    />How many items you are selling
                </div>
                <!-- BTC Acepted -->
                <div class="col-12 col-sm-6 q-pa-sm">
                    <q-toggle
                        v-model="CreateItemForm.pricingInfo.digital_currency_1"
                        value="one"
                        label="Accept Bitcoin"
                    />
                    <q-toggle
                        v-model="CreateItemForm.pricingInfo.digital_currency_2"
                        label="Accept Bitcoin Cash"
                        value="two"
                    />
                    <q-toggle
                        v-model="CreateItemForm.pricingInfo.digital_currency_3"
                        value="three"
                        label="Monero"
                    />
                </div>
            </div>
            <!-- Description -->
            <div class="row q-my-md q-pa-lg bordered rcorners1">
                <div class="col-12 font-weight-bold">
                    <h5 class="q-ma-none q-pb-md">Item Description</h5>
                </div>
                <div class="col-12 font-weight-bold">
                    <q-editor
                        toolbar-bg="secondary"
                        ref="editorRef"
                        v-model="CreateItemForm.basicInfo.item_description"
                        :rules="[
                            $rules.required('Description is required'),
                            $rules.minLength(25),
                        ]"
                        lazy-rules
                    />
                </div>
            </div>
            <!-- Shipping -->
            <div class="row q-pa-lg bordered rcorners1">
                <div class="col-12 font-weight-bold">
                    <h5 class="q-ma-none q-pb-md">Shipping</h5>
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
                    <q-toggle
                        value="online"
                        label="WorldWide Shipping or Digital Item"
                        v-model="isSelectDisabled"
                    />
                    <!-- What countrys shipping too -->
                    <div class="row">
                        Select countries you are shipping too.
                        <div class="col-12 q-pa-sm">
                            Main Country is Required.
                            <q-select
                                outlined
                                v-model="CreateItemForm.shippingInfo.shipping_to_country_one"
                                :options="countryList"
                                option-value="value"
                                option-label="name"
                                label="Country"
                                :dense="CreateItemForm.dense"
                                :rules="[
                                    $rules.required('Title is Required'),
                                ]"
                                lazy-rules
                                :disable="isSelectDisabled"
                            />
                        </div>
                        <div class="col-6 q-pa-sm">
                            Optional Country two
                            <q-select
                                outlined
                                v-model="CreateItemForm.shippingInfo.shipping_to_country_two"
                                :options="countryList"
                                option-value="value"
                                option-label="name"
                                label="Country"
                                :dense="CreateItemForm.dense"
                                :disable="isSelectDisabled"
                            />
                        </div>
                        <div class="col-6 q-pa-sm">
                            Optional Country Five
                            <q-select
                                outlined
                                v-model="CreateItemForm.shippingInfo.shipping_to_country_three"
                                :options="countryList"
                                option-value="value"
                                option-label="name"
                                label="Country"
                                :dense="CreateItemForm.dense"
                                :disable="isSelectDisabled"
                            />
                        </div>
                        <div class="col-6 q-pa-sm">
                            Optional Country Five
                            <q-select
                                outlined
                                v-model="CreateItemForm.shippingInfo.shipping_to_country_four"
                                :options="countryList"
                                option-value="value"
                                option-label="name"
                                label="Country"
                                :dense="CreateItemForm.dense"
                                :disable="isSelectDisabled"
                            />
                        </div>
                        <div class="col-6 q-pa-sm">
                            Optional Country Five
                            <q-select
                                outlined
                                v-model="CreateItemForm.shippingInfo.shipping_to_country_five"
                                :options="countryList"
                                option-value="value"
                                option-label="name"
                                label="Country"
                                :dense="CreateItemForm.dense"
                                :disable="isSelectDisabled"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="row q-my-md q-pa-lg bordered rcorners1">
                <!-- KEYWORDS -->
                <div class="col-12 font-weight-bold">
                    <h5 class="q-ma-none q-pb-md">KeyWords</h5>
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
                                $rules.minLength(10, 'Your keywords should have at least 10 letters'),
                                $rules.maxLength(250, 'Your keywords should not be larger than 250 letters')
                            ]"
                            lazy-rules
                        />
                    </div>
                    <div class="col-6 q-pa-sm">
                        Keywords are import to find your item in the Clearnet Market search engine.
                        Comma seperated keywords are required to find your items.
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
import { constants } from 'perf_hooks';

export default defineComponent({
    name: 'createitem',

    setup () {
        const $q = useQuasar();
        const isSelectDisabled = ref(false); // Form Toggle 
        return { isSelectDisabled } // Form Toggle 
    },
    mounted () {
        this.userstatus();
        this.createitemtemporary();

        this.getCategoryList(); // Query Categories 
        this.getConditionList();// Query Conditionlist 
        this.getCountryList();// Query Countries 

    },

    data () {

        return {
            item_id: '',
            marketitem: '',
            authtoken: '',

            imageone: '',
            imagetwo: '',
            imagethree: '',
            imagefour: '',
            imagefive: '',

            currencyList: [],
            categoryList: [],
            conditionList: [],
            countryList: [],
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
                },
                shippingInfo: {
                    worldwide_shipping: '',
                    free_shipping: '',
                    free_shipping_days: '',
                    shipping_2: '',
                    shipping_2_days: '',
                    shipping_2_price: '',
                    shipping_3: '',
                    shipping_3_days: '',
                    shipping_3_price: '',
                    shipping_to_country_one: '',
                    shipping_to_country_two: '',
                    shipping_to_country_three: '',
                    shipping_to_country_four: '',
                    shipping_to_country_five: '',
                },
            },

        };
    },
    computed: {
        ...mapGetters(['user']),

    },
    methods: {
        imagepath: function(imagename) {
            {
                return '/mnt/clearnet/item/' + this.item_id + '/' + imagename+".jpg"
            
            }
        },

        async deleteitemimage (imagename) { // deleet image
            const path = '/vendorcreateitem/delete-image/' + this.item_id + '/' + imagename ;
            await axios({
                method: 'delete',
                url: path,
                withCredentials: true,
                headers: authHeader()
            })
                .then((response) => {
                    if (response.status = 200) {
                        this.getItemForSale()
                    }
                    else {

                    }
                })
        },
        async getItemForSale () {// Get the item thats being modified

            const path = '/item/' + this.item_id;
            await axios({
                method: 'get',
                url: path,
                withCredentials: true,

            })
                .then((response) => {
                    if (response.status === 200) {
                        this.marketitem = response.data;
                        console.log(this.marketitem)
                    }
                })
                .catch((error) => {

                });
        },
        async createitemtemporary () { // Create an Item.  // Using thi
            await axios({
                method: 'GET',
                url: '/vendorcreateitem/create-item',
                withCredentials: true,
                headers: authHeader()
            })
                .then((response) => {
                    if (response.status = 200) {
                        this.item_id = response.data.item_id
                        this.getItemForSale()
                    }
                    else {
                        this.$router.push("/")
                    }
                })
        },
        async userstatus () { //user Auth
            await axios({
                method: 'get',
                url: '/auth/whoami',
                withCredentials: true,
                headers: authHeader()
            })
                .then((response) => {
                    if (response.status = 200) {
                        this.authtoken = Cookies.get('auth_token')
                    }
                    else {
                        this.$router.push("/")
                    }
                })
        },
        async CreateItem (

            payLoad: {
                item_id: string;
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
                free_shipping: string;
                free_shipping_days: string;
                shipping_2: string;
                shipping_2_days: string;
                shipping_2_price: string;
                shipping_3: string;
                shipping_3_days: string;
                shipping_3_price: string;
                shipping_to_country_one: string;
                shipping_to_country_two: string;
                shipping_to_country_three: string;
                shipping_to_country_four: string;
                shipping_to_country_five: string;
            }) {
            const path = '/vendorcreateitem/create-item-main' + this.item_id;
            axios({
                method: 'put',
                url: path,
                data: payLoad,
                withCredentials: true,
                headers: authHeader()
            })
                .then((response) => {
                    if (response.data.status == 'success') {
                        this.$q.notify({
                            type: 'positive',
                            message: 'Item Created Successfully.',
                            position: 'top'
                        })

                        this.$router.push('/vendor/itemsforsale')
                    }
                    if (response.data.status == 'error') {
                        this.$router.push("/vendor/createitem")
                        this.$q.notify({
                            type: 'negative',
                            message: 'Form Error: There was an error in item creation.',
                            position: 'top'
                        })
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

        async getCountryList () {// Get Countries
            const path = '/vendorcreateitem/query/country';

            axios({
                method: 'get', //you can set what request you want to be
                url: path,
                withCredentials: true,
                data: '',
            })
                .then((response) => {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    this.countryList = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        async getCategoryList () {// Get Categories
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
        async getConditionList () {// Get Conditions
            const path = '/vendorcreateitem/query/condition';
            await axios({
                method: 'get',
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
        factoryFnMain (files) {
            const authtoken = Cookies.get('auth_token')
            return new Promise((resolve) => {
                // simulating a delay of 2 seconds

                setTimeout(() => {
                    resolve({
                        url: 'http://192.168.1.101:5000/vendorcreateitem/create-item-images/' + this.item_id,
                        headers: [
                            { name: 'Authorization', value: 'bearer ' + authtoken },

                        ],

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
            this.getItemForSale()
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


        async onSubmit () {// Submit Data for payload
            const payLoad = {
                item_id: this.item_id,
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
                free_shipping: this.CreateItemForm.shippingInfo.free_shipping,
                free_shipping_days: this.CreateItemForm.shippingInfo.free_shipping_days,
                shipping_2: this.CreateItemForm.shippingInfo.shipping_2,
                shipping_2_days: this.CreateItemForm.shippingInfo.shipping_2_days,
                shipping_2_price: this.CreateItemForm.shippingInfo.shipping_2_price,
                shipping_3: this.CreateItemForm.shippingInfo.shipping_3,
                shipping_3_days: this.CreateItemForm.shippingInfo.shipping_3_days,
                shipping_3_price: this.CreateItemForm.shippingInfo.shipping_3_price,
                shipping_to_country_one: this.CreateItemForm.shippingInfo.shipping_to_country_one,
                shipping_to_country_two: this.CreateItemForm.shippingInfo.shipping_to_country_two,
                shipping_to_country_three: this.CreateItemForm.shippingInfo.shipping_to_country_three,
                shipping_to_country_four: this.CreateItemForm.shippingInfo.shipping_to_country_four,
                shipping_to_country_five: this.CreateItemForm.shippingInfo.shipping_to_country_five,
            };
            this.CreateItem(payLoad);
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