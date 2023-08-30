<template>
  <Panel header="Users" class="p-4">
    <template #icons>
      <Button label="Add User" icon="pi pi-plus" @click="handleModelVisibility" />
    </template>
    <DataTable :value="users" v-model:filters="filters" :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" filterDisplay="row" dataKey="id" removableSort paginator>
      <template #header>
        <div class="d-flex flex-wrap justify-content-end">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters['global'].value" placeholder="Search..." />
          </span>
        </div>
      </template>
      <Column header="#" headerStyle="width:5rem">
        <template #body="slotProps">
          {{ slotProps.index + 1 }}
        </template>
      </Column>
      <Column field="name" header="Name" filterMatchMode="startsWith" sortable>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
        <template #body="{ data }">{{ data.name }}</template>
      </Column>
      <Column field="email" header="Email" sortable>
        <template #body="{ data }">{{ data.email }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="label" header="Status" sortable>
        <template #body="{ data }">
          <Tag :value="data.label" :severity="data.status ? 'success' : 'danger'" :icon="data.status ? 'pi pi-check' : 'pi pi-exclamation-triangle'" />
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="status" placeholder="Select One" class="p-column-filter" style="min-width: 12rem" :showClear="true">
            <template #option="slotProps">
              <Tag :value="slotProps.option" :severity="slotProps.option == 'Activated' ? 'success' : 'danger'" />
            </template>
          </Dropdown>
        </template>
      </Column>
      <Column :exportable="false">
        <template #body="slotProps">
          <div class="text-end">
            <Button icon="pi pi-pencil" outlined rounded class="mx-3" @click="editUser(slotProps.data)" />
            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="deleteUser(slotProps.data.id)" />
          </div>
        </template>
      </Column>
    </DataTable>
  </Panel>
  <Dialog v-model:visible="visible" header="Add User" modal :draggable="false" :style="{ width: '30vw' }">
    <Form ref="form" :validation-schema="schema" :initial-values="initialValues" @submit="onSubmit">
      <div class="row mt-4 user__add">
        <div class="col-md-12">
          <Field name="name" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="name" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="name">Enter name</label>
            </span>
            <small class="p-error fw-normal" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md-12 mt-4">
          <Field name="email" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="email" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="email">Enter email</label>
            </span>
            <small class="p-error fw-normal" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md">
          <Field name="id" v-slot="{ value, handleChange }">
            <InputText id="id" type="hidden" :model-value="value" @update:model-value="handleChange" />
          </Field>
        </div>
        <div class="col-md-12">
          <Field name="status" v-slot="{ value, handleChange }">
            <div class="mb-1">Status</div>
            <InputSwitch id="status" :model-value="value" @update:model-value="handleChange" />
          </Field>
        </div>
      </div>
      <div class="d-flex justify-content-end mt-4 pe-2">
        <Button label="Save" icon="pi pi-save" type="submit" />
      </div>
    </Form>
  </Dialog>
  <ConfirmDialog />
</template>
<script lang="ts" setup>
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Dropdown from 'primevue/dropdown';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Panel from 'primevue/panel';
import { FilterMatchMode } from 'primevue/api';
import InputText from 'primevue/inputtext';
import { onMounted, ref } from 'vue';
import { useConfirm } from 'primevue/useconfirm';
import ConfirmDialog from 'primevue/confirmdialog';
import store from '../../../stores/index';
import * as yup from 'yup';
import { useToast } from 'primevue/usetoast';
import { Field, Form } from 'vee-validate';
import InputSwitch from 'primevue/inputswitch';
import Dialog from 'primevue/dialog';

const confirm = useConfirm();
const toast = useToast();
const form = ref();
const users = ref([]);
const status = ref(['Activated', 'Deactivated']);
const visible = ref(false);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  label: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const schema = yup.object({
  id: yup.mixed(),
  name: yup.string().required('Please enter name'),
  email: yup.string().email().required('Please enter email'),
  status: yup.boolean()
});
const initialValues = ref({ id: '', name: '', email: '', status: true });

onMounted(async () => {
  await getUsers();
});

const getUsers = async () => {
  store.state.spinner = true;
  const res = await store.dispatch('getUsers');
  store.state.spinner = false;
  if (res.status == 'success') {
    for (const object of res.data) {
      object.label = object.status ? 'Activated' : 'Deactivated';
    }
    users.value = res.data;
  }
};

const editUser = (data: any) => {
  initialValues.value = data;
  visible.value = true;
};

const deleteUser = (id: number) => {
  confirm.require({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      store.state.spinner = true;
      const res = await store.dispatch('deleteUser', { id: id });
      store.state.spinner = false;
      if (res.status == 'success') {
        getUsers();
      }
    }
  });
};

const onSubmit = async (data: any, { resetForm }: any) => {
  visible.value = false;
  store.state.spinner = true;
  const res = await store.dispatch('saveUser', data);
  store.state.spinner = false;
  if (res.status == 'success') {
    if (res.message) toast.add({ severity: 'warn', summary: 'Warning Message', detail: res.message, life: 2500 });
    else {
      toast.add({ severity: 'success', summary: 'Success Message', detail: 'Successfully saved', life: 2500 });
      resetForm();
      await getUsers();
    }
    return;
  }
  initialValues.value = data;
  visible.value = true;
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong', life: 2500 });
};

const handleModelVisibility = () => {
  initialValues.value = { id: '', name: '', email: '', status: true };
  visible.value = true;
};
</script>
<style lang="scss">
.user__add input {
  width: 100%;
}
</style>
