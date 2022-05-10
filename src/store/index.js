import { createStore } from 'vuex';
// eslint-disable-next-line import/no-cycle
import router from '../router';

export default createStore({
  state: {
    token: JSON.parse(localStorage.getItem('token')),
    connectedUser: JSON.parse(localStorage.getItem('connectedUser')),
  },
  mutations: {
    /* eslint-disable no-param-reassign */
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', JSON.stringify(token));
    },
    REMOVE_TOKEN(state) {
      state.token = null;
      localStorage.setItem('token', JSON.stringify(null));
    },
    SET_CONNECTED_USER(state, user) {
      console.log(user);
      state.connectedUser = user;
      localStorage.setItem('connectedUser', JSON.stringify(user));
    },
    REMOVE_CONNECTED_USER(state) {
      state.connectedUser = null;
      localStorage.setItem('connectedUser', JSON.stringify(null));
    },
    /* eslint-enable no-param-reassign */
  },
  actions: {
    saveToken(context, token) {
      context.commit('SET_TOKEN', token);
    },
    saveConnectedUser(context, user) {
      console.log(user);
      context.commit('SET_CONNECTED_USER', user);
    },
    logout(context) {
      context.commit('REMOVE_TOKEN');
      context.commit('REMOVE_CONNECTED_USER');
      router.push({ name: 'Login' });
    },
  },
});
