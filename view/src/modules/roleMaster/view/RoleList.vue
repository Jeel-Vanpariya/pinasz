<template>
  <Panel header="Roles" class="p-4">
    <template #icons>
      <div class="d-flex">
        <RouterLink v-if="store.state.permission.user.includes('roleAdd')" :to="{ name: 'CreateRole' }">
          <Button label="Add Role" icon="pi pi-plus" />
        </RouterLink>
      </div>
    </template>
    <DataTable :value="roles" v-model:filters="filters" :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" scrollable dataKey="id" removableSort paginator>
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
      </Column>
      <Column field="permissions" header="Permissions" sortable style="min-width: 20rem">
        <template #body="{ data }"><Tree :value="data.permissions"/></template>
      </Column>
      <Column :exportable="false" alignFrozen="right" :frozen="true">
        <template #body="slotProps">
          <div class="d-flex">
            <RouterLink v-if="store.state.permission.user.includes('roleEdit')" :to="{ name: 'EditRole', params: { id: slotProps.data.id } }">
              <Button icon="pi pi-pencil" outlined rounded class="mx-3" />
            </RouterLink>
            <Button v-if="store.state.permission.user.includes('roleDelete')" icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDelete(slotProps.data.id)" />
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
const roles = ref([]);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

onMounted(async () => {
  await getRoles();
});

const getRoles = async () => {
  store.state.spinner = true;
  const res = await store.dispatch('getRoles');
  store.state.spinner = false;
  if (res.status == 'success' && res.data.length > 0) {
    roles.value = await store.dispatch('setPermissions', res.data);
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
      const res = await store.dispatch('deleteRole', { id: id });
      store.state.spinner = false;
      if (res.status == 'success') {
        getRoles();
      }
    }
  });
};
</script>
<style lang="scss">
.report__mail {
  .p-multiselect,
  .p-chips,
  .p-chips-multiple-container {
    width: 100%;
  }
}
</style>
