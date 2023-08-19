import axios from 'axios';

export default {
  async getMasters() {
    try {
      const response = await axios.post('get-masters');
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async saveUser(_: any, data: any) {
    try {
      const response = await axios.post('save-user', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  }
};
