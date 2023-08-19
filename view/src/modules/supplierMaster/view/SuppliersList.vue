<template>
  <Panel header="Suppliers" class="p-4">
    <template #icons>
      <RouterLink :to="{ name: 'AddSupplier' }">
        <Button label="Add Supplier" icon="pi pi-plus" />
      </RouterLink>
    </template>
    <DataTable :value="suppliers" v-model:filters="filters" :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" scrollable filterDisplay="row" dataKey="id" removableSort paginator>
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
      <Column field="supplier_name" header="Supplier Name" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.supplier_name }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="phone_no" header="Phone no." sortable style="min-width: 25rem">
        <template #body="{ data }">{{ data.phone_no }}</template>
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
      <Column field="pincode" header="Pincode" sortable style="min-width: 25rem">
        <template #body="{ data }">{{ data.pincode }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="bank_name" header="Bank Name" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.bank_name }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="bank_address" header="Bank Address/Branch" sortable style="min-width: 25rem">
        <template #body="{ data }">{{ data.bank_address }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="bank_account_no" header="Bank A/c no." sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.bank_account_no }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="iban_no" header="IBAN No." sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.iban_no }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="swift_code" header="Swift Code/BIC" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.swift_code }}</template>
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
      <Column field="payment_terms" header="Payment Terms" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ `${data.advance_percentage}% advanced - ${data.pending_percentage}% pending` }}</template>
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
            <RouterLink :to="{ name: 'EditSupplier', params: { id: slotProps.data.id } }">
              <Button icon="pi pi-pencil" outlined rounded class="mx-3" />
            </RouterLink>
            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteSupplier(slotProps.data.id)" />
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

const confirm = useConfirm();
const suppliers = ref([]);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  s_no: { value: null, matchMode: FilterMatchMode.CONTAINS },
  supplier_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  phone_no: { value: null, matchMode: FilterMatchMode.CONTAINS },
  address: { value: null, matchMode: FilterMatchMode.CONTAINS },
  pincode: { value: null, matchMode: FilterMatchMode.CONTAINS },
  bank_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  bank_address: { value: null, matchMode: FilterMatchMode.CONTAINS },
  bank_account_no: { value: null, matchMode: FilterMatchMode.CONTAINS },
  iban_no: { value: null, matchMode: FilterMatchMode.CONTAINS },
  swift_code: { value: null, matchMode: FilterMatchMode.CONTAINS },
  country: { value: null, matchMode: FilterMatchMode.CONTAINS },
  payment_terms: { value: null, matchMode: FilterMatchMode.CONTAINS },
  contact_person: { value: null, matchMode: FilterMatchMode.CONTAINS },
  email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  contact_no: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

onMounted(async () => {
  await getAllSuppliers();
});

const getAllSuppliers = async () => {
  store.state.spinner = true;
  const res = await store.dispatch('getAllSuppliers');
  store.state.spinner = false;
  if (res.status == 'success') suppliers.value = res.data;
};

const confirmDeleteSupplier = (id: number) => {
  confirm.require({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      store.state.spinner = true;
      const res = await store.dispatch('deleteSupplier', { id: id });
      store.state.spinner = false;
      if (res.status == 'success') {
        getAllSuppliers();
      }
    }
  });
};
</script>
