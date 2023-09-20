<template>
  <Form :validation-schema="schema" @submit="handleRowAdd">
    <div class="row mt-5 add__shipment">
      <div class="col-md-3">
        <Field name="item_id" v-slot="{ value, errorMessage, handleChange }">
          <span class="p-float-label">
            <Dropdown
              id="item_id"
              :options="store.state.products"
              option-label="item_name"
              option-value="id"
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
      <div class="col-md">
        <Button label="Add" icon="pi pi-plus" type="submit" />
      </div>
      <div class="col-md d-flex justify-content-end">
        <FileUpload class="mx-3" mode="basic" accept="text/csv" chooseLabel="Import CSV" :auto="true" customUpload @uploader="onUpload" />
        <download-csv :data="[sample_json]" name="sample.csv">
          <Button label="Sample CSV" icon="pi pi-cloud-download" severity="help" />
        </download-csv>
      </div>
    </div>
  </Form>
  <div class="mt-4">
    <DataTable
      v-model:editingRows="editingRows"
      :value="store.state.poDetails"
      ref="dt"
      editMode="row"
      dataKey="id"
      tableClass="editable-cells-table"
      :filters="filters"
      @row-edit-save="onRowEditSave"
    >
      <template #header>
        <div class="d-flex justify-content-end">
          <Button class="mx-3" icon="pi pi-external-link" label="Export" severity="secondary" @click="exportCSV" />
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
          </span>
        </div>
      </template>
      <Column field="supplier_name" header="Supplier">
        <template #body="{ data }">{{ data.supplier_name }}</template>
      </Column>
      <Column field="item_name" header="Item name">
        <template #body="{ data }">{{ data.item_name }}</template>
      </Column>
      <Column field="qty" header="Qty">
        <template #body="{ data }">{{ data.qty }}</template>
        <template #editor="{ data, field }">
          <InputNumber v-model="data[field]" inputId="integeronly" />
        </template>
      </Column>
      <Column field="uom" header="UOM">
        <template #body="{ data }">{{ data.uom }}</template>
      </Column>
      <Column field="currency" header="Currency">
        <template #body="{ data }">{{ data.currency }}</template>
      </Column>
      <Column field="price" header="Price">
        <template #body="{ data }">{{ data.price }}</template>
        <template #editor="{ data, field }">
          <InputNumber v-model="data[field]" inputId="minmaxfraction" :minFractionDigits="2" :maxFractionDigits="2" />
        </template>
      </Column>
      <Column field="total" header="Total" :exportable="false">
        <template #body="{ data }">{{ (data.qty * data.price).toFixed(2) }}</template>
      </Column>
      <Column :rowEditor="true" style="min-width: 8rem" bodyStyle="text-align:center" />
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
import FileUpload from 'primevue/fileupload';
import Papa from 'papaparse';
import InputNumber from 'primevue/inputnumber';

const toast = useToast();
const emit = defineEmits(['getFormValues']);
const dt = ref();
const editingRows = ref([]);
const schema = yup.object({
  item_id: yup.number().required('Please select product')
});
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const sample_json = {
  item_no: '',
  qty: '',
  price: ''
};

const handleRowAdd = (data: any, { resetForm }: any) => {
  emit('getFormValues');
  if (!store.state.formData.currency_id) {
    toast.add({ severity: 'error', summary: 'Error Message', detail: 'Please select currency', life: 2500 });
    return;
  }
  if (store.state.poDetails.filter((item: any) => item.item_id == data.item_id).length > 0) {
    toast.add({ severity: 'error', summary: 'Error Message', detail: 'item already present in list', life: 2500 });
    return;
  }
  const supplier: any = store.state.suppliers.filter((item) => item.id == store.state.formData.supplier_id)[0];
  const products: any = store.state.products.filter((item) => item.id == data.item_id)[0];

  store.state.poDetails.push({
    id: `${Math.floor(1000 + Math.random() * 9000)}`,
    supplier_id: supplier.id,
    supplier_name: supplier.supplier_name,
    item_name: products.item_name,
    item_id: products.id,
    currency: store.state.currencies.filter((item) => item.id == store.state.formData.currency_id)[0].name,
    uom: products.uom,
    qty: 0,
    price: 0,
  });
  resetForm();
};

const onUpload = (e: any) => {
  Papa.parse(e.files[0], {
    header: true,
    skipEmptyLines: true,
    complete: async (res: any) => {
      if (Object.keys(sample_json).filter((item: string) => res.meta.fields.indexOf(item) == -1).length == 0) {
        for (const object of res.data) {
          for (const key in object) {
            if (object[key].replace(' ', '').length == 0) {
              toast.add({ severity: 'error', summary: 'Error Message', detail: 'Some of fields found empty in CSV', life: 3000 });
              return;
            }
          }
        }
        emit('getFormValues');
        const supplier: any = store.state.suppliers.filter((item) => item.id == store.state.formData.supplier_id)[0];
        for (const object of res.data) {
          const product: any = store.state.products.filter((item) => item.item_name.includes(object.item_no))[0];
          const poDetails = store.state.poDetails.filter((item) => item.item_name.includes(object.item_no))[0];

          if (poDetails) {
            poDetails.qty += Math.trunc(object.qty);
            poDetails.price = Number(object.price).toFixed(2);
          } else if (product) {
            store.state.poDetails.push({
              id: `${Math.floor(1000 + Math.random() * 9000)}`,
              supplier_id: supplier.id,
              supplier_name: supplier.supplier_name,
              item_name: product.item_name,
              item_id: product.id,
              currency: store.state.currencies.filter((item) => item.id == store.state.formData.currency_id)[0].name,
              uom: product.uom,
              qty: Math.trunc(object.qty),
              price: Number(object.price).toFixed(2)
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

const onRowEditSave = ({ newData, index }: any) => {
  store.state.poDetails[index] = newData;
};

const handleRowDelete = (index: number) => {
  store.state.poDetails.splice(index, 1);
};
</script>
