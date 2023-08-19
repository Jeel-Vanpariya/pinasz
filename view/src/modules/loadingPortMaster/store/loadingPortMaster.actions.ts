import axios from 'axios';

export default {
  async saveLoadingPort(_: any, data: any) {
    try {
      const response = await axios.post('save-loading-port', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async getLoadingPort() {
    try {
      const response = await axios.post('get-loading-port');
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async deleteLoadingPort(_: any, data: any) {
    try {
      const response = await axios.post('delete-loading-port', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  }
};
