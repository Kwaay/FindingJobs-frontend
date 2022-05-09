import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';
// eslint-disable-next-line import/no-cycle
import router from '../router';

const vuexLocal = new VuexPersistence({
  reducer(state) {
    return {
      token: state.token,
      connectedUser: state.connectedUser,
    };
  },
  storage: window.localStorage,
});

export default createStore({
  plugins: [vuexLocal.plugin],
  state: { token: null, connectedUser: null },
  mutations: {
    /* eslint-disable no-param-reassign */
    SET_TOKEN(state, token) {
      state.token = token;
    },
    REMOVE_TOKEN(state) {
      state.token = null;
    },
    SET_CONNECTED_USER(state, user) {
      state.connectedUser = user;
    },
    REMOVE_CONNECTED_USER(state) {
      state.connectedUser = null;
    },
    /* eslint-enable no-param-reassign */
  },
  actions: {
    saveToken(context, token) {
      context.commit('SET_TOKEN', token);
    },
    saveConnectedUser(context, user) {
      context.commit('SET_CONNECTED_USER', user);
    },
    logout(context) {
      context.commit('REMOVE_TOKEN');
      context.commit('REMOVE_CONNECTED_USER');
      router.push({ name: 'Login' });
    },
  },
});
