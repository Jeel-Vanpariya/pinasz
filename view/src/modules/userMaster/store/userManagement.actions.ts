import axios from 'axios';

export default {
  async saveUser(_: any, data: any) {
    try {
      const response = await axios.post('save-user', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async getUsers() {
    try {
      const response = await axios.post('get-users');
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async deleteUser(_: any, data: any) {
    try {
      const response = await axios.post('delete-users', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  }
};
