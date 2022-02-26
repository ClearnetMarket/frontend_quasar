
const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const Auth = {
    state: initialState,
    getters: {
        user: (state) => {
            return state.user;
        }
    },
    actions: {
        user (context, user) {
            context.commit('user', user);
        }
    },
    mutations: {
        user (state, user) {
            state.user = user;
        }
    },
  
   
}

export default Auth;