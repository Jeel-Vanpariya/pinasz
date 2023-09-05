import axios from 'axios';

export default {
  async generateSupplierCounter() {
    try {
      const response = await axios.post('generate-supplier-counter');
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async checkSupplierCounter(_: any, data: any) {
    try {
      const response = await axios.post('check-supplier-counter',data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
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
