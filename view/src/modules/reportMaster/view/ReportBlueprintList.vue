<template>
  <Panel header="Products" class="p-4">
    <template #icons>
      <RouterLink v-if="store.state.permission.report.includes('blueprintAdd')" :to="{ name: 'CreateReportBlueprint' }">
        <Button label="Create Report Blueprint" icon="pi pi-plus" />
      </RouterLink>
    </template>
    <DataTable :value="blueprints" v-model:filters="filters" :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" scrollable filterDisplay="row" dataKey="id" removableSort paginator>
      <template #header>
        <div class="d-flex flex-wrap align-items-center justify-content-end gap-2">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters['global'].value" placeholder="Search..." />
          </span>
        </div>
      </template>
      <Column field="name" header="Name" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.name }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="primary_master" header="Primary Master" sortable style="min-width: 15rem">
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="second_master" header="Second Master" sortable style="min-width: 15rem">
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="third_master" header="Third Master" sortable style="min-width: 15rem">
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="columns" header="Report Columns" sortable style="min-width: 30rem">
        <template #body="{ data }"><Tree :value="data.columns" /></template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column :exportable="false" alignFrozen="right" :frozen="true">
        <template #body="slotProps">
          <div class="d-flex">
            <RouterLink v-if="store.state.permission.report.includes('add')" :to="{ name: 'CreateReport', params: { id: slotProps.data.id } }">
              <Button icon="mdi mdi-chart-box-plus-outline" outlined rounded severity="success" v-tooltip.left="'Create Report'"/>
            </RouterLink>
            <RouterLink v-if="store.state.permission.report.includes('blueprintEdit')" :to="{ name: 'EditReportBlueprint', params: { id: slotProps.data.id } }">
              <Button icon="pi pi-pencil" outlined rounded class="mx-3" />
            </RouterLink>
            <Button v-if="store.state.permission.report.includes('blueprintDelete')" icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data.id)" />
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
import Tree from 'primevue/tree';

const confirm = useConfirm();
const blueprints = ref([]);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  primary_master: { value: null, matchMode: FilterMatchMode.CONTAINS },
  second_master: { value: null, matchMode: FilterMatchMode.CONTAINS },
  third_master: { value: null, matchMode: FilterMatchMode.CONTAINS },
  columns: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

onMounted(async () => {
  await getReportBlueprints();
});

const getReportBlueprints = async () => {
  store.state.spinner = true;
  const res = await store.dispatch('getReportBlueprints');
  store.state.spinner = false;
  if (res.status == 'success') {
    blueprints.value = await store.dispatch('getSelectedModules', { report_columns: {}, columns: {}, res: res.data }).then((res) => {
      console.log(res.res);
      return res.res;
    });
  }
};

const confirmDeleteProduct = (id: number) => {
  confirm.require({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      store.state.spinner = true;
      const res = await store.dispatch('deleteReportBlueprint', { id: id });
      store.state.spinner = false;
      if (res.status == 'success') {
        getReportBlueprints();
      }
    }
  });
};
</script>
