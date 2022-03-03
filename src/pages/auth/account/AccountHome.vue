<template>
    <router-view />
    <q-page class="docs-input">
        <q-breadcrumbs class="text-info q-mt-md q-ml-lg">
            <template v-slot:separator>
                <q-icon size="1.5em" name="chevron_right" color="primary" />
            </template>

            <q-breadcrumbs-el label="Home" icon="home" to="/" />
            <q-breadcrumbs-el label="Account" icon="person" to="/account" />
        </q-breadcrumbs>
        <div class="q-pa-md">
            <div class="text-center">
                <h5>Your Account</h5>
            </div>

            <div class="row justify-evenly">
                <div
                    class="col-xs-12 col-sm-8 col-md-3 bordered rcorners1 greyhover q-mx-sm q-my-sm"
                    @click="$router.replace('/orders')"
                    style="cursor: pointer;"
                >
                    <div class="row">
                        <div class="col-4 q-pa-md">
                            <q-icon name="shopping_basket" size="xl" color="orange-5" />
                        </div>
                        <div class="col-8">
                            <div class="text-subtitle1">Orders</div>
                            <div class="text-grey-7">View all of your orders in one place</div>
                        </div>
                    </div>
                </div>
                <div
                    class="col-xs-12 col-sm-8 col-md-3 bordered rcorners1 greyhover q-mx-sm q-my-sm"
                    @click="$router.replace('/changepassword')"
                    style="cursor: pointer;"
                >
                    <div class="row">
                        <div class="col-4 q-pa-md">
                            <q-icon name="lock" size="xl" color="orange-5" />
                        </div>
                        <div class="col-8">
                            <div class="text-subtitle1">Account Password</div>
                            <div class="text-grey-7">Change account password</div>
                        </div>
                    </div>
                </div>
                <div
                    class="col-xs-12 col-sm-8 col-md-3 bordered rcorners1 greyhover q-mx-sm q-my-sm"
                    @click="$router.replace('/changepin')"
                    style="cursor: pointer;"
                >
                    <div class="row">
                        <div class="col-4 q-pa-md">
                            <q-icon name="vpn_key" size="xl" color="orange-5" />
                        </div>
                        <div class="col-8">
                            <div class="text-subtitle1">Account Pin</div>
                            <div class="text-grey-7">Change account pin</div>
                        </div>
                    </div>
                </div>
                <div
                    class="col-xs-12 col-sm-8 col-md-3 bordered rcorners1 greyhover q-mx-sm q-my-sm"
                    @click="$router.replace('/profile')"
                    style="cursor: pointer;"
                >
                    <div class="row">
                        <div class="col-4 q-pa-md">
                            <q-icon name="star" size="xl" color="orange-5" />
                        </div>
                        <div class="col-8">
                            <div class="text-subtitle1">Ratings</div>
                            <div class="text-grey-7">View my ratings</div>
                        </div>
                    </div>
                </div>
                <div
                    class="col-xs-12 col-sm-8 col-md-3 bordered rcorners1 greyhover q-mx-sm q-my-sm"
                    @click="$router.replace('/account/profile')"
                    style="cursor: pointer;"
                >
                    <div class="row">
                        <div class="col-4 q-pa-md">
                            <q-icon name="person" size="xl" color="orange-5" />
                        </div>
                        <div class="col-8">
                            <div class="text-subtitle1">Profile</div>
                            <div class="text-grey-7">Change profile Info</div>
                        </div>
                    </div>
                </div>
                <div
                    class="col-xs-12 col-sm-8 col-md-3 bordered rcorners1 greyhover q-mx-sm q-my-sm"
                    @click="$router.replace('/messages/messageshome')"
                    style="cursor: pointer;"
                >
                    <div class="row">
                        <div class="col-4 q-pa-md">
                            <q-icon name="mail" size="xl" color="orange-5" />
                        </div>
                        <div class="col-8">
                            <div class="text-subtitle1">Messages</div>
                            <div class="text-grey-7">My Messages</div>
                        </div>
                    </div>
                </div>
                <div
                    class="col-xs-12 col-sm-8 col-md-3 bordered rcorners1 greyhover q-mx-sm q-my-sm"
                    @click="$router.replace('/checkout/cart')"
                    style="cursor: pointer;"
                >
                    <div class="row">
                        <div class="col-4 q-pa-md">
                            <q-icon name="shopping_cart" size="xl" color="orange-5" />
                        </div>
                        <div class="col-8">
                            <div class="text-subtitle1">Cart</div>
                            <div class="text-grey-7">Go to my Shopping Cart</div>
                        </div>
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
import authHeader from '../../../services/auth.header';

export default defineComponent({
    name: 'Login',
    components: {},
    setup () {
        const $q = useQuasar();

    },
    data () {
        return {

        };
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
                        let user = response.data.user;
                        let user_auth_status = response.data.login;

                    }
                })
        },
        async userprofile () {
            await axios({
                method: 'get',
                url: '/profile/profile_home',
                withCredentials: true,
                headers: authHeader()
            })
                .then((response) => {
                    if (response.status = 200) {
                    }
                })
        },

    },
});
</script>


<style type="ts" scoped>
.bordered {
    border-style: solid;
    border-width: 1px;
    border-color: #eeeeee;
}
.bordered {
    border-style: solid;
    border-width: 1px;
    border-color: #a7a0a0;
}
.rcorners1 {
    border-radius: 15px;
}
.greyhover:hover {
    background-color: #eeeeee;
}
.wordcolor {
    color: #6b6565;
}
</style>
