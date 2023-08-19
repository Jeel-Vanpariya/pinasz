import axios from 'axios';

export default {
  async savePaymentTerm(_: any, data: any) {
    try {
      const response = await axios.post('save-payment-term', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async getPaymentTerm() {
    try {
      const response = await axios.post('get-payment-term');
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async deletePaymentTerm(_: any, data: any) {
    try {
      const response = await axios.post('delete-payment-term', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  }
};
