<template>
    <q-header reveal elevated class="bg-primary text-white q-py-xs">
        <div class="row text-center justify-between">
            <!-- Large Header top -->

            <div class="col-4">
                <div class="row text-center justify-start">
                    <div
                        class="gt-xs col-auto q-pl-lg q-pt-md text-center fw-bold"
                        align="left"
                    >English</div>
                    <div
                        class="gt-xs col-auto q-pl-lg q-pt-md absolute-lefttext-center fw-bold"
                        align="left"
                    >USD</div>
                    <div class="gt-xs col-grow"></div>
                </div>
            </div>

            <div class="col-8 q-pr-lg gt-sm">
                <div class="row text-center justify-end">
                    <div class="linkcolor_topb">
                        <q-btn flat href="/sell" class="q-mt-sm" color="None" label="Sell" />
                    </div>
                    <div class="linkcolor_topb">
                        <q-btn flat href="/messages" class="q-mt-sm" color="None" label="Message" />
                    </div>
                    <div class="linkcolor_topb">
                        <q-btn flat href="/orders" class="q-mt-sm" color="None" label="Orders" />
                    </div>
                    <div v-if="user">
                        <div class="linkcolor_topb">
                            <q-btn-dropdown flat class="q-mt-sm linkcolor_topb" color="none" label="My Account">
                                <q-list>
                                    <q-item clickable v-close-popup to="/auth/account">
                                        <q-item-section>
                                            <q-item-label>Account</q-item-label>
                                        </q-item-section>
                                    </q-item>

                                    <q-item clickable v-close-popup to="/orders">
                                        <q-item-section>
                                            <q-item-label>Orders</q-item-label>
                                        </q-item-section>
                                    </q-item>

                                    <q-item clickable v-close-popup @click="logout()">
                                        <q-item-section>
                                            <q-item-label>Logout</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </q-btn-dropdown>
                        </div>
                    </div>
                    <div v-else>
                        <div class="linkcolor_topb">
                            <q-btn flat href="/login" class="q-mt-sm" color="None" label="Log In" />
                        </div>
                    </div>
                    <div v-if="!user">
                   
                        <div class="linkcolor_topb">
                            <q-btn flat href="/register" class="q-mt-sm" label="Register" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Small Header top -->
            <div class="lt-sm col-xs-12 col-sm-4 col-md-3 justify-content-end">
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
                                class="q-ma-sm"
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