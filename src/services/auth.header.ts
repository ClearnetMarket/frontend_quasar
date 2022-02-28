import { Cookies } from 'quasar'
export default function authHeader () {
    let user_token = Cookies.get('user_token')
    let auth_token = Cookies.get('auth_token')
    if (user_token && auth_token) {
        return { 'Authorization': 'bearer ' + auth_token };
    } else {
        return {};
    }
}
