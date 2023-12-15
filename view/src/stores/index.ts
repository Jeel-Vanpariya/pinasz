import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import { createStore } from 'vuex';
import { ref } from 'vue';
import shipmentMasterIndex from '../modules/shipmentMaster/store/shipmentMaster.index';
import reportMasterIndex from '../modules/reportMaster/store/reportMaster.index';
import roleMasterIndex from '../modules//roleMaster/store/roleMaster.index';

const store = createStore({
  state() {
    return {
      spinner: ref(false) as unknown as boolean,
      inspection: ['NO', 'BIVAC'],
      permission: {
        other: [],
        shipment: [],
        shipment_add: { preShipment: [], finance: [], logistics: [] },
        shipment_edit: { preShipment: [], finance: [], logistics: [] },
        customer: [],
        supplier: [],
        product: [],
        report: [],
        user: []
      } as any,
      ...shipmentMasterIndex,
      ...reportMasterIndex,
      ...roleMasterIndex
    };
  },
  mutations,
  actions,
  getters
});

export default store;
