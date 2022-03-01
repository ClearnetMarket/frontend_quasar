<template>
    <div class="row text-center">
        <div class="col-xs-12 col-sm-3 col-md-3 justify-content-center q-pt-lg linkcolor_topb">
            <router-link class="text-h5 linkcolor_topb" to="/">Clearnet Market</router-link>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 justify-content-center q-pa-lg">
            <q-input
                outlined
                v-model="searchForm.searchInput"
                placeholder="Search Items..."
                :dense="searchForm.dense"
            >
                <template v-slot:append>
                    <q-icon name="fas fa-search" color="primary" />
                </template>
            </q-input>
        </div>
        <div class="col-xs-4 col-sm-3 col-md-3 q-pt-lg q-pl-lg">
             
                <div class="row gt-sm justify-center ">
                    <div class="col-shrink q-pr-md q-pt-sm">
                         <router-link class="linkcolor_shopping" to="/checkout/cart">
                        <q-icon name="fas fa-shopping-cart linkcolor_shopping" size="sm" color="secondary" />
                        </router-link>
                    </div>
                    <div class="col-shrink linkcolor_shopping">
                           <router-link class="linkcolor_shopping" to="/checkout/cart">
                        <div class="col-12 text-weight-bold linkcolor_shopping">Cart</div>
                        <div class="col-12 linkcolor_shopping">0 Items</div>
                         </router-link>
                    </div>
                </div>
       
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
    name: 'MainHeaderMid',
    setup () {
        const $q = useQuasar();
    },
    data () {
        return {
            searchForm: {
                searchInput: '',

                dense: ref(true),
            },
        };
    },
});
</script>

<style type="sass" scoped>
.linkcolor_topb a:link {
    color: rgb(95, 105, 125);
    text-decoration: none;
}
.linkcolor_topb a:visited {
    color: rgb(95, 105, 125);
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

.linkcolor_shopping a:link {
    color: rgb(95, 105, 125);
    text-decoration: none;
}
.linkcolor_shopping a:visited {
    color: rgb(95, 105, 125);
    text-decoration: none;
}
.linkcolor_shopping a:hover {
    color: #ff9900;
    text-decoration: none;
}
.linkcolor_shopping a:active {
    color: #ff9900;
    text-decoration: none;
}
</style>