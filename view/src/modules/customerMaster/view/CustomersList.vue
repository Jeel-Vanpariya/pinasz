<template>
  <Panel header="Customers" class="p-4">
    <template #icons>
      <div class="d-flex">
        <download-csv v-if="false" :data="[sample_json]" name="sample.csv">
          <Button label="Sample CSV" icon="pi pi-cloud-download" severity="help" />
        </download-csv>
        <FileUpload v-if="false" class="mx-4" mode="basic" name="demo[]" accept="text/csv" :fileLimit="1" :auto="true" customUpload @uploader="onUpload" chooseLabel="Import CSV" />
        <RouterLink :to="{ name: 'AddCustomer' }">
          <Button label="Add Customer" icon="pi pi-plus" />
        </RouterLink>
      </div>
    </template>
    <DataTable :value="customers" v-model:filters="filters" :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" scrollable filterDisplay="row" dataKey="id" removableSort paginator>
      <template #header>
        <div class="d-flex flex-wrap align-items-center justify-content-end gap-2">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters['global'].value" placeholder="Search..." />
          </span>
        </div>
      </template>
      <Column field="s_no" header="S No." sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.s_no }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="group_name" header="Group Name" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.group_name }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="address" header="Address" sortable style="min-width: 25rem">
        <template #body="{ data }">{{ data.address }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="country" header="Country" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.country }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="contact_person" header="Contact Person" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.contact_person }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="email" header="Email" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.email }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="contact_no" header="Contact No." sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.contact_no }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column :exportable="false" alignFrozen="right" :frozen="true">
        <template #body="slotProps">
          <div class="d-flex">
            <RouterLink :to="{ name: 'EditCustomer', params: { id: slotProps.data.id } }">
              <Button icon="pi pi-pencil" outlined rounded class="mx-3" />
            </RouterLink>
            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteCustomer(slotProps.data.id)" />
          </div>
        </template>
      </Column>
    </DataTable>
  </Panel>
  <Toast />
  <ConfirmDialog />
</template>
<script lang="ts" setup>
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Panel from 'primevue/panel';
import { FilterMatchMode } from 'primevue/api';
import InputText from 'primevue/inputtext';
import { ref, onMounted } from 'vue';
import { useConfirm } from 'primevue/useconfirm';
import ConfirmDialog from 'primevue/confirmdialog';
import store from '../../../stores/index';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import FileUpload from 'primevue/fileupload';
import Papa from 'papaparse';

const confirm = useConfirm();
const customers = ref([]);
const toast = useToast();
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  s_no: { value: null, matchMode: FilterMatchMode.CONTAINS },
  group_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  buyer_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  address: { value: null, matchMode: FilterMatchMode.CONTAINS },
  country: { value: null, matchMode: FilterMatchMode.CONTAINS },
  contact_person: { value: null, matchMode: FilterMatchMode.CONTAINS },
  email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  contact_no: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const sample_json = {
  s_no: '',
  group_name: '',
  buyer_name: '',
  address: '',
  country: '',
  contact_person: '',
  email: '',
  contact_no: ''
};

onMounted(async () => {
  await getAllCustomers();
});

const getAllCustomers = async () => {
  store.state.spinner = true;
  const res = await store.dispatch('getAllCustomers');
  store.state.spinner = false;
  if (res.status == 'success') {
    customers.value = res.data;
  }
};

const onUpload = (e: any) => {
  Papa.parse(e.files[0], {
    header: true,
    skipEmptyLines: true,
    complete: async (res: any) => {
      if (Object.keys(sample_json).filter((item: string) => res.meta.fields.indexOf(item) == -1).length == 0) {
        let error = false;
        for (const object of res.data) {
          for (const key in object) {
            if (object[key].replace(' ', '').length == 0) {
              toast.add({ severity: 'error', summary: 'Error Message', detail: 'Some of fields found empty in CSV', life: 3000 });
              return;
            }
          }
        }
        if (!error) {
          store.state.spinner = true;
          const response = await store.dispatch('saveCustomerFromCSV', res.data);
          store.state.spinner = false;
          if (response.status == 'success') {
            location.reload();
            return;
          }
          toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong unable to save customers from csv', life: 3000 });
        }
        return;
      }
      toast.add({ severity: 'error', summary: 'Error Message', detail: 'Invalid CSV', life: 3000 });
    }
  });
};

const confirmDeleteCustomer = (id: number) => {
  confirm.require({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      store.state.spinner = true;
      const res = await store.dispatch('deleteCustomer', { id: id });
      store.state.spinner = false;
      if (res.status == 'success') {
        getAllCustomers();
      }
    }
  });
};
</script>
