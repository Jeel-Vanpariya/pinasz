import axios from 'axios';

export default {
  async generateProductCounter() {
    try {
      const response = await axios.post('generate-product-counter');
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async checkProductCounter(_: any, data: any) {
    try {
      const response = await axios.post('check-product-counter',data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async getProductCategories() {
    try {
      const response = await axios.post('get-product-categories');
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async getProductSuppliers() {
    try {
      const response = await axios.post('get-product-suppliers');
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async saveProduct(_: any, data: any) {
    try {
      const response = await axios.post('save-product', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async saveProductFromCSV(_: any, data: any) {
    try {
      const response = await axios.post('save-products-from-csv', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async getProducts() {
    try {
      const response = await axios.post('get-products');
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async getProductForEdit(_: any, data: any) {
    try {
      const response = await axios.post('get-product-for-edit', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async deleteProduct(_: any, data: any) {
    try {
      const response = await axios.post('delete-product', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  }
};
