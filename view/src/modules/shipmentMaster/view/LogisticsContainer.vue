<template>
  <div class="d-flex justify-content-end">
    <FileUpload class="mx-3" mode="basic" accept="text/csv" chooseLabel="Import CSV" :auto="true" customUpload @uploader="onUpload" />
    <download-csv :data="[sample_json]" name="sample.csv">
      <Button label="Sample CSV" icon="pi pi-cloud-download" severity="help" />
    </download-csv>
  </div>
  <Form ref="form" :validation-schema="schema" @submit="handleRowAdd">
    <div class="row mt-4 add__shipment">
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
    <DataTable :value="store.state.containerDetails" scrollHeight="300px" ref="dt" dataKey="id" :filters="filters" scrollable>
      <template #header>
        <div class="d-flex justify-content-end">
          <Button class="mx-3" icon="pi pi-external-link" label="Export" severity="secondary" @click="exportCSV" />
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
          <span class="pi pi-pencil" @click="handleRowEdit(slotProps.data)" />
        </template>
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
import FileUpload from 'primevue/fileupload';
import Papa from 'papaparse';

const toast = useToast();
const form = ref();
const dt = ref();
const schema = yup.object({
  container_no: yup.string().required('Please enter container'),
  container_type_id: yup.number().required('Please select container type'),
  item_id: yup.number().required('Please select product'),
  qty: yup.number().required('Please enter qty')
});
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const sample_json = {
  container_no: '',
  container_type: '',
  item_no: '',
  qty: ''
};

const handleRowEdit = (data: any) => {
  form.value.setValues(data);
};

const handleRowAdd = (data: any, { resetForm }: any) => {
  const po_product = store.state.poDetails.filter((item: any) => item.item_id == data.item_id)[0],
    qty = store.state.containerDetails.filter((item: any) => item.item_id == data.item_id).reduce((a: any, b: any) => a + b.qty, 0),
    containerDetail = store.state.containerDetails.filter((item) => item.container_no == data.container_no && item.item_id == data.item_id)[0];
  if (po_product.qty >= qty + data.qty) {
    if (containerDetail) {
      const index = store.state.containerDetails.findIndex((item) => item.id == containerDetail.id);
      store.state.containerDetails[index].type_name = store.state.containerTypes.filter((item) => item.id == data.container_type_id)[0].type_name;
      store.state.containerDetails[index].container_type_id = data.container_type_id;
      store.state.containerDetails[index].qty = data.qty;
    } else {
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
    }
    resetForm();
    return;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: `Max available qty is ${po_product.qty - qty}`, life: 2500 });
};

const onUpload = (e: any) => {
  Papa.parse(e.files[0], {
    header: true,
    skipEmptyLines: true,
    complete: async (res: any) => {
      if (Object.keys(sample_json).filter((item: string) => res.meta.fields.indexOf(item) == -1).length == 0) {
        for (const object of res.data) {
          for (const key in object) {
            if (object[key].replace(/\s/g, '').length == 0) {
              toast.add({ severity: 'error', summary: 'Error Message', detail: 'Some of fields found empty in CSV', life: 3000 });
              return;
            }
          }
        }
        for (const object of res.data) {
          const containerType = store.state.containerTypes.filter((item) => item.type_name.replace(/\s/g, '').toLowerCase() == object.container_type.replace(/\s/g, '').toLowerCase())[0];
          const poDetails = store.state.poDetails.filter((item) => item.item_name.includes(object.item_no))[0];
          const containerDetail = store.state.containerDetails.filter((item) => item.container_no == object.container_no && item.item_name.includes(object.item_no))[0];

          if (containerDetail) {
            containerDetail.qty += Math.trunc(object.qty);
            if (poDetails.qty < containerDetail.qty) containerDetail.qty = poDetails.qty;
          } else if (poDetails && containerType) {
            store.state.containerDetails.push({
              id: `${Math.floor(1000 + Math.random() * 9000)}`,
              type_name: containerType.type_name,
              container_type_id: containerType.id,
              item_name: poDetails.item_name,
              item_id: poDetails.item_id,
              container_no: object.container_no,
              qty: Math.trunc(object.qty) <= poDetails.qty ? Math.trunc(object.qty) : poDetails.qty,
              uom: poDetails.uom
            });
          }
        }
        return;
      }
      toast.add({ severity: 'error', summary: 'Error Message', detail: 'Invalid CSV', life: 3000 });
    }
  });
};

const exportCSV = () => {
  dt.value.exportCSV();
};

const handleRowDelete = (index: number) => {
  store.state.containerDetails.splice(index, 1);
};
</script>
