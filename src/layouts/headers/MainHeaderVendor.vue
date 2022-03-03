<template>
    <div class="row text-center bg-primary text-white font-weight-bold q-pa-none q-mx-xl q-my-sm">
        <div v-if="disputes">
            <q-btn>
                <q-avatar color="red" text-color="white" size="sm">{{ disputes }}</q-avatar>Disputes
            </q-btn>
        </div>
        <div v-else>
            <q-btn clickable to="/vendor/itemsforsale" color="primary" text-color="white">Disputes</q-btn>
        </div>

        <div v-if="returns">
            <q-btn>
                <q-avatar color="red" text-color="white" size="sm">{{ returns }}</q-avatar>Returns
            </q-btn>
        </div>
        <div v-else>
            <q-btn clickable to="/vendor/itemsforsale" color="primary" text-color="white">Returns</q-btn>
        </div>

        <div v-if="feedback" class="q-mt-none">
            <q-btn>
                <q-avatar color="red" text-color="white" size="sm">{{ feedback }}</q-avatar>Feedback
            </q-btn>
        </div>
        <div v-else>
            <q-btn clickable to="/vendor/itemsforsale" color="primary" text-color="white">Feedback</q-btn>
        </div>

        <div v-if="orders">
            <q-btn>
                <q-avatar color="red" text-color="white" size="sm">{{ orders }}</q-avatar>Orders
            </q-btn>
        </div>
        <div v-else>
            <q-btn clickable to="/vendor/itemsforsale" color="primary" text-color="white">Orders</q-btn>
        </div>
        <div class="col-grow"></div>
        <div class="col-auto q-px-md text-no-wrap justify-end">
            <q-btn
                clickable
                to="/vendor/itemsforsale"
                color="accent"
                text-color="white"
                icon="event"
            >My Items</q-btn>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import axios from 'axios';
import authHeader from '../../services/auth.header';

export default defineComponent({
    name: 'MainHeaderBottom',

    data () {
        return {
            login: null,
            user: null,
            orders: null,
            disputes: null,
            feedback: null,
            returns: null,

        }
    },
    computed: {
        ...mapGetters(['user']),
    },
    mounted () {
        this.userstatus();
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
                        if (user.admin_role > 0 && user_auth_status == true) {
                            this.getvendorfeedback();
                            this.getvendordisputes();
                            this.getvendororders();
                            this.getvendorreturns();
                        }
                    }
                    else {
                        console.log("err")
                    }
                })
        },
        async getvendorfeedback () {
            await axios({
                method: 'get',
                url: '/vendor/new-feedback-count',
                withCredentials: true,
                headers: authHeader()
            })
                .then((response) => {
                    if (response.data) {
                        this.feedback = response.data.count
                    }
                })
        },
        async getvendordisputes () {
            await axios({
                method: 'get',
                url: '/vendor/new-disputes-count',
                withCredentials: true,
                headers: authHeader()
            })
                .then((response) => {
                    if (response.data) {
                        this.disputes = response.data.count
                    }
                })
        },
        async getvendororders () {
            await axios({
                method: 'get',
                url: '/vendor/new-orders-count',
                withCredentials: true,
                headers: authHeader()
            })
                .then((response) => {
                    if (response.data) {
                        this.orders = response.data.count
                    }
                })
        },
        async getvendorreturns () {
            await axios({
                method: 'get',
                url: '/vendor/returns-count',
                withCredentials: true,
                headers: authHeader()
            })
                .then((response) => {
                    if (response.data) {
                        this.returns = response.data.count
                    }
                })
        },


    },
});
</script>
