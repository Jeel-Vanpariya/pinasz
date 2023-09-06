import axios from 'axios';

export default {
  async generateCustomerCounter() {
    try {
      const response = await axios.post('generate-customer-counter');
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async checkCustomerCounter(_: any, data: any) {
    try {
      const response = await axios.post('check-customer-counter',data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async saveCustomer(_: any, data: any) {
    try {
      const response = await axios.post('save-customer', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async getAllCustomers() {
    try {
      const response = await axios.post('get-all-customers');
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async getCustomerForEdit(_: any, data: any) {
    try {
      const response = await axios.post('get-customer-for-edit', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async saveCustomerFromCSV(_: any, data: any) {
    try {
      const response = await axios.post('save-customers-from-csv', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async deleteCustomer(_: any, data: any) {
    try {
      const response = await axios.post('delete-customer', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  }
};
