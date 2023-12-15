<template>
  <Panel class="p-4">
    <template #header>
      <div class="d-flex align-items-center">
        <Button icon="pi pi-arrow-left" text raised rounded @click="onCancel" />
        <span class="fw-bold mx-4">{{ route.params.id ? 'Edit Role' : 'Create Role' }}</span>
      </div>
    </template>
    <Form ref="form" :initial-values="initialValues" :validation-schema="schema" @submit="onSubmit">
      <div class="row mt-3 create__role">
        <div class="col-md-12">
          <Field name="name" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="name" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="name">Name</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md-4">
          <Field name="other" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <MultiSelect id="other" :options="options" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="other">Other Master</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md-4">
          <Field name="customer" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <MultiSelect id="customer" :options="options" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="customer">Customer Master</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md-4">
          <Field name="supplier" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <MultiSelect id="supplier" :options="options" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="supplier">Supplier Master</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md-4">
          <Field name="product" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <MultiSelect
                id="product"
                :options="[...options, 'categoryView', 'categoryAdd', 'categoryEdit', 'categoryDelete']"
                :model-value="value"
                :class="{ 'p-invalid': errorMessage }"
                @update:model-value="handleChange"
              />
              <label for="product">Product Master</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md-4">
          <Field name="user" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <MultiSelect
                id="user"
                :options="[...options, 'roleView', 'roleAdd', 'roleEdit', 'roleDelete']"
                :model-value="value"
                :class="{ 'p-invalid': errorMessage }"
                @update:model-value="handleChange"
              />
              <label for="user">User Master</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md-4">
          <Field name="report" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <MultiSelect
                id="report"
                :options="['view', 'add', 'delete', 'email', 'blueprintView', 'blueprintAdd', 'blueprintEdit', 'blueprintDelete']"
                :model-value="value"
                :class="{ 'p-invalid': errorMessage }"
                @update:model-value="handleChange"
              />
              <label for="report">Report Master</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md-4">
          <Field name="shipment" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <MultiSelect id="shipment" :options="options" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="shipment">Shipment Master</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md-8">
          <Field name="shipment_add" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <TreeSelect id="shipment_add" :options="addOptions" selectionMode="checkbox" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="shipment_add">Shipment Master(Add)</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md-12">
          <Field name="shipment_edit" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <TreeSelect id="shipment_edit" selectionMode="checkbox" :options="store.state.tabs" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="shipment_edit">Shipment Master(Edit)</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md-12 text-center">
          <Button label="Save" icon="pi pi-save" class="mx-4" type="submit" />
          <Button label="Cancel" icon="pi pi-times" severity="danger" @click="onCancel" />
        </div>
      </div>
    </Form>
  </Panel>
</template>
<script setup lang="ts">
import router from '@/router';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Panel from 'primevue/panel';
import { Field, Form } from 'vee-validate';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import * as yup from 'yup';
import store from '../../../stores/index';
import { useToast } from 'primevue/usetoast';
import MultiSelect from 'primevue/multiselect';
import TreeSelect from 'primevue/treeselect';

const route = useRoute();
const toast = useToast();
const form = ref();
const schema = yup.object({
  name: yup.string().required('Please enter name'),
  other: yup.array(),
  shipment: yup.array(),
  shipment_add: yup.object(),
  shipment_edit: yup.object(),
  customer: yup.array(),
  supplier: yup.array(),
  product: yup.array(),
  report: yup.array(),
  user: yup.array()
});
const initialValues = { name: '', other: [], shipment: [], shipment_add: {}, shipment_edit: {}, customer: [], supplier: [], product: [], report: [], user: [] };
const options = ref(['view', 'add', 'edit', 'delete'] as string[]);
const addOptions = ref([...store.state.tabs.filter((item) => item.key == 'finance'), ...store.state.tabs.filter((item) => item.key == 'logistics').filter((item) => item.children.splice(1, 1))]);

onMounted(() => {
  store.state.spinner = true;
  if (route.params.id) getBlueprintForEdit();
  store.state.spinner = false;
});

const getBlueprintForEdit = async () => {
  const res = await store.dispatch('getRoleForEdit', { id: route.params.id });
  if (res.status == 'success') {
    res.data.permissions = JSON.parse(res.data.permissions);
    const shipment_add = {} as any,
      shipment_edit = {} as any;
    for (const key in res.data.permissions.shipment_add) {
      if (res.data.permissions.shipment_add[key].length > 0) {
        const val = store.state.tabs.filter((item) => item.key == key)[0];
        shipment_add[key] = { checked: val.children.length == res.data.permissions.shipment_add[key].length, partialChecked: val.children.length != res.data.permissions.shipment_add[key].length };
        for (const str of res.data.permissions.shipment_add[key]) shipment_add[`${key}-${str}`] = { checked: true, partialChecked: false };
      }
    }
    for (const key in res.data.permissions.shipment_edit) {
      if (res.data.permissions.shipment_edit[key].length > 0) {
        const val = store.state.tabs.filter((item) => item.key == key)[0];
        shipment_edit[key] = { checked: val.children.length == res.data.permissions.shipment_edit[key].length, partialChecked: val.children.length != res.data.permissions.shipment_edit[key].length };
        for (const str of res.data.permissions.shipment_edit[key]) shipment_edit[`${key}-${str}`] = { checked: true, partialChecked: false };
      }
    }
    form.value.setFieldValue('name', res.data.name);
    form.value.setFieldValue('shipment_add', shipment_add);
    form.value.setFieldValue('shipment_edit', shipment_edit);
    delete res.data.name;
    delete res.data.permissions.shipment_add;
    delete res.data.permissions.shipment_edit;
    for (const key in res.data.permissions) {
      form.value.setFieldValue(key, res.data.permissions[key]);
    }
    return;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong unable to fetch report blueprint', life: 2500 });
};

const onSubmit = async (data: any, { resetForm }: any) => {
  data = await store.dispatch('getSelectedPermissions', data);
  const res = await store.dispatch('saveRole', { id: route.params.id ? route.params.id : '0', ...data });
  if (res.status == 'success') {
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'Successfully saved', life: 2500 });
    resetForm();
    onCancel();
    return;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong unable to save operation', life: 2500 });
};

const onCancel = async () => {
  router.push({ name: 'RoleList' });
};
</script>
<style lang="scss">
.create__role {
  input,
  textarea,
  .p-calendar,
  .p-dropdown,
  .p-chips,
  .p-treeselect,
  .p-multiselect {
    width: 100%;
  }
  .p-inputnumber {
    display: block;
  }

  .col-md-6,
  .col-md-12 {
    margin-bottom: 25px !important;
  }
}
</style>
