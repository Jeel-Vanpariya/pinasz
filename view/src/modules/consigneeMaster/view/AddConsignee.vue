<template>
  <Panel class="p-4">
    <template #header>
      <div class="d-flex align-items-center">
        <Button icon="pi pi-arrow-left" text raised rounded @click="onCancel" />
        <span class="fw-bold mx-4">{{ route.params.id ? 'Edit Consignee' : 'Add Consignee' }}</span>
      </div>
    </template>
    <Form ref="form" :validation-schema="schema" @submit="onSubmit">
      <div class="row mt-4 consignee__add">
        <div class="col-md">
          <Field name="consignee_name" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="consignee_name" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="consignee_name">Consignee Name</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md">
          <Field name="phone_no" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="phone_no" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="phone_no">Phone no.</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md">
          <Field name="email" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="email" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="email">Email</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md">
          <Field name="tax_id" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="tax_id" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="tax_id">Tax Id</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
      </div>
      <div class="row mt-4 consignee__add">
        <div class="col-md-12">
          <Field name="address" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="address" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="address">Address</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
      </div>
      <div class="row mt-4 consignee__add">
        <div class="col-md">
          <Field name="pincode" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="pincode" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="pincode">Pincode</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md">
          <Field name="city" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="city" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="city">City</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md">
          <Field name="state" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="state" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="state">State</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md">
          <Field name="country_id" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <Dropdown
                id="country_id"
                filter
                :model-value="value"
                :options="countries"
                option-label="name"
                option-value="id"
                :class="{ 'p-invalid': errorMessage }"
                @update:model-value="handleChange"
              />
              <label for="country_id">Country</label>
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
import { ref, onMounted } from 'vue';
import { Field, Form } from 'vee-validate';
import * as yup from 'yup';
import store from '../../../stores/index';
import Panel from 'primevue/panel';
import { useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import router from '../../../router/index';
import Dropdown from 'primevue/dropdown';

const form = ref();
const route = useRoute();
const toast = useToast();
const countries = ref([]);
const schema = yup.object({
  consignee_name: yup.string().required('Please enter consignee name'),
  phone_no: yup.string().required('Please enter phone no.'),
  email: yup.string().email().required('Please enter email'),
  country_id: yup.number().required('Please select country'),
  city: yup.string().required('Please enter city'),
  state: yup.string().required('Please enter state'),
  pincode: yup.string().required('Please enter pincode'),
  address: yup.string().required('Please enter address'),
  tax_id: yup.string().required('Please enter tax id')
});

onMounted(async () => {
  store.state.spinner = true;
  await getCountries();
  form.value.resetForm();
  if (route.params.id) await getConsigneeForEdit();
  store.state.spinner = false;
});

const getCountries = async () => {
  const res = await store.dispatch('getCountries');
  if (res.status == 'success') countries.value = res.data;
};

const getConsigneeForEdit = async () => {
  store.state.spinner = true;
  const res = await store.dispatch('getConsigneeForEdit', { id: route.params.id });
  store.state.spinner = false;
  if (res.status == 'success') {
    form.value.setValues(res.data);
    return;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong unable to fetch consignee details', life: 2500 });
};

const onSubmit = async (data: any, { resetForm }: any) => {
  const res = await store.dispatch('saveConsignee', { id: route.params.id ? route.params.id : '0', ...data });
  if (res.status == 'success') {
    resetForm();
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'Consignee successfully saved', life: 2500 });
    onCancel();
    return;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong unable to save operation', life: 2500 });
};

const onCancel = () => {
  router.replace({ name: 'ConsigneeList' });
};
</script>
<style lang="scss">
.consignee__add {
  input,
  textarea,
  .p-dropdown,
  .p-calendar {
    width: 100%;
  }
}
</style>
