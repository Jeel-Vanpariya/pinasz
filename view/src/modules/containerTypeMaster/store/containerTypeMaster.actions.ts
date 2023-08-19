import axios from 'axios';

export default {
  async saveContainerType(_: any, data: any) {
    try {
      const response = await axios.post('save-container-type', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async getContainerType() {
    try {
      const response = await axios.post('get-container-type');
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async deleteContainerType(_: any, data: any) {
    try {
      const response = await axios.post('delete-container-type', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  }
};
