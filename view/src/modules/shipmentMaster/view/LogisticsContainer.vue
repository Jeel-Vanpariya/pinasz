<template>
  <Form :validation-schema="schema" @submit="handleRowAdd">
    <div class="row mt-5 add__shipment">
      <div class="col-md-3">
        <Field name="container_no" v-slot="{ value, errorMessage, handleChange }">
          <span class="p-float-label">
            <InputText id="container_no" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
            <label for="container_no">Container No.</label>
          </span>
          <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
        </Field>
      </div>
      <div class="col-md-3">
        <Field name="container_type_id" v-slot="{ value, errorMessage, handleChange }">
          <span class="p-float-label">
            <Dropdown
              id="container_type_id"
              :options="store.state.containerTypes"
              option-label="type_name"
              option-value="id"
              filter
              :model-value="value"
              :class="{ 'p-invalid': errorMessage }"
              @update:model-value="handleChange"
            />
            <label for="container_type_id">Container Type</label>
          </span>
          <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
        </Field>
      </div>
      <div class="col-md-3">
        <Field name="item_id" v-slot="{ value, errorMessage, handleChange }">
          <span class="p-float-label">
            <Dropdown
              id="item_id"
              :options="store.state.poDetails"
              option-label="item_name"
              option-value="item_id"
              filter
              :model-value="value"
              :class="{ 'p-invalid': errorMessage }"
              @update:model-value="handleChange"
            />
            <label for="item_id">Products</label>
          </span>
          <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
        </Field>
      </div>
      <div class="col-md-2">
        <Field name="qty" v-slot="{ value, errorMessage, handleChange }">
          <span class="p-float-label">
            <InputNumber id="qty" input-id="integeronly" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
            <label for="qty">Qty</label>
          </span>
          <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
        </Field>
      </div>
      <div class="col-md">
        <Button label="Add" icon="pi pi-plus" type="submit" />
      </div>
    </div>
  </Form>
  <div class="mt-4">
    <DataTable :value="store.state.containerDetails" dataKey="id" :filters="filters">
      <template #header>
        <div class="d-flex justify-content-end">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
          </span>
        </div>
      </template>
      <Column field="container_no" header="Container No.">
        <template #body="{ data }">{{ data.container_no }}</template>
      </Column>
      <Column field="type_name" header="Container type">
        <template #body="{ data }">{{ data.type_name }}</template>
      </Column>
      <Column field="item_name" header="Item name">
        <template #body="{ data }">{{ data.item_name }}</template>
      </Column>
      <Column field="qty" header="Qty">
        <template #body="{ data }">{{ data.qty }}</template>
      </Column>
      <Column field="uom" header="UOM">
        <template #body="{ data }">{{ data.uom }}</template>
      </Column>
      <Column :exportable="false" alignFrozen="right" :frozen="true">
        <template #body="slotProps">
          <span class="pi pi-trash" @click="handleRowDelete(slotProps.index)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { Field, Form } from 'vee-validate';
import store from '../../../stores/index';
import { ref } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import * as yup from 'yup';
import { useToast } from 'primevue/usetoast';
import InputNumber from 'primevue/inputnumber';

const toast = useToast();
const schema = yup.object({
  container_no: yup.string().required('Please enter container'),
  container_type_id: yup.number().required('Please select container type'),
  item_id: yup.number().required('Please select product'),
  qty: yup.number().required('Please enter qty')
});
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});


const handleRowAdd = (data: any, { resetForm }: any) => {
  const po_product = store.state.poDetails.filter((item: any) => item.item_id == data.item_id)[0],
    qty = store.state.containerDetails.filter((item: any) => item.item_id == data.item_id).reduce((a: any, b: any) => a + b.qty, 0);
  if (po_product.qty >= qty + data.qty) {
    store.state.containerDetails.push({
      id: `${Math.floor(1000 + Math.random() * 9000)}`,
      type_name: store.state.containerTypes.filter((item) => item.id == data.container_type_id)[0].type_name,
      container_type_id: data.container_type_id,
      item_name: po_product.item_name,
      item_id: data.item_id,
      container_no: data.container_no,
      qty: data.qty,
      uom: po_product.uom
    });
    resetForm();
    return;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: `Max available qty is ${po_product.qty - qty}`, life: 2500 });
};

const handleRowDelete = (index: number) => {
  store.state.containerDetails.splice(index, 1);
};
</script>
