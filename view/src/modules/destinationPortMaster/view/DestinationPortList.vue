<template>
  <Panel header="Destination Port" class="p-4">
    <template #icons>
      <Button label="Add" icon="pi pi-plus" @click="handleButtonClick" />
    </template>
    <DataTable :value="data" v-model:filters="filters" :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" dataKey="id" removableSort paginator>
      <template #header>
        <div class="d-flex flex-wrap justify-content-end">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters['global'].value" placeholder="Search..." />
          </span>
        </div>
      </template>
      <Column field="port_name" header="Port Name" sortable>
        <template #body="{ data }">{{ data.port_name }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="country" header="Country" sortable>
        <template #body="{ data }">{{ data.country }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column :exportable="false">
        <template #body="slotProps">
          <div class="text-end">
            <Button icon="pi pi-pencil" outlined rounded class="mx-3" @click="edit(slotProps.data)" />
            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDelete(slotProps.data.id)" />
          </div>
        </template>
      </Column>
    </DataTable>
  </Panel>
  <Dialog v-model:visible="visible" header="Add Destination Port" modal :draggable="false" :style="{ width: '30vw' }">
    <Form class="mt-4 destination__port__add" :validation-schema="schema" :initialValues="initialValue" @submit="onSubmit">
      <Field name="id" v-slot="{ value, handleChange }">
        <InputText type="hidden" :model-value="value" @update:model-value="handleChange" />
      </Field>
      <Field name="port_name" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <InputText id="port_name" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="port_name">Port Name</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
      <Field name="country_id" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label mt-4">
          <Dropdown id="country_id" filter :model-value="value" :options="countries" option-label="name" option-value="id" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="country_id">Country</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
      <div class="d-flex justify-content-end mt-4 pe-2">
        <Button label="Save" icon="pi pi-save" type="submit" />
      </div>
    </Form>
  </Dialog>
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
import Dialog from 'primevue/dialog';
import { Field, Form } from 'vee-validate';
import * as yup from 'yup';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import Dropdown from 'primevue/dropdown';

const confirm = useConfirm();
const toast = useToast();
const visible = ref(false);
const data = ref([]);
const countries = ref([]);
const schema = yup.object({
  id: yup.mixed(),
  port_name: yup.string().required('Please enter party name'),
  country_id: yup.string().required('Please select country')
});
const initialValue = ref({
  id: '0',
  port_name: '',
  country_id: null
});
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  port_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  country: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

onMounted(async () => {
  store.state.spinner = true;
  await getCountries();
  await getDestinationPort();
  store.state.spinner = false;
});

const getCountries = async () => {
  const res = await store.dispatch('getCountries');
  if (res.status == 'success') {
    countries.value = res.data;
    return;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong unable to fetch countries', life: 2500 });
};

const getDestinationPort = async () => {
  const res = await store.dispatch('getDestinationPort');
  if (res.status == 'success') {
    data.value = res.data;
  }
};

const handleButtonClick = () => {
  initialValue.value = {
    id: '0',
    port_name: '',
    country_id: null
  };
  visible.value = true;
};

const onSubmit = async (data: any, { resetForm }: any) => {
  const res = await store.dispatch('saveDestinationPort', data);
  if (res.status == 'success') {
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'Successfully saved', life: 2500 });
    resetForm();
    visible.value = false;
    await getDestinationPort();
    return;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong unable to save operation', life: 2500 });
};

const edit = (data: any) => {
  initialValue.value = data;
  visible.value = true;
};

const confirmDelete = (id: number) => {
  confirm.require({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      store.state.spinner = true;
      const res = await store.dispatch('deleteDestinationPort', { id: id });
      store.state.spinner = false;
      if (res.status == 'success') {
        getDestinationPort();
      }
    }
  });
};
</script>
<style lang="scss">
.destination__port__add {
  input,.p-dropdown {
    width: 100%;
  }
}
</style>
