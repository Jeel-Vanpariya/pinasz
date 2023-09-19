import { ref } from 'vue';

export default {
  countries: ref([]) as unknown as Array<any>,
  suppliers: ref([]) as unknown as Array<any>,
  buyers: ref([]) as unknown as Array<any>,
  customers: ref([]) as unknown as Array<any>,
  paymentTerms: ref([]) as unknown as Array<any>,
  currencies: ref([]) as unknown as Array<any>,
  loadingPorts: ref([]) as unknown as Array<any>,
  destinationPorts: ref([]) as unknown as Array<any>,
  finalDestinations: ref([]) as unknown as Array<any>,
  incoterms: ref([]) as unknown as Array<any>,
  modeOfTransport: ref([]) as unknown as Array<any>,
  invoiceParties: ref([]) as unknown as Array<any>,
  shippingLine: ref([]) as unknown as Array<any>,
  consignees: ref([]) as unknown as Array<any>,
  containerTypes: ref([]) as unknown as Array<any>,
  products: ref([]) as unknown as Array<any>,
  poDetails: ref([]) as unknown as Array<any>,
  containerDetails: ref([]) as unknown as Array<any>,
  formData: ref({}) as any
};
