<template>
  <Panel header="Reports" class="p-4">
    <DataTable :value="reports" v-model:filters="filters" :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" scrollable dataKey="id" removableSort paginator>
      <template #header>
        <div class="d-flex flex-wrap align-items-center justify-content-end gap-2">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters['global'].value" placeholder="Search..." />
          </span>
        </div>
      </template>
      <Column field="report_blueprint_name" header="Blueprint name" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.name }}</template>
      </Column>
      <Column field="path" header="Report Name" sortable style="min-width: 20rem">
        <template #body="{ data }">
          <a :href="`${axios.defaults.baseURL?.split('api/')[0]}${data.path}`" target="_blank" :download="`${data.path.split('/').pop()}`">{{ `${data.path.split('/').pop()}` }}</a>
        </template>
      </Column>
      <Column :exportable="false" alignFrozen="right" :frozen="true">
        <template #body="slotProps">
          <div class="d-flex">
            <Button v-if="store.state.permission.report.includes('email')" icon="mdi mdi-email-arrow-right-outline" class="mx-3" outlined rounded @click="handleMailDialog(`${axios.defaults.baseURL?.split('api/')[0]}${slotProps.data.path}`)" />
            <Button v-if="store.state.permission.report.includes('delete')" icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDelete(slotProps.data.id)" />
          </div>
        </template>
      </Column>
    </DataTable>
  </Panel>
  <Dialog v-model:visible="visible" header="Send Mail" modal :draggable="false" :style="{ width: '30vw' }">
    <Form class="mt-4 report__mail" :validation-schema="schema" :initialValues="initialValue" @submit="onSubmit">
      <Field name="path" v-slot="{ value, handleChange }">
        <InputText type="hidden" :model-value="value" @update:model-value="handleChange" />
      </Field>
      <Field name="emails" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <MultiSelect id="emails" filter :model-value="value" :options="emails" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="emails">Emails</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
      <Field name="user_emails" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label mt-4">
          <Chips id="user_emails" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="user_emails">Other Emails</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
      <div class="d-flex justify-content-end mt-4 pe-2">
        <Button label="Save" icon="pi pi-save" type="submit" />
      </div>
    </Form>
  </Dialog>
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
import axios from 'axios';
import * as yup from 'yup';
import Papa from 'papaparse';
import MultiSelect from 'primevue/multiselect';
import Chips from 'primevue/chips';
import { Field, Form } from 'vee-validate';
import Dialog from 'primevue/dialog';
import { useToast } from 'primevue/usetoast';

const confirm = useConfirm();
const toast = useToast();
const visible = ref(false);
const reports = ref([]);
const emails = ref([]);
const schema = yup.object({
  path: yup.string(),
  emails: yup.mixed(),
  user_emails: yup.mixed()
});
const initialValue = ref({
  path: '',
  emails: [],
  user_emails: []
});
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

onMounted(async () => {
  await getReports();
});

const getReports = async () => {
  store.state.spinner = true;
  const res = await store.dispatch('getReports');
  store.state.spinner = false;
  if (res.status == 'success') {
    reports.value = res.data;
  }
};

const handleMailDialog = (url: string) => {
  initialValue.value = {
    path: url,
    emails: [],
    user_emails: []
  };
  Papa.parse(url, {
    download: true,
    complete: async (res: any) => {
      const emailFlag = res.data[0].includes('Email');
      if (emailFlag) {
        const index = res.data[0].findIndex((item) => item == 'Email');
        res.data.splice(0, 1);
        for (const arr of res.data) {
          if (!emails.value.includes(arr[index])) emails.value.push(arr[index]);
        }
      }
      visible.value = true;
    }
  });
};

const onSubmit = async (data) => {
  if (data.emails.length == 0 && data.user_emails.length == 0) return;
  store.state.spinner = true;
  const res = await store.dispatch('sendMail', data);
  store.state.spinner = false;
  if (res.status == 'success') {
    toast.add({ severity: 'success', summary: 'Error Message', detail: 'Mail sent successfully', life: 2500 });
    visible.value = false;
    return;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong unable to send mail', life: 2500 });
};

const confirmDelete = (id: number) => {
  confirm.require({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      store.state.spinner = true;
      const res = await store.dispatch('deleteReport', { id: id });
      store.state.spinner = false;
      if (res.status == 'success') {
        getReports();
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
