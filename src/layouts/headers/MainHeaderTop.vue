<template>
    <q-header reveal elevated class="bg-primary text-white q-py-xs">
        <div class="row text-center justify-between">
            <!-- Large Header top -->

            <div class="col-4">
                <div class="row text-center justify-start">
                    <div class="gt-xs col-auto q-pl-lg q-pt-md text-center fw-bold" align="left">English</div>
                    <div class="gt-xs col-auto q-pl-lg q-pt-md absolute-lefttext-center fw-bold" align="left">USD</div>
                    <div class="gt-xs col-grow"></div>
                </div>
            </div>
            <div class="col-4"></div>
            <div class="col-4 q-pr-lg">
                <div class="row text-center justify-end q-pr-lg">
                    <div class="linkcolor_topb gt-xs col-auto q-pl-lg q-pt-md text-center fw-bold ">
                        <router-link class="" to="/auth/account">Account</router-link>
                    </div>
                    <div class="linkcolor_topb gt-xs col-auto q-pl-lg q-pt-md text-center fw-bold">
                        <router-link class="" to="/messages/home">Messages</router-link>
                    </div>
                    <div class="linkcolor_topb gt-xs col-auto q-pl-lg q-pt-md text-center fw-bold">
                        <router-link class="" to="/orders">Orders</router-link>
                    </div>
                  
                </div>
            </div>

            <!-- Small Header top -->
            <div class="lt-sm col-xs-12 col-sm-4 col-md-3 justify-content-end ">
                <div v-if="user">
                    <div class="row lt-sm">
                        <div class="col-12">
                            <q-btn
                                class="q-ma-sm"
                                icon="fas fa-shopping-cart"
                                color="secondary"
                                label="Cart"
                                @click.prevent
                                @click="logout()"
                            />
                            <q-btn
                                class="q-ma-sm "
                                icon="fas fa-user"
                                color="secondary"
                                label="Account"
                                @click.prevent
                            />
                        </div>
                    </div>
                </div>
                <div v-if="!user">
                    <q-btn href="/login" class="q-ma-sm" color="None" label="Sign In" />
                    <q-btn href="/register" class="q-ma-sm" color="secondary" label="Register" />
                </div>
            </div>
        </div>
    </q-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
    name: 'MainHeaderTop',
    computed: {
        ...mapGetters(['user']),
    },

    methods: {
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



<style type="sass" scoped>
.linkcolor_topb a:link {
    color: #ffffff;
    text-decoration: none;
}

.linkcolor_topb a:visited {
    color: #ffffff;
    text-decoration: none;
}

.linkcolor_topb a:hover {
    color: #ff9900;
    text-decoration: none;
 
}

.linkcolor_topb a:active {
    color: #ff9900;
    text-decoration: none;
   
}
</style>