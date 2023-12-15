<template>
  <Panel header="Consignees" class="p-4">
    <template #icons>
      <RouterLink v-if="store.state.permission.other.includes('add')" :to="{ name: 'AddConsignee' }">
        <Button label="Add" icon="pi pi-plus" />
      </RouterLink>
    </template>
    <DataTable :value="data" v-model:filters="filters" :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" filterDisplay="row" dataKey="id" scrollable removableSort paginator>
      <template #header>
        <div class="d-flex flex-wrap justify-content-end">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters['global'].value" placeholder="Search..." />
          </span>
        </div>
      </template>
      <Column field="consignee_name" header="Consignee Name" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.consignee_name }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="phone_no" header="Phone no." sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.phone_no }}</template>
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
      <Column field="tax_id" header="Tax Id" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.tax_id }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="address" header="Address" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.address }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="pincode" header="Pincode" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.pincode }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="city" header="City" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.city }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="state" header="State" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.state }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="country_name" header="Country" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.country_name }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column :exportable="false" alignFrozen="right" :frozen="true">
        <template #body="slotProps">
          <div class="d-flex">
            <RouterLink v-if="store.state.permission.other.includes('edit')" :to="{ name: 'EditConsignee', params: { id: slotProps.data.id } }">
              <Button icon="pi pi-pencil" outlined rounded class="mx-3" />
            </RouterLink>
            <Button v-if="store.state.permission.other.includes('delete')" icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDelete(slotProps.data.id)" />
          </div>
        </template>
      </Column>
    </DataTable>
  </Panel>
  <ConfirmDialog />
  <Toast />
</template>
<script lang="ts" setup>
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Panel from 'primevue/panel';
import { FilterMatchMode } from 'primevue/api';
import InputText from 'primevue/inputtext';
import { onMounted, ref } from 'vue';
import { useConfirm } from 'primevue/useconfirm';
import ConfirmDialog from 'primevue/confirmdialog';
import store from '../../../stores/index';
import Toast from 'primevue/toast';

const confirm = useConfirm();
const data = ref([]);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  consignee_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  phone_no: { value: null, matchMode: FilterMatchMode.CONTAINS },
  email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  tax_id: { value: null, matchMode: FilterMatchMode.CONTAINS },
  address: { value: null, matchMode: FilterMatchMode.CONTAINS },
  pincode: { value: null, matchMode: FilterMatchMode.CONTAINS },
  city: { value: null, matchMode: FilterMatchMode.CONTAINS },
  state: { value: null, matchMode: FilterMatchMode.CONTAINS },
  country_name: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

onMounted(async () => {
  getConsignee();
});

const getConsignee = async () => {
  store.state.spinner = true;
  const res = await store.dispatch('getConsignee');
  store.state.spinner = false;
  if (res.status == 'success') {
    data.value = res.data;
  }
};

const confirmDelete = (id: number) => {
  confirm.require({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      store.state.spinner = true;
      const res = await store.dispatch('deleteConsignee', { id: id });
      store.state.spinner = false;
      if (res.status == 'success') {
        getConsignee();
      }
    }
  });
};
</script>
<style lang="scss">
.consignee__add input {
  width: 100%;
}
</style>
