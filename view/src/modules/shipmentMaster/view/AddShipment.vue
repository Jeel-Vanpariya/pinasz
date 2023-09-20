<template>
  <Panel class="p-4">
    <template #header>
      <div class="d-flex align-items-center">
        <Button icon="pi pi-arrow-left" text raised rounded @click="onCancel" />
        <span class="fw-bold mx-4">{{ route.params.id ? 'Edit Shipment' : 'Add Shipment' }}</span>
      </div>
    </template>
    <template #icons>
      <Button v-tooltip.bottom="'Refresh Masters'" icon="pi pi-refresh" severity="success" text raised rounded @click="refreshMasters" />
    </template>
    <Form ref="form" class="add__shipment" :validation-schema="schema" @submit="onSubmit">
      <TabView v-model:activeIndex="active">
        <TabPanel>
          <template #header>
            <span>Pre Shipment</span>
            <i class="mdi mdi-multiplication ms-1 text-danger" />
          </template>
          <Preshipment @getFormValues="getFormValues" @setFormValues="setFormValues" />
          <Divider />
          <PreshipmentContainer @getFormValues="getFormValues" />
        </TabPanel>
        <TabPanel>
          <template #header>
            <span>Finance</span>
          </template>
          <Finance />
        </TabPanel>
        <TabPanel>
          <template #header>
            <span>Logistics</span>
            <i class="mdi mdi-multiplication ms-1 text-danger" />
          </template>
          <Logistics />
          <Divider />
          <LogisticsContainer />
        </TabPanel>
      </TabView>
      <div class="row mt-4 add__shipment">
        <div class="col-md text-center">
          <Button label="Save" icon="pi pi-save" class="mx-4" type="submit" />
          <Button label="Cancel" icon="pi pi-times" severity="danger" @click="onCancel" />
        </div>
      </div>
    </Form>
  </Panel>
  <Toast />
</template>
<script lang="ts" setup>
import Button from 'primevue/button';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import { ref, onMounted } from 'vue';
import { Form } from 'vee-validate';
import * as yup from 'yup';
import store from '../../../stores/index';
import Panel from 'primevue/panel';
import router from '../../../router/index';
import { useToast } from 'primevue/usetoast';
import { useRoute } from 'vue-router';
import Toast from 'primevue/toast';
import Divider from 'primevue/divider';
import Preshipment from './Preshipment.vue';
import PreshipmentContainer from './PreshipmentContainer.vue';
import Finance from './Finance.vue';
import Logistics from './Logistics.vue';
import LogisticsContainer from './LogisticsContainer.vue';

const route = useRoute();
const toast = useToast();
const form = ref();
const active = ref(0);
const schema = yup.object({
  country_id: yup.number().required('Please select country'),
  po_no: yup.string().required('Please enter po no.'),
  supp_po_date: yup.date().required('Please select a supplier po date'),
  supplier_id: yup.number().required('Please select a supplier'),
  invoicing_party_id: yup.number().required('Please select a invoicing party'),
  our_po_date: yup.date().required('Please select a our po date'),
  our_po_no: yup.string().required('Please select a our po number'),
  buyer_id: yup.number().required('Please select a buyer'),
  customer_id: yup.number().required('Please select a customer'),
  cust_po_no: yup.array(),
  payment_term_id: yup.number().required('Please select a payment terms'),
  supp_po_value: yup.number().required('Please select a supp po value'),
  sup_po_no: yup.string().required('Please enter supplier po number'),
  currency_id: yup.number().required('Please select currency'),
  loading_port_id: yup.number().required('Please select a loading port'),
  destination_port_id: yup.number().required('Please select a destination port'),
  final_destination_id: yup.number().required('Please select a final destination'),
  number_of_container: yup.string().required('Please enter container'),
  incoterm_id: yup.number(),
  mode_of_transport_id: yup.number(),

  adv_rec_date: yup.date(),
  adv_pay_date: yup.date(),
  purchase_invoice: yup.string(),
  sale_invoice_val: yup.number(),
  sale_invoice_val_currency_id: yup.number(),
  sale_inv_no: yup.string(),
  s_f_inv_no: yup.string(),
  s_final_inv_value: yup.number(),
  s_final_inv_value_currency_id: yup.number(),
  final_rec_date: yup.date(),
  final_pay_date: yup.date(),
  percentage: yup.number(),
  commission: yup.number(),
  share: yup.number(),
  payment_request_lot: yup.string(),
  shipping_line_id: yup.number(),

  dhl_no: yup.string(),
  inspection: yup.string().required('Please select a inspection'),
  cod_number: yup.string(),
  rfi_date: yup.date(),
  consignee_id: yup.number(),
  freight_booking_date: yup.date(),
  freight_booking_no: yup.string(),
  estimated_dob: yup.date(),
  revised_dob: yup.date(),
  actual_dob: yup.date(),
  scan_bl_date: yup.date(),
  stuf_photo: yup.date(),
  est_arriv_date: yup.date(),
  bl_no: yup.string(),
  remarks: yup.string(),
  draft_cnca: yup.date(),
  original_cnca: yup.date(),
  cnca_agent_id: yup.number(),
  dup: yup.date()
});

onMounted(async () => {
  await refreshMasters();
  form.value.resetForm();
  if (route.params.id) await getShipmentForEdit();
});

const refreshMasters = async () => {
  store.state.spinner = true;
  await getCountries();
  await getCurrencies();
  await getSuppliers();
  await getBuyers();
  await getCustomers();
  await getInvoicingParty();
  await getPaymentTerm();
  await getLoadingPort();
  await getDestinationPort();
  await getFinalDestination();
  await getConsignee();
  await getContainerType();
  await getShippingLine();
  await getIncoterm();
  await getModeOfTransport();
  store.state.spinner = false;
};

const getCountries = async () => {
  const res = await store.dispatch('getCountries');
  if (res.status == 'success') {
    store.state.countries = res.data;
  }
};

const getCurrencies = async () => {
  const res = await store.dispatch('getCurrencies');
  if (res.status == 'success') {
    store.state.currencies = res.data;
  }
};

const getSuppliers = async () => {
  const res = await store.dispatch('getSuppliers');
  if (res.status == 'success') {
    store.state.suppliers = res.data;
  }
};

const getBuyers = async () => {
  const res = await store.dispatch('getBuyers');
  if (res.status == 'success') {
    store.state.buyers = res.data;
  }
};

const getCustomers = async () => {
  const res = await store.dispatch('getCustomers');
  if (res.status == 'success') {
    store.state.customers = res.data;
  }
};

const getInvoicingParty = async () => {
  const res = await store.dispatch('getInvoicingParty');
  if (res.status == 'success') {
    store.state.invoiceParties = res.data;
  }
};

const getPaymentTerm = async () => {
  store.state.paymentTerms = [];
  const res = await store.dispatch('getPaymentTerm');
  if (res.status == 'success' && res.data.length > 0) {
    for (const object of res.data) {
      store.state.paymentTerms.push(`${object.advance_percentage}% ${object.advance_text} - ${object.pending_percentage}% ${object.pending_text}`);
    }
  }
};

const getLoadingPort = async () => {
  const res = await store.dispatch('getLoadingPort');
  if (res.status == 'success') {
    store.state.loadingPorts = res.data;
  }
};

const getDestinationPort = async () => {
  const res = await store.dispatch('getDestinationPort');
  if (res.status == 'success') {
    store.state.destinationPorts = res.data;
  }
};

const getFinalDestination = async () => {
  const res = await store.dispatch('getFinalDestination');
  if (res.status == 'success') {
    store.state.finalDestinations = res.data;
  }
};

const getIncoterm = async () => {
  const res = await store.dispatch('getIncoterm');
  if (res.status == 'success') {
    store.state.incoterms = res.data;
  }
};

const getModeOfTransport = async () => {
  const res = await store.dispatch('getModeOfTransport');
  if (res.status == 'success') {
    store.state.modeOfTransport = res.data;
  }
};

const getConsignee = async () => {
  const res = await store.dispatch('getConsignee');
  if (res.status == 'success') {
    store.state.consignees = res.data;
  }
};

const getContainerType = async () => {
  const res = await store.dispatch('getContainerType');
  if (res.status == 'success') {
    store.state.containerTypes = res.data;
  }
};

const getShippingLine = async () => {
  const res = await store.dispatch('getShippingLine');
  if (res.status == 'success') {
    store.state.shippingLine = res.data;
  }
};

const getShipmentForEdit = async () => {
  store.state.spinner = true;
  const res = await store.dispatch('getShipmentForEdit', { id: route.params.id });
  store.state.spinner = false;
  if (res.status == 'success') {
    if (res.data.cust_po_no) res.data.cust_po_no = JSON.parse(res.data.cust_po_no);
    if (!res.data.sale_invoice_val) delete res.data.sale_invoice_val;
    if (!res.data.sale_invoice_val_currency) delete res.data.sale_invoice_val_currency;
    if (!res.data.sale_inv_no) delete res.data.sale_inv_no;
    if (!res.data.s_f_inv_no) delete res.data.s_f_inv_no;
    if (!res.data.s_final_inv_value) delete res.data.s_final_inv_value;
    if (!res.data.s_final_inv_value_currency) delete res.data.s_final_inv_value_currency;
    if (!res.data.purchase_invoice) delete res.data.purchase_invoice;
    if (!res.data.percentage) delete res.data.percentage;
    if (!res.data.commission) delete res.data.commission;
    if (!res.data.share) delete res.data.share;
    if (!res.data.payment_request_lot) delete res.data.payment_request_lot;
    if (!res.data.dhl_no) delete res.data.dhl_no;
    if (!res.data.cod_number) delete res.data.cod_number;
    if (!res.data.consignee_id) delete res.data.consignee_id;
    if (!res.data.freight_booking_no) delete res.data.freight_booking_no;
    if (!res.data.shipping_line_id) delete res.data.shipping_line_id;
    if (!res.data.bl_no) delete res.data.bl_no;
    if (!res.data.remarks) delete res.data.remarks;
    if (!res.data.supp_po_date) delete res.data.supp_po_date;
    if (!res.data.our_po_date) delete res.data.our_po_date;
    if (!res.data.adv_rec_date) delete res.data.adv_rec_date;
    if (!res.data.adv_pay_date) delete res.data.adv_pay_date;
    if (!res.data.final_rec_date) delete res.data.final_rec_date;
    if (!res.data.final_pay_date) delete res.data.final_pay_date;
    if (!res.data.rfi_date) delete res.data.rfi_date;
    if (!res.data.freight_booking_date) delete res.data.freight_booking_date;
    if (!res.data.estimated_dob) delete res.data.estimated_dob;
    if (!res.data.revised_dob) delete res.data.revised_dob;
    if (!res.data.actual_dob) delete res.data.actual_dob;
    if (!res.data.scan_bl_date) delete res.data.scan_bl_date;
    if (!res.data.stuf_photo) delete res.data.stuf_photo;
    if (!res.data.est_arriv_date) delete res.data.est_arriv_date;
    if (!res.data.supp_po_date) delete res.data.supp_po_date;
    if (!res.data.draft_cnca) delete res.data.draft_cnca;
    if (!res.data.original_cnca) delete res.data.original_cnca;
    if (!res.data.dup) delete res.data.dup;

    if (res.data.our_po_date) res.data.our_po_date = new Date(res.data.our_po_date);
    if (res.data.adv_rec_date) res.data.adv_rec_date = new Date(res.data.adv_rec_date);
    if (res.data.adv_pay_date) res.data.adv_pay_date = new Date(res.data.adv_pay_date);
    if (res.data.final_rec_date) res.data.final_rec_date = new Date(res.data.final_rec_date);
    if (res.data.final_pay_date) res.data.final_pay_date = new Date(res.data.final_pay_date);
    if (res.data.rfi_date) res.data.rfi_date = new Date(res.data.rfi_date);
    if (res.data.freight_booking_date) res.data.freight_booking_date = new Date(res.data.freight_booking_date);
    if (res.data.estimated_dob) res.data.estimated_dob = new Date(res.data.estimated_dob);
    if (res.data.revised_dob) res.data.revised_dob = new Date(res.data.revised_dob);
    if (res.data.actual_dob) res.data.actual_dob = new Date(res.data.actual_dob);
    if (res.data.scan_bl_date) res.data.scan_bl_date = new Date(res.data.scan_bl_date);
    if (res.data.stuf_photo) res.data.stuf_photo = new Date(res.data.stuf_photo);
    if (res.data.est_arriv_date) res.data.est_arriv_date = new Date(res.data.est_arriv_date);
    if (res.data.draft_cnca) res.data.draft_cnca = new Date(res.data.draft_cnca);
    if (res.data.original_cnca) res.data.original_cnca = new Date(res.data.original_cnca);
    if (res.data.dup) res.data.dup = new Date(res.data.dup);
    
    form.value.setValues(res.data);

    const supplier = store.state.suppliers.filter((item) => item.id == res.data.supplier_id)[0];
    store.state.products = supplier.items;
    for (const object of res.po_details) {
      object.items = supplier.items;
      object.supplier_name = supplier.supplier_name;
      object.item_name = store.state.products.filter((item: any) => item.id == object.item_id)[0].item_name;
      object.uom = store.state.products.filter((item: any) => item.id == object.item_id)[0].uom;
      object.currency = store.state.currencies.filter((item) => item.id == res.data.currency_id)[0].name;
    }
    store.state.poDetails = res.po_details;

    if (res.container_details.length > 0) {
      for (const object of res.container_details) {
        object.type_name = store.state.containerTypes.filter((item) => item.id == object.container_type_id)[0].type_name;
        object.item_name = store.state.products.filter((item: any) => item.id == object.item_id)[0].item_name;
        object.uom = store.state.products.filter((item: any) => item.id == object.item_id)[0].uom;
      }
      store.state.containerDetails = res.container_details;
    }
  }
};

const getFormValues = () => {
  store.state.formData = form.value.getValues();
};

const setFormValues = (field: string, value: any) => {
  form.value.setFieldValue(field, value, false);
};

const checkShipmentCounter = async () => {
  const country: string = store.state.countries.filter((item: any) => item.id == form.value.getValues().country_id)[0].code;
  const str = form.value.getValues().po_no.toUpperCase();
  const charCount = (str.match(new RegExp('[a-zA-Z]', 'g')) || []).length;
  const numCount = (str.match(new RegExp('[0-9]', 'g')) || []).length;
  const specificCharCount = str.match(new RegExp(country, 'g')) || [];

  if (
    specificCharCount.length == 0 ||
    specificCharCount.length > 1 ||
    specificCharCount[0].length != country.length ||
    charCount != country.length ||
    charCount == 0 ||
    numCount == 0 ||
    numCount > 6 ||
    numCount < 6
  ) {
    toast.add({ severity: 'error', summary: 'Error Message', detail: 'Invalid PO no.', life: 2500 });
    return false;
  }

  store.state.spinner = false;
  const res = await store.dispatch('checkShipmentCounter', { po_no: str, id: route.params.id });
  store.state.spinner = false;
  if (res.status == 'success') {
    if (!res.data) return true;
    toast.add({ severity: 'error', summary: 'Error Message', detail: 'Please regenerate PO no.', life: 2500 });
    return false;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong unable to check PO no.', life: 2500 });
  return false;
};

const onSubmit = async (data: any, { resetForm }: any) => {
  console.log(data);
  
  let error = false;
  const res = await checkShipmentCounter();
  if (!res) {
    active.value = 0;
    error = true;
    return;
  }
  if (store.state.poDetails.length == 0) {
    toast.add({ severity: 'error', summary: 'Error Message', detail: 'Please add items in po details', life: 2500 });
    active.value = 0;
    error = true;
    return;
  }
  let total = 0;
  for (const object of store.state.poDetails) {
    if (object.qty == 0) {
      toast.add({ severity: 'error', summary: 'Error Message', detail: 'Please enter quantity in container wise', life: 2500 });
      error = true;
      return;
    }
    if (object.price == 0) {
      toast.add({ severity: 'error', summary: 'Error Message', detail: 'Please enter price in container wise', life: 2500 });
      error = true;
      return;
    }
    total += object.qty * object.price;
  }
  if (data.percentage) {
    data.commission = (total * (data.percentage / 100)).toFixed(2);
    data.share = (data.commission / 2).toFixed(2);
  }

  if (!error) {
    const res = await store.dispatch('saveShipment', {
      id: route.params.id ? Number(route.params.id) : '0',
      data: data,
      po_details: store.state.poDetails,
      container_details: store.state.containerDetails
    });
    if (res.status == 'success') {
      toast.add({ severity: 'success', summary: 'Success Message', detail: 'Successfully saved', life: 2500 });
      resetForm();
      onCancel();
      return;
    }
    toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong unable to save operation', life: 2500 });
  }
};

const onCancel = () => {
  router.push({ name: 'ShipmentList' });
};
</script>
<style lang="scss">
.add__shipment {
  input,
  textarea,
  .p-calendar,
  .p-dropdown,
  .p-chips,
  .p-chips-multiple-container {
    width: 100%;
  }
  .p-inputnumber {
    display: block;
  }
}
</style>
