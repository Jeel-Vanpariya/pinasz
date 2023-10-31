<template>
  <Panel class="p-4">
    <template #header>
      <div class="d-flex align-items-center">
        <Button icon="pi pi-arrow-left" text raised rounded @click="onCancel" />
        <span class="fw-bold mx-4">{{ route.params.id ? 'Edit Report Blueprint' : 'Create Report Blueprint' }}</span>
      </div>
    </template>
    <Form ref="form" :validation-schema="schema" @submit="onSubmit">
      <div class="row mt-3 create__report">
        <div class="col-md-12">
          <Field name="name" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="name" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="name">Name</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md-6">
          <Field name="primary_master" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <Dropdown
                id="primary_master"
                :options="primaryMaster"
                :model-value="value"
                :class="{ 'p-invalid': errorMessage }"
                optionLabel="label"
                optionValue="key"
                @update:model-value="handleChange"
                @change="handleSelectChange('first')"
              />
              <label for="primary_master">Primary Master</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md-6">
          <Field name="second_master" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <Dropdown
                id="second_master"
                :options="secondMaster"
                :model-value="value"
                :class="{ 'p-invalid': errorMessage }"
                optionLabel="label"
                optionValue="key"
                @update:model-value="handleChange"
                @change="handleSelectChange('second')"
              />
              <label for="second_master">Second Master</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md-6">
          <Field name="third_master" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <Dropdown
                id="third_master"
                :options="thirdMaster"
                :model-value="value"
                :class="{ 'p-invalid': errorMessage }"
                optionLabel="label"
                optionValue="key"
                @update:model-value="handleChange"
                @change="handleSelectChange('third')"
              />
              <label for="third_master">Third Master</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md-6 invisible">
          <Field name="forth_master" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <Dropdown id="forth_master" :options="forthMaster" :model-value="value" :class="{ 'p-invalid': errorMessage }" optionLabel="label" optionValue="key" @update:model-value="handleChange" />
              <label for="forth_master">Forth Master</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md-12">
          <Field name="report_columns" v-slot="{ value, errorMessage, handleChange }">
            <label class="mb-1" for="report_columns">Report Columns</label>
            <Tree
              id="report_columns"
              :selection-keys="value"
              :value="treeNodes"
              filter
              filterMode="strict"
              :class="{ 'p-invalid': errorMessage }"
              selectionMode="checkbox"
              @update:selection-keys="handleChange"
            />
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
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Panel from 'primevue/panel';
import Tree from 'primevue/tree';
import { Field, Form } from 'vee-validate';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import * as yup from 'yup';
import store from '../../../stores/index';
import { useToast } from 'primevue/usetoast';

const route = useRoute();
const toast = useToast();
const form = ref();
const schema = yup.object({
  name: yup.string().required('Please enter name'),
  primary_master: yup.string().required('Please select master'),
  second_master: yup.string(),
  third_master: yup.string(),
  forth_master: yup.string(),
  report_columns: yup.object().required('Please select columns')
});
const primaryMaster = ref([]) as any;
const secondMaster = ref([]) as any;
const thirdMaster = ref([]) as any;
const forthMaster = ref([]) as any;
const treeNodes = ref([]) as any;

onMounted(() => {
  store.state.spinner = true;
  primaryMaster.value = store.state.masters.map((item) => ({ key: item.data, label: item.label }));
  if (route.params.id) getBlueprintForEdit();
  store.state.spinner = false;
});

const getBlueprintForEdit = async () => {
  const res = await store.dispatch('getBlueprintForEdit', { id: route.params.id });
  if (res.status == 'success') {
    res.data.report_columns = await store.dispatch('getSelectedModules', { report_columns: {}, columns: JSON.parse(res.data.report_columns), res: [] }).then((res) => {
      return res.report_columns;
    });
    form.value.setFieldValue('name', res.data.name, false);
    form.value.setFieldValue('primary_master', res.data.primary_master, false);
    handleSelectChange('first');
    if (res.data.second_master) form.value.setFieldValue('second_master', res.data.second_master, false);
    handleSelectChange('second');
    if (res.data.third_master) form.value.setFieldValue('third_master', res.data.third_master, false);
    handleSelectChange('third');
    if (res.data.forth_master) form.value.setFieldValue('forth_master', res.data.forth_master, false);
    form.value.setFieldValue('report_columns', res.data.report_columns, false);
    return;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong unable to fetch report blueprint', life: 2500 });
};

const handleSelectChange = (stage: string) => {
  const options = store.state.masters.map((item) => ({ key: item.data, label: item.label })),
    values = form.value.getValues();
  treeNodes.value = [];
  form.value.resetField('report_columns');
  switch (stage) {
    case 'first':
      thirdMaster.value = [];
      forthMaster.value = [];
      secondMaster.value = [];
      form.value.resetField('second_master');
      form.value.resetField('third_master');
      form.value.resetField('forth_master');
      switch (values.primary_master) {
        case 'shipment_master':
          secondMaster.value = options.filter((item) => ![values.primary_master].includes(item.key));
          break;
        case 'customer_master':
          secondMaster.value = options.filter((item) => ['shipment_master'].includes(item.key));
          break;
        case 'supplier_master':
          secondMaster.value = options.filter((item) => ![values.primary_master, 'customer_master'].includes(item.key));
          break;
        case 'product_master':
          secondMaster.value = options.filter((item) => ![values.primary_master, 'customer_master'].includes(item.key));
          break;
      }
      break;
    case 'second':
      thirdMaster.value = [];
      forthMaster.value = [];
      form.value.resetField('third_master');
      form.value.resetField('forth_master');
      if (values.primary_master == 'shipment_master' && values.second_master == 'supplier_master') {
        thirdMaster.value = options.filter((item) => ['product_master'].includes(item.key));
      } else if (values.primary_master == 'product_master' && values.second_master == 'shipment_master') {
        thirdMaster.value = options.filter((item) => ['customer_master'].includes(item.key));
      } else if (values.second_master == 'shipment_master') {
        thirdMaster.value = options.filter((item) => ![values.primary_master, values.second_master].includes(item.key));
      }
      break;
    case 'third':
      forthMaster.value = [];
      form.value.resetField('forth_master');
      if (values.second_master == 'shipment_master' && values.third_master == 'supplier_master') {
        forthMaster.value = options.filter((item) => ['product_master'].includes(item.key));
      }
      break;
  }
  treeNodes.value.push(...store.state.masters.filter((item) => [values.primary_master, values.second_master, values.third_master, values.forth_master].includes(item.data)));
};

const onSubmit = async (data: any, { resetForm }: any) => {
  data.report_columns = await store.dispatch('getSelectedModules', { report_columns: data.report_columns, columns: {}, res: [] }).then((res) => {
    return res.columns;
  });
  const res = await store.dispatch('saveReportBlueprint', { id: route.params.id ? route.params.id : '0', ...data });
  if (res.status == 'success') {
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'Successfully saved', life: 2500 });
    resetForm();
    onCancel();
    return;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong unable to save operation', life: 2500 });
};

const onCancel = async () => {
  router.push({ name: 'ReportBlueprintList' });
};
</script>
<style lang="scss">
.create__report {
  input,
  textarea,
  .p-calendar,
  .p-dropdown,
  .p-chips,
  .p-chips-multiple-container {
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
