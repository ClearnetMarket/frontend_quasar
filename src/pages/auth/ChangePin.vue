<template>
    <q-page class="docs-input row justify-center">
        <div class="col-xs-12 col-sm-6 col-md-4 col-auto q-pt-xl">
            <q-form class="q-px-sm q-pt-xl" method="POST" @submit="onSubmit">
                <div class="q-gutter-md q-pa-lg formlayout">
                    <div class="row">
                        <div class="col-xs-12 text-center text-h4">Enter New Pin</div>
                    </div>
                    <q-input
                        outlined
                        v-model="ChangePinForm.password"
                        label="Enter current Password"
                        autocomplete="off"
                        :dense="ChangePinForm.dense"
                    />
                    <q-input
                        outlined
                        v-model="ChangePinForm.pin"
                        label="Password"
                        autocomplete="off"
                        :dense="ChangePinForm.dense"
                    />
                    <q-input
                        outlined
                        v-model="ChangePinForm.pin_confirm"
                        label="Confirm Pin"
                        autocomplete="off"
                        :dense="ChangePinForm.dense"
                    />

                    <div class="q-pa-md doc-container">
                        <div class="row justify-end">
                            <q-btn
                                class="full-width"
                                type="submit"
                                color="secondary"
                                label="Change Pin"
                            />
                        </div>
                    </div>
                </div>
            </q-form>
        </div>
    </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { ref } from 'vue';

export default defineComponent({
    name: 'changepin',

    data () {
        return {
            ChangePinForm: {
                pin: '',
                pin_confirm: '',
                password: '',
                dense: ref(true),
            },
        };
    },

    methods: {
        sendRequest (payLoad: { pin: string; pin_confirm: string }) {
            axios({
                method: 'post',
                url: '/auth/change-pin',
                data: payLoad,
            })
                .then((response) => {
                    if (response.data.status == 'success') {
                        this.$q.notify({
                            type: 'positive',
                            message: 'Pin Has been changed',
                            position: 'top',
                        });
                        this.$router.push('/login');
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        if (error.response.status === 401) {
                            this.$q.notify({
                                type: 'negative',
                                message: 'Error: Unauthorized',
                                position: 'top',
                            });
                        } else if (error.response.status === 403) {
                            this.$q.notify({
                                type: 'negative',
                                message: 'Error: Forbidden',
                                position: 'top',
                            });
                        } else {
                            this.$q.notify({
                                type: 'negative',
                                message: 'Error',
                            });
                        }
                    }
                });
        },
        onSubmit () {
            console.log('Submitted');
            const payLoad = {
                pin: this.ChangePinForm.pin,
                pin_confirm: this.ChangePinForm.pin_confirm,
            };
            this.sendRequest(payLoad);
        },
    },
});
</script>


<style type="ts" scoped>
.center_text {
    text-align: center;
    display: inline-block;
}
</style>
