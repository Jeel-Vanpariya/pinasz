import axios from 'axios';

export default {
  async saveConsignee(_: any, data: any) {
    try {
      const response = await axios.post('save-consignee', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async getConsignee() {
    try {
      const response = await axios.post('get-consignee');
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async getConsigneeForEdit(_: any, data: any) {
    try {
      const response = await axios.post('get-consignee-for-edit', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async deleteConsignee(_: any, data: any) {
    try {
      const response = await axios.post('delete-consignee', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  }
};
