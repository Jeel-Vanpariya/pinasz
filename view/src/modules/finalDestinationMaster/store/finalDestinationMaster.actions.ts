import axios from 'axios';

export default {
  async saveFinalDestination(_: any, data: any) {
    try {
      const response = await axios.post('save-final-destination', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async getFinalDestination() {
    try {
      const response = await axios.post('get-final-destination');
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async deleteFinalDestination(_: any, data: any) {
    try {
      const response = await axios.post('delete-final-destination', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  }
};
