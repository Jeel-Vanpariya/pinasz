<template>
  <Panel class="p-4">
    <template #header>
      <div class="d-flex align-items-center">
        <Button icon="pi pi-arrow-left" text raised rounded @click="onCancel" />
        <span class="fw-bold mx-4">{{ route.params.id ? 'Edit Product' : 'Add Product' }}</span>
      </div>
    </template>
    <Form ref="form" :validation-schema="schema" @submit="onSubmit">
      <div class="row mt-4 product__add">
        <div class="col-md-4 row m-0 p-0">
          <div class="col-md-10">
            <Field name="item_no" v-slot="{ value, errorMessage, handleChange }">
              <span class="p-float-label">
                <InputText id="item_no" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
                <label for="item_no">Item No.</label>
              </span>
              <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
            </Field>
          </div>
          <div class="col-md">
            <Button v-tooltip.top="'Generate'" icon="pi pi-sync" severity="success" rounded outlined @click="generateProductCounter" />
          </div>
        </div>
        <div class="col-md">
          <Field name="category" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <TreeSelect :model-value="value" :options="categories" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="category">Select a Category</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md">
          <Field name="item_name" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="item_name" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="item_name">Item Name</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
      </div>
      <div class="row mt-4 product__add">
        <div class="col-md-12">
          <Field name="additions_details" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <Textarea rows="5" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label>Additional Details</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
      </div>
      <div class="row mt-4 product__add">
        <div class="col-md">
          <Field name="brand" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="brand" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="brand">Brand</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md">
          <Field name="container_type" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <Dropdown
                :model-value="value"
                :options="containerTypes"
                filter
                id="container_type"
                option-label="type_name"
                option-value="id"
                :class="{ 'p-invalid': errorMessage }"
                @update:model-value="handleChange"
              />
              <label for="container_type">Container Type</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md">
          <Field name="pack" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="pack" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="pack">Pack</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
      </div>
      <div class="row mt-4 product__add">
        <div class="col-md">
          <Field name="pack_size" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="pack_size" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="pack_size">Pack Size</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md">
          <Field name="uom" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="uom" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="uom">UOM</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md">
          <Field name="cbm" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="cbm" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="cbm">CBM</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
      </div>
      <div class="row mt-4 product__add">
        <div class="col-md">
          <Field name="loading_per_container" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="loading_per_container" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="loading_per_container">Loading per Container</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md">
          <Field name="origin" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <Dropdown id="origin" filter :model-value="value" :options="countries" option-label="name" option-value="id" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="origin">Origin</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md">
          <Field name="loading_port" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <Dropdown
                :model-value="value"
                :options="loadingPorts"
                filter
                id="container_type"
                option-label="port_name"
                option-value="id"
                :class="{ 'p-invalid': errorMessage }"
                @update:model-value="handleChange"
              />
              <label for="loading_port">Loading Port</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
      </div>
      <div class="row mt-4 product__add">
        <div class="col-md">
          <Field name="last_fob" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="last_fob" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="last_fob">Last FOB</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md">
          <Field name="currency_id" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <Dropdown
                :model-value="value"
                :options="currencies"
                filter
                id="currency_id"
                option-label="name"
                option-value="id"
                :class="{ 'p-invalid': errorMessage }"
                @update:model-value="handleChange"
              />
              <label for="currency_id">Currency</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md">
          <Field name="date" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <Calendar :model-value="value" showIcon dateFormat="dd-mm-yy" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label>Date</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md">
          <Field name="supplier" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <MultiSelect
                :model-value="value"
                :options="suppliers"
                filter
                id="supplier"
                display="chip"
                optionLabel="supplier_name"
                optionValue="id"
                :class="{ 'p-invalid': errorMessage }"
                @update:model-value="handleChange"
                style="width: 100%"
              />
              <label for="supplier">Supplier</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
      </div>
      <div class="row mt-4 product__add">
        <div class="col-md text-center">
          <Button label="Save" icon="pi pi-save" type="submit" class="mx-4" />
          <Button label="Cancel" icon="pi pi-times" severity="danger" @click="onCancel" />
        </div>
      </div>
    </Form>
  </Panel>
  <Toast />
</template>
<script lang="ts" setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';
import MultiSelect from 'primevue/multiselect';
import Calendar from 'primevue/calendar';
import { ref, onMounted } from 'vue';
import { Field, Form } from 'vee-validate';
import * as yup from 'yup';
import store from '../../../stores/index';
import Panel from 'primevue/panel';
import router from '../../../router/index';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { useRoute } from 'vue-router';
import TreeSelect from 'primevue/treeselect';

const route = useRoute();
const toast = useToast();
const form = ref();
const categories = ref([]);
const containerTypes = ref([]);
const loadingPorts = ref([]);
const suppliers = ref([]);
const countries = ref([]);
const currencies = ref([]);
const schema = yup.object({
  item_no: yup.string().required('Please enter item no.'),
  category: yup.object().required('Please select a category'),
  item_name: yup.string().required('Please enter item name'),
  additions_details: yup.string(),
  brand: yup.string().required('Please enter brand'),
  container_type: yup.number().required('Please select a container type'),
  pack: yup.string().required('Please enter pack'),
  pack_size: yup.string().required('Please enter pack size'),
  uom: yup.string().required('Please enter UOM'),
  cbm: yup.string().required('Please enter CBM'),
  loading_per_container: yup.string().required('Please enter loading per container'),
  origin: yup.number().required('Please select origin'),
  loading_port: yup.number().required('Please select loading port'),
  last_fob: yup.number().required('Please enter last FOB'),
  currency_id: yup.number().required('Please select currency'),
  date: yup.date().required('Please select a date'),
  supplier: yup.array().min(1).required('Please select a supplier')
});

onMounted(async () => {
  store.state.spinner = true;
  await getProductCategories();
  await getContainerType();
  await getLoadingPort();
  await getProductSuppliers();
  await getCountries();
  await getCurrencies();
  form.value.resetForm();
  if (route.params.id) getProductForEdit();
  store.state.spinner = false;
});

const getCountries = async () => {
  store.state.spinner = true;
  const res = await store.dispatch('getCountries');
  store.state.spinner = false;
  if (res.status == 'success') {
    countries.value = res.data;
    return;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong unable to fetch countries', life: 2500 });
};

const getCurrencies = async () => {
  store.state.spinner = true;
  const res = await store.dispatch('getCurrencies');
  store.state.spinner = false;
  if (res.status == 'success') {
    currencies.value = res.data;
    return;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong unable to fetch currencies', life: 2500 });
};

const getProductCategories = async () => {
  const res = await store.dispatch('getProductCategories');
  if (res.status == 'success') {
    categories.value = res.data;
    return;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong unable to fetch category details', life: 2500 });
};

const getContainerType = async () => {
  const res = await store.dispatch('getContainerType');
  if (res.status == 'success') {
    containerTypes.value = res.data;
    return;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong unable to fetch container types', life: 2500 });
};

const getLoadingPort = async () => {
  store.state.spinner = true;
  const res = await store.dispatch('getLoadingPort');
  store.state.spinner = false;
  if (res.status == 'success') {
    loadingPorts.value = res.data;
    return;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong unable to fetch loading port', life: 2500 });
};

const getProductSuppliers = async () => {
  const res = await store.dispatch('getProductSuppliers');
  if (res.status == 'success') {
    suppliers.value = res.data;
    return;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong unable to fetch suppliers details', life: 2500 });
};

const getProductForEdit = async () => {
  const res = await store.dispatch('getProductForEdit', { id: route.params.id });
  if (res.status == 'success') {
    res.data.container_type = res.data.container_type_id;
    res.data.loading_port = res.data.loading_port_id;
    res.data.date = new Date(res.data.date);
    if (!res.data.additions_details) delete res.data.additions_details;
    form.value.setValues(res.data);
    return;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong unable to fetch product details', life: 2500 });
};

const generateProductCounter = async () => {
  store.state.spinner = false;
  const res = await store.dispatch('generateProductCounter');
  store.state.spinner = false;
  if (res.status == 'success') {
    form.value.setFieldValue('item_no', `${res.data}`, false);
    return;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong unable to generate Item no.', life: 2500 });
};

const checkProductCounter = async () => {
  const str = form.value.getValues().item_no.toUpperCase();
  const charCount = (str.match(new RegExp('[a-zA-Z]', 'g')) || []).length;
  const numCount = (str.match(new RegExp('[0-9]', 'g')) || []).length;
  const specificCharCount = (str.match(new RegExp('A', 'g')) || []).length;

  if (specificCharCount == 0 || specificCharCount > 1 || charCount > 1 || charCount == 0 || numCount == 0 || numCount > 6 || numCount < 6) {
    toast.add({ severity: 'error', summary: 'Error Message', detail: 'Invalid Item no.', life: 2500 });
    return false;
  }

  store.state.spinner = false;
  const res = await store.dispatch('checkProductCounter', { item_no: str, id: route.params.id });
  store.state.spinner = false;
  if (res.status == 'success') {
    if (!res.data) return true;
    toast.add({ severity: 'error', summary: 'Error Message', detail: 'Please regenerate Item no.', life: 2500 });
    return false;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong unable to check Item no.', life: 2500 });
  return false;
};

const onSubmit = async (data: any, { resetForm }: any) => {
  const counterCheck = await checkProductCounter();
  if (counterCheck) {
    data.item_no = data.item_no.toUpperCase();
    const res = await store.dispatch('saveProduct', { id: route.params.id ? route.params.id : '0', ...data });
    if (res.status == 'success') {
      toast.add({ severity: 'success', summary: 'Success Message', detail: 'Successfully saved', life: 2500 });
      resetForm();
      onCancel();
      return;
    }
    toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong unable to save operation', life: 2500 });
  }
};

const onCancel = () => {
  router.push({ name: 'Products' });
};
</script>
<style lang="scss">
.product__add input,
.product__add textarea,
.product__add .p-dropdown,
.product__add .p-calendar,
.product__add .p-treeselect {
  width: 100%;
}
</style>
