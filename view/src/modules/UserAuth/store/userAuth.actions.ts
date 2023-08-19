import axios from 'axios';

export default {
  async login(_: any, data: any) {
    try {
      const response = await axios.post('user-login', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async checkUser(_: any, data: any) {
    try {
      const response = await axios.post('user-check', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  }
};
