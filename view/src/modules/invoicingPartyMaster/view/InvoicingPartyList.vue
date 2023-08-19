<template>
  <Panel header="Invoicing Parties" class="p-4">
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
      <Column field="party_name" header="Party Name" sortable>
        <template #body="{ data }">{{ data.party_name }}</template>
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
  <Dialog v-model:visible="visible" header="Add Invoicing Party" modal :draggable="false" :style="{ width: '30vw' }">
    <Form class="mt-4 invoicing__party__add" :validation-schema="schema" :initialValues="initialValue" @submit="onSubmit">
      <Field name="id" v-slot="{ value, handleChange }">
        <InputText type="hidden" :model-value="value" @update:model-value="handleChange" />
      </Field>
      <Field name="party_name" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <InputText id="party_name" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="party_name">Party Name</label>
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
  party_name: yup.string().required('Please enter party name')
});
const initialValue = ref({
  id: '0',
  party_name: ''
});
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  party_name: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

onMounted(async () => {
  getInvoicingParty();
});

const getInvoicingParty = async () => {
  store.state.spinner = true;
  const res = await store.dispatch('getInvoicingParty');
  store.state.spinner = false;
  if (res.status == 'success') {
    data.value = res.data;
  }
};

const handleButtonClick = () => {
  initialValue.value = {
    id: '0',
    party_name: ''
  };
  visible.value = true;
};

const onSubmit = async (data: any, { resetForm }: any) => {
  const res = await store.dispatch('saveInvoicingParty', data);
  if (res.status == 'success') {
    resetForm();
    visible.value = false;
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'Invoicing party successfully saved', life: 2500 });
    await getInvoicingParty();
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
      const res = await store.dispatch('deleteInvoicingParty', { id: id });
      store.state.spinner = false;
      if (res.status == 'success') {
        getInvoicingParty();
      }
    }
  });
};
</script>
<style lang="scss">
.invoicing__party__add input {
  width: 100%;
}
</style>
