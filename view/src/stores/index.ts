import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import { createStore } from 'vuex';
import { ref } from 'vue';

const store = createStore({
  state() {
    return {
      spinner: ref(false) as unknown as boolean,
      currency: ['USD', 'Euro'],
      inspection: ['NO', 'BIVAC'],
    };
  },
  mutations,
  actions,
  getters
});

export default store;
