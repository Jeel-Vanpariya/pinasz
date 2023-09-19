import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import { createStore } from 'vuex';
import { ref } from 'vue';
import shipmentMasterIndex from '../modules/shipmentMaster/store/shipmentMaster.index'

const store = createStore({
  state() {
    return {
      spinner: ref(false) as unknown as boolean,
      inspection: ['NO', 'BIVAC'],
      ...shipmentMasterIndex
    };
  },
  mutations,
  actions,
  getters
});

export default store;
