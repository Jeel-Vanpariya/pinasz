import customerMasterActions from '@/modules/customerMaster/store/customerMaster.actions';
import categoryMasterActions from '@/modules/categoryMaster/store/categoryMaster.actions';
import productsActions from '@/modules/productMaster/store/products.actions';
import supplierMasterActions from '@/modules/supplierMaster/store/supplierMaster.actions';
import userManagementActions from '@/modules/userMaster/store/userManagement.actions';
import shipmentMasterActions from '@/modules/shipmentMaster/store/shipmentMaster.actions';
import paymentTermMasterActions from '@/modules/paymentTermMaster/store/paymentTermMaster.actions';
import containerTypeMasterActions from '@/modules/containerTypeMaster/store/containerTypeMaster.actions';
import invoicingPartyMasterActions from '@/modules/invoicingPartyMaster/store/invoicingPartyMaster.actions';
import loadingPortsMasterActions from '@/modules/loadingPortMaster/store/loadingPortMaster.actions';
import destinationPortsMasterActions from '@/modules/destinationPortMaster/store/destinationPortMaster.actions';
import finalDestinationMasterActions from '@/modules/finalDestinationMaster/store/finalDestinationMaster.actions';
import consigneeMasterActions from '@/modules/consigneeMaster/store/consigneeMaster.actions';
import reportMasterActions from '@/modules/reportMaster/store/reportMaster.actions';
import userAuth from '@/modules/UserAuth/store/userAuth.actions';
import axios from 'axios';

export default {
  async getCountries() {
    try {
      const response = await axios.post('get-countries');
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  ...categoryMasterActions,
  ...productsActions,
  ...supplierMasterActions,
  ...customerMasterActions,
  ...userManagementActions,
  ...shipmentMasterActions,
  ...paymentTermMasterActions,
  ...containerTypeMasterActions,
  ...invoicingPartyMasterActions,
  ...loadingPortsMasterActions,
  ...destinationPortsMasterActions,
  ...finalDestinationMasterActions,
  ...consigneeMasterActions,
  ...userAuth,
  ...reportMasterActions
};
