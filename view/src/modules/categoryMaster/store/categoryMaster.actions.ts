import axios from 'axios';

export default {
  async saveCategory(_: any, data: any) {
    try {
      const response = await axios.post('save-product-category', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async getCategory() {
    try {
      const response = await axios.post('get-product-category');
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async deleteCategory(_: any, data: any) {
    try {
      const response = await axios.post('delete-product-category', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  }
};
