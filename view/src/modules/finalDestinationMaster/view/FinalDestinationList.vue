<template>
  <Panel header="Final Destination" class="p-4">
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
      <Column field="destination_name" header="Destination Name" sortable>
        <template #body="{ data }">{{ data.destination_name }}</template>
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
  <Dialog v-model:visible="visible" header="Add Final Destination" modal :draggable="false" :style="{ width: '30vw' }">
    <Form class="mt-4 final__destination__add" :validation-schema="schema" :initialValues="initialValue" @submit="onSubmit">
      <Field name="id" v-slot="{ value, handleChange }">
        <InputText type="hidden" :model-value="value" @update:model-value="handleChange" />
      </Field>
      <Field name="destination_name" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <InputText id="destination_name" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="destination_name">Destination Name</label>
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

const confirm = useConfirm();
const toast = useToast();
const data = ref([]);
const visible = ref(false);
const schema = yup.object({
  id: yup.mixed(),
  destination_name: yup.string().required('Please enter destination name')
});
const initialValue = ref({
  id: '0',
  destination_name: ''
});
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  destination_name: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

onMounted(async () => {
  getFinalDestination();
});

const getFinalDestination = async () => {
  store.state.spinner = true;
  const res = await store.dispatch('getFinalDestination');
  store.state.spinner = false;
  if (res.status == 'success') {
    data.value = res.data;
  }
};

const handleButtonClick = () => {
  initialValue.value = {
    id: '0',
    destination_name: ''
  };
  visible.value = true;
};

const onSubmit = async (data: any, { resetForm }: any) => {
  const res = await store.dispatch('saveFinalDestination', data);
  if (res.status == 'success') {
    resetForm();
    visible.value = false;
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'Final destination successfully saved', life: 2500 });
    await getFinalDestination();
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
      const res = await store.dispatch('deleteFinalDestination', { id: id });
      store.state.spinner = false;
      if (res.status == 'success') {
        getFinalDestination();
      }
    }
  });
};
</script>
<style lang="scss">
.final__destination__add input {
  width: 100%;
}
</style>
