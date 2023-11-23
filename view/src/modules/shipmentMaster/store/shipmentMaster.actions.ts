import axios from 'axios';

export default {
  async generateShipmentCounter(_: any, data: any) {
    try {
      const response = await axios.post('generate-shipment-counter', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async checkShipmentCounter(_: any, data: any) {
    try {
      const response = await axios.post('check-shipment-counter', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async getSuppliers() {
    try {
      const response = await axios.post('get-suppliers');
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async getBuyers() {
    try {
      const response = await axios.post('get-buyers');
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async getCustomers() {
    try {
      const response = await axios.post('get-customers');
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async getPaymentTerms() {
    try {
      const response = await axios.post('get-payment-terms');
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async saveShipment(_: any, data: any) {
    try {
      const response = await axios.post('save-shipment', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async getShipments() {
    try {
      const response = await axios.post('get-shipments');
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async getShipmentDetails(_: any, data: any) {
    try {
      const response = await axios.post('get-shipment-details', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async getShipmentForEdit(_: any, data: any) {
    try {
      const response = await axios.post('get-shipment-for-edit', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async deleteShipment(_: any, data: any) {
    try {
      const response = await axios.post('delete-shipment', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async deleteAttachments(_: any, data: any) {
    try {
      const response = await axios.post('delete-attachments', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  }
};
