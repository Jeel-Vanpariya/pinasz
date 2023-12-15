<template>
  <Panel header="Payment Terms" class="p-4">
    <template #icons>
      <Button v-if="store.state.permission.other.includes('add')" label="Add" icon="pi pi-plus" @click="handleButtonClick" />
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
      <Column field="term_name" header="Term Name" sortable>
        <template #body="{ data }">{{ `${data.advance_percentage}% ${data.advance_text} - ${data.pending_percentage}% ${data.pending_text}` }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column :exportable="false">
        <template #body="slotProps">
          <div class="text-end">
            <Button v-if="store.state.permission.other.includes('edit')" icon="pi pi-pencil" outlined rounded class="mx-3" @click="edit(slotProps.data)" />
            <Button v-if="store.state.permission.other.includes('delete')" icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDelete(slotProps.data.id)" />
          </div>
        </template>
      </Column>
    </DataTable>
  </Panel>
  <Dialog v-model:visible="visible" header="Add Payment Term" modal :draggable="false" :style="{ width: '30vw' }">
    <Form :validation-schema="schema" :initialValues="initialValue" @submit="onSubmit">
      <div class="row mt-4 payment__term__add">
        <div class="col-md-6">
          <Field name="advance_percentage" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <Dropdown id="advance_percentage" :model-value="value" :options="percentage" filter :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="advance_percentage">Advance %</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md-6">
          <Field name="advance_text" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="advance_text" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="advance_text">Free text</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md-6">
          <Field name="pending_percentage" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <Dropdown id="pending_percentage" :model-value="value" :options="percentage" filter :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="pending_percentage">Pending %</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md-6">
          <Field name="pending_text" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="pending_text" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="pending_text">Free text</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md">
          <Field name="id" v-slot="{ value, handleChange }">
            <InputText type="hidden" :model-value="value" @update:model-value="handleChange" />
          </Field>
        </div>
      </div>
      <div class="d-flex justify-content-end mt-4 pe-2">
        <Button label="Save" icon="pi pi-save" type="submit" />
      </div>
    </Form>
  </Dialog>
  <ConfirmDialog />
  <Teleport to="body"> </Teleport>
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
const data = ref([]);
const percentage = ref([]);
const visible = ref(false);
const schema = yup.object({
  id: yup.mixed(),
  advance_percentage: yup.number().required('Please select percentage'),
  advance_text: yup.string().required('Please enter free text'),
  pending_percentage: yup.number().required('Please select percentage'),
  pending_text: yup.string().required('Please enter free text')
});
const initialValue = ref({
  id: '0',
  advance_percentage: '',
  advance_text: '',
  pending_percentage: '',
  pending_text: ''
});
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  term_name: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

onMounted(async () => {
  for (let i = 0; i <= 100; i++) percentage.value.push(i);
  getPaymentTerm();
});

const getPaymentTerm = async () => {
  store.state.spinner = true;
  const res = await store.dispatch('getPaymentTerm');
  store.state.spinner = false;
  if (res.status == 'success') data.value = res.data;
};

const handleButtonClick = () => {
  initialValue.value = {
    id: '0',
    advance_percentage: '',
    advance_text: '',
    pending_percentage: '',
    pending_text: ''
  };
  visible.value = true;
};

const onSubmit = async (data: any, { resetForm }: any) => {
  const res = await store.dispatch('savePaymentTerm', data);
  if (res.status == 'success') {
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'Successfully saved', life: 2500 });
    resetForm();
    visible.value = false;
    await getPaymentTerm();
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
      const res = await store.dispatch('deletePaymentTerm', { id: id });
      store.state.spinner = false;
      if (res.status == 'success') {
        getPaymentTerm();
      }
    }
  });
};
</script>
<style lang="scss">
.payment__term__add input {
  width: 100%;
}
</style>
