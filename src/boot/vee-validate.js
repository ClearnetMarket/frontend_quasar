import { boot } from 'quasar/wrappers';
import { VeeValidate } from 'vee-validate';

export default boot(async (VeeValidate) => {
 Vue.use(VeeValidate)
})
