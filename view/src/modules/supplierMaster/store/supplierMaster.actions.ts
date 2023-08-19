import axios from 'axios';

export default {
  async saveSupplier(_: any, data: any) {
    try {
      const response = await axios.post('save-supplier', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async getAllSuppliers(_: any, data: any) {
    try {
      const response = await axios.post('get-all-suppliers', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async getSupplierForEdit(_: any, data: any) {
    try {
      const response = await axios.post('get-supplier-for-edit', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async deleteSupplier(_: any, data: any) {
    try {
      const response = await axios.post('delete-supplier', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  }
};
