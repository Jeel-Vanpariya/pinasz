import axios from 'axios';

export default {
  async saveInvoicingParty(_: any, data: any) {
    try {
      const response = await axios.post('save-invoicing-party', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async getInvoicingParty() {
    try {
      const response = await axios.post('get-invoicing-party');
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async deleteInvoicingParty(_: any, data: any) {
    try {
      const response = await axios.post('delete-invoicing-party', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  }
};
