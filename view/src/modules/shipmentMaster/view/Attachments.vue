<template>
  <div class="row mt-5 add__shipment">
    <div class="col-md-3">
      <span class="p-float-label">
        <Dropdown id="upload-field" v-model:modelValue="selectField" :options="fields" optionLabel="label" optionValue="value" filter />
        <label for="upload-field">Upload Field</label>
      </span>
    </div>
    <div class="col-md">
      <FileUpload class="mx-3" mode="basic" chooseLabel="Upload" :auto="true" customUpload @uploader="onUpload" />
    </div>
  </div>
  <Divider />
  <div>
    <DataTable :value="store.state.attachments" dataKey="id" scrollHeight="300px" scrollable :filters="filters">
      <template #header>
        <div class="d-flex justify-content-end">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
          </span>
        </div>
      </template>
      <Column field="upload_field" header="Upload Field">
        <template #body="{ data }">{{ fields.filter((item) => item.value == data.upload_field)[0].label }}</template>
      </Column>
      <Column field="path" header="File">
        <template #body="{ data }"><a :href="`${axios.defaults.baseURL?.split('api')[0]}${data.path}`" target="_blank">{{ `${axios.defaults.baseURL?.split('api')[0]}${data.path}` }}</a></template>
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
import Dropdown from 'primevue/dropdown';
import FileUpload from 'primevue/fileupload';
import { useToast } from 'primevue/usetoast';
import { removeFile, uploadFile } from '../../../helpers/fileHelper';
import { ref } from 'vue';
import store from '@/stores';
import Divider from 'primevue/divider';
import DataTable from 'primevue/datatable';
import { FilterMatchMode } from 'primevue/api';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import axios from 'axios';

const toast = useToast();
const selectField = ref();
const emit = defineEmits(['getFormValues']);
const fields = [
  { label: 'PO Number', value: 'po_no' },
  { label: 'Supp PO No', value: 'sup_po_no' },
  { label: 'Our PO No', value: 'our_po_no' },
  { label: 'Cust PO No', value: 'cust_po_no' },
  { label: 'Adv Rec Date', value: 'adv_rec_date' },
  { label: 'Adv Pay Date', value: 'adv_pay_date' },
  { label: 'COD Number', value: 'cod_number' },
  { label: 'Freight Booking Date', value: 'freight_booking_date' },
  { label: 'Scan BL Date', value: 'scan_bl_date' },
  { label: 'Stuf Photo', value: 'stuf_photo' },
  { label: 'BL No', value: 'bl_no' },
  { label: 'Purchase Invoice', value: 'purchase_invoice' },
  { label: 'Sale Inv No', value: 'sale_inv_no' },
  { label: 'Supplier Final Invoice number', value: 's_f_inv_no' },
  { label: 'Final Rec Date', value: 'final_rec_date' },
  { label: 'Final Pay Date', value: 'final_pay_date' },
  { label: 'DHL No', value: 'dhl_no' },
  { label: 'Draft CNCA', value: 'draft_cnca' },
  { label: 'Original CNCA', value: 'original_cnca' },
  { label: 'DUP', value: 'dup' }
];
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const onUpload = async (e: any) => {
  if (selectField.value) {
    emit('getFormValues');

    const file = new FormData();
    file.append('file', e.files[0]);

    store.state.spinner = true;
    const res = await uploadFile(file, {
      dir: 'uploads/shipment/attachments',
      supportedType: JSON.stringify([e.files[0].type]),
      filename: store.state.formData.po_no
    });
    store.state.spinner = false;

    if (res.status == 'success') {
      store.state.attachments.push({
        id: `0`,
        shipment_id: store.state.formData.id,
        upload_field: selectField.value,
        path: res.path
      });
      return;
    }
    toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong', life: 2500 });
    return;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Please select upload field', life: 2500 });
};

const handleRowDelete = async (index: number) => {
  if (typeof store.state.attachments[index].id == 'number') {
    store.state.deleteMedia.push(store.state.attachments[index]);
  } else {
    store.state.spinner = true;
    await removeFile({ path: store.state.attachments[index].path });
    store.state.spinner = false;
  }
  store.state.attachments.splice(index, 1);
};
</script>
