<template>
  <Panel header="Product Categories" class="p-4">
    <template #icons>
      <Button label="Add Category" icon="pi pi-plus" @click="handleButtonClick" />
    </template>
    <TreeTable :value="data" :filters="filters" :filter-mode="filterMode.value" :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" :paginator="true">
      <template #header>
        <div class="d-flex flex-wrap justify-content-end">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters['global']" placeholder="Search..." />
          </span>
        </div>
      </template>
      <Column field="category_name" header="Category Name" expander>
        <template #filter>
          <InputText v-model="filters['category_name']" type="text" class="p-column-filter" />
        </template>
      </Column>
      <Column :exportable="false">
        <template #body="{ node }">
          <div class="text-end">
            <Button v-if="node.level" icon="pi pi-plus" outlined rounded severity="success" @click="add(node.key)" />
            <Button icon="pi pi-pencil" outlined rounded class="mx-3" @click="edit(node)" />
            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDelete(node.key)" />
          </div>
        </template>
      </Column>
    </TreeTable>
  </Panel>
  <Dialog v-model:visible="visible" header="Add Category" modal :draggable="false" :style="{ width: '30vw' }">
    <Form class="mt-4 loading__port__add" :validation-schema="schema" :initialValues="initialValue" @submit="onSubmit">
      <Field name="key" v-slot="{ value, handleChange }">
        <InputText type="hidden" :model-value="value" @update:model-value="handleChange" />
      </Field>
      <Field name="category_id" v-slot="{ value, handleChange }">
        <InputText type="hidden" :model-value="value" @update:model-value="handleChange" />
      </Field>
      <Field name="category_name" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <InputText id="category_name" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="category_name">Category Name</label>
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
import Column from 'primevue/column';
import Panel from 'primevue/panel';
import InputText from 'primevue/inputtext';
import { onMounted, ref } from 'vue';
import { useConfirm } from 'primevue/useconfirm';
import ConfirmDialog from 'primevue/confirmdialog';
import store from '../../../stores/index';
import TreeTable from 'primevue/treetable';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import * as yup from 'yup';
import Dialog from 'primevue/dialog';
import { Form, Field } from 'vee-validate';

const toast = useToast();
const confirm = useConfirm();
const data = ref([]);
const visible = ref(false);
const filters = ref({});
const filterMode = ref({ label: 'Lenient', value: 'lenient' });
const schema = yup.object({
  key: yup.mixed(),
  category_name: yup.string().required('Please enter category name'),
  category_id: yup.mixed().nullable()
});
const initialValue = ref({
  key: '0',
  category_name: '',
  category_id: ''
});

onMounted(async () => {
  getCategory();
});

const getCategory = async () => {
  store.state.spinner = true;
  const res = await store.dispatch('getCategory');
  store.state.spinner = false;
  if (res.status == 'success') {
    data.value = res.data;
  }
};

const handleButtonClick = () => {
  initialValue.value = {
    key: '0',
    category_name: '',
    category_id: ''
  };
  visible.value = true;
};

const onSubmit = async (data: any, { resetForm }: any) => {
  const res = await store.dispatch('saveCategory', data);
  if (res.status == 'success') {
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'Successfully saved', life: 2500 });
    resetForm();
    visible.value = false;
    await getCategory();
    return;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong unable to save operation', life: 2500 });
};

const add = (id: number) => {
  initialValue.value = {
    key: '0',
    category_name: '',
    category_id: id
  };
  visible.value = true;
};

const edit = (data: any) => {
  initialValue.value = {
    key: data.key,
    category_name: data.data.category_name,
    category_id: data.category_id
  };
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
      const res = await store.dispatch('deleteCategory', { id: id });
      store.state.spinner = false;
      if (res.status == 'success') {
        getCategory();
      }
    }
  });
};
</script>
