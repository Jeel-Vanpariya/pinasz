<template>
  <div class="row mt-4 add__shipment__preshipment">
    <div class="col-md-4" :class="[store.state.permission.shipment_edit.preShipment.includes('country') && $route.params.id ? 'd-none' : '']">
      <Field name="country_id" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Dropdown
            id="country_id"
            :model-value="value"
            :options="store.state.countries"
            optionLabel="name"
            optionValue="id"
            filter
            :class="{ 'p-invalid': errorMessage }"
            @update:model-value="handleChange"
          />
          <label for="country_id">Country <i class="mdi mdi-multiplication text-danger" /></label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div class="col-md-4 row m-0 p-0" :class="[store.state.permission.shipment_edit.preShipment.includes('po_no') && $route.params.id ? 'd-none' : '']">
      <div class="col-md-10">
        <Field name="po_no" v-slot="{ value, errorMessage, handleChange }">
          <span class="p-float-label">
            <InputText id="po_no" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
            <label for="po_no">PO Number <i class="mdi mdi-multiplication text-danger" /></label>
          </span>
          <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
        </Field>
      </div>
      <div class="col-md">
        <Button v-tooltip.top="'Generate'" icon="pi pi-sync" severity="success" rounded outlined @click="generateShipmentCounter" />
      </div>
    </div>

    <div class="col-md-4" :class="[store.state.permission.shipment_edit.preShipment.includes('supp_po_date') && $route.params.id ? 'd-none' : '']">
      <Field name="supp_po_date" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Calendar id="supp_po_date" :model-value="value" showIcon dateFormat="dd-mm-yy" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="supp_po_date">Supp PO Date <i class="mdi mdi-multiplication text-danger" /></label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div class="col-md-4" :class="[store.state.permission.shipment_edit.preShipment.includes('supplier') && $route.params.id ? 'd-none' : '']">
      <Field name="supplier_id" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Dropdown
            id="supplier_id"
            :model-value="value"
            :options="store.state.suppliers"
            optionLabel="supplier_name"
            optionValue="id"
            filter
            :class="{ 'p-invalid': errorMessage }"
            @update:model-value="handleChange"
            @change="handleSelectChange"
          />
          <label for="supplier_id">Supplier <i class="mdi mdi-multiplication text-danger" /></label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div class="col-md-4" :class="[store.state.permission.shipment_edit.preShipment.includes('our_po_date') && $route.params.id ? 'd-none' : '']">
      <Field name="our_po_date" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Calendar id="our_po_date" :model-value="value" showIcon dateFormat="dd-mm-yy" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="our_po_date">Our PO Date <i class="mdi mdi-multiplication text-danger" /></label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div class="col-md-4" :class="[store.state.permission.shipment_edit.preShipment.includes('our_po_no') && $route.params.id ? 'd-none' : '']">
      <Field name="our_po_no" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <InputText id="our_po_no" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="our_po_no">Our PO No. <i class="mdi mdi-multiplication text-danger" /></label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div class="col-md-4" :class="[store.state.permission.shipment_edit.preShipment.includes('buyer') && $route.params.id ? 'd-none' : '']">
      <Field name="buyer_id" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Dropdown
            id="buyer_id"
            :model-value="value"
            :options="store.state.buyers"
            optionLabel="buyer_name"
            optionValue="id"
            filter
            :class="{ 'p-invalid': errorMessage }"
            @update:model-value="handleChange"
          />
          <label for="buyer_id">Buyer <i class="mdi mdi-multiplication text-danger" /></label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div class="col-md-4" :class="[store.state.permission.shipment_edit.preShipment.includes('customer') && $route.params.id ? 'd-none' : '']">
      <Field name="customer_id" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Dropdown
            id="customer_id"
            :model-value="value"
            :options="store.state.customers"
            optionLabel="group_name"
            optionValue="id"
            filter
            :class="{ 'p-invalid': errorMessage }"
            @update:model-value="handleChange"
          />
          <label for="customer_id">Customer <i class="mdi mdi-multiplication text-danger" /></label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div class="col-md-4" :class="[store.state.permission.shipment_edit.preShipment.includes('cust_po_no') && $route.params.id ? 'd-none' : '']">
      <Field name="cust_po_no" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Chips id="cust_po_no" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="cust_po_no">Cust PO No. <i class="mdi mdi-multiplication text-danger" /></label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div class="col-md-4" :class="[store.state.permission.shipment_edit.preShipment.includes('payment_term') && $route.params.id ? 'd-none' : '']">
      <Field name="payment_term_id" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Dropdown
            id="payment_term_id"
            :model-value="value"
            :options="store.state.paymentTerms"
            optionLabel="payment_term"
            optionValue="id"
            filter
            :class="{ 'p-invalid': errorMessage }"
            @update:model-value="handleChange"
          />
          <label for="payment_term_id">Payment Terms <i class="mdi mdi-multiplication text-danger" /></label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div class="col-md-4" :class="[store.state.permission.shipment_edit.preShipment.includes('supp_po_value') && $route.params.id ? 'd-none' : '']">
      <Field name="supp_po_value" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <InputText id="supp_po_value" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="supp_po_value">Supp PO Value <i class="mdi mdi-multiplication text-danger" /></label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div class="col-md-4" :class="[store.state.permission.shipment_edit.preShipment.includes('currency') && $route.params.id ? 'd-none' : '']">
      <Field name="currency_id" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Dropdown
            id="currency_id"
            :model-value="value"
            :options="store.state.currencies"
            optionLabel="name"
            optionValue="id"
            filter
            :class="{ 'p-invalid': errorMessage }"
            @update:model-value="handleChange"
          />
          <label for="currency_id">Currency <i class="mdi mdi-multiplication text-danger" /></label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div class="col-md-4" :class="[store.state.permission.shipment_edit.preShipment.includes('loading_port') && $route.params.id ? 'd-none' : '']">
      <Field name="loading_port_id" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Dropdown
            id="loading_port_id"
            :model-value="value"
            :options="store.state.loadingPorts"
            optionLabel="port_name"
            optionValue="id"
            filter
            :class="{ 'p-invalid': errorMessage }"
            @update:model-value="handleChange"
          />
          <label for="loading_port_id">Loading Ports <i class="mdi mdi-multiplication text-danger" /></label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div class="col-md-4" :class="[store.state.permission.shipment_edit.preShipment.includes('destination_port') && $route.params.id ? 'd-none' : '']">
      <Field name="destination_port_id" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Dropdown
            id="destination_port_id"
            :model-value="value"
            :options="store.state.destinationPorts"
            optionLabel="port_name"
            optionValue="id"
            filter
            :class="{ 'p-invalid': errorMessage }"
            @update:model-value="handleChange"
          />
          <label for="destination_port_id">Destination Port <i class="mdi mdi-multiplication text-danger" /></label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div class="col-md-4" :class="[store.state.permission.shipment_edit.preShipment.includes('final_destination') && $route.params.id ? 'd-none' : '']">
      <Field name="final_destination_id" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Dropdown
            id="final_destination_id"
            :model-value="value"
            :options="store.state.finalDestinations"
            optionLabel="destination_name"
            optionValue="id"
            filter
            :class="{ 'p-invalid': errorMessage }"
            @update:model-value="handleChange"
          />
          <label for="final_destination_id">Final Destination <i class="mdi mdi-multiplication text-danger" /></label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div class="col-md-4" :class="[store.state.permission.shipment_edit.preShipment.includes('number_of_container') && $route.params.id ? 'd-none' : '']">
      <Field name="number_of_container" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <InputText id="number_of_container" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="number_of_container">Number of containers <i class="mdi mdi-multiplication text-danger" /></label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div class="col-md-4" :class="[store.state.permission.shipment_edit.preShipment.includes('sup_po_no') && $route.params.id ? 'd-none' : '']">
      <Field name="sup_po_no" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <InputText id="sup_po_no" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="sup_po_no">Sup PO No. <i class="mdi mdi-multiplication text-danger" /></label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div class="col-md-4" :class="[store.state.permission.shipment_edit.preShipment.includes('incoterm') && $route.params.id ? 'd-none' : '']">
      <Field name="incoterm_id" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Dropdown
            id="incoterm_id"
            :model-value="value"
            :options="store.state.incoterms"
            optionLabel="name"
            optionValue="id"
            filter
            :class="{ 'p-invalid': errorMessage }"
            @update:model-value="handleChange"
          />
          <label for="incoterm_id">Incoterm</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div class="col-md-4" :class="[store.state.permission.shipment_edit.preShipment.includes('mode_of_transport') && $route.params.id ? 'd-none' : '']">
      <Field name="mode_of_transport_id" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Dropdown
            id="mode_of_transport_id"
            :model-value="value"
            :options="store.state.modeOfTransport"
            optionLabel="name"
            optionValue="id"
            filter
            :class="{ 'p-invalid': errorMessage }"
            @update:model-value="handleChange"
          />
          <label for="mode_of_transport_id">Mode of Transport</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div class="col-md-4" :class="[store.state.permission.shipment_edit.preShipment.includes('invoicing_party') && $route.params.id ? 'd-none' : '']">
      <Field name="invoicing_party_id" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Dropdown
            id="invoicing_party_id"
            :model-value="value"
            :options="store.state.invoiceParties"
            optionLabel="party_name"
            optionValue="id"
            filter
            :class="{ 'p-invalid': errorMessage }"
            @update:model-value="handleChange"
          />
          <label for="invoicing_party_id">Invoicing Party <i class="mdi mdi-multiplication text-danger" /></label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Field } from 'vee-validate';
import store from '../../../stores/index';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Chips from 'primevue/chips';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const emit = defineEmits(['getFormValues', 'setFormValues']);
const handleSelectChange = (e: any) => {
  store.state.products = store.state.suppliers.filter((item) => item.id == e.value)[0].items;
};

const generateShipmentCounter = async () => {
  emit('getFormValues');

  if (!store.state.formData.country_id) {
    toast.add({ severity: 'error', summary: 'Error Message', detail: 'Please select country', life: 2500 });
    return;
  }

  store.state.spinner = true;
  const res = await store.dispatch('generateShipmentCounter', {
    str: store.state.countries.filter((item: any) => item.id == store.state.formData.country_id)[0].code
  });
  store.state.spinner = false;
  if (res.status == 'success') {
    emit('setFormValues', 'po_no', res.data);
    return;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong unable to generate PO no.', life: 2500 });
};
</script>
<style lang="scss">
.add__shipment__preshipment {
  .col-md-4,
  .row {
    margin-bottom: 25px !important;
  }
}
</style>
