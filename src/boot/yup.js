import { boot } from 'quasar/wrappers';
import { yup } from 'yup';

export default boot(async (yup) => {
 Vue.use(yup)
})
