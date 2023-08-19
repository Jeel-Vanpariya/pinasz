import axios from 'axios';

export default {
  async saveDestinationPort(_: any, data: any) {
    try {
      const response = await axios.post('save-destination-port', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async getDestinationPort() {
    try {
      const response = await axios.post('get-destination-port');
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async deleteDestinationPort(_: any, data: any) {
    try {
      const response = await axios.post('delete-destination-port', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  }
};
