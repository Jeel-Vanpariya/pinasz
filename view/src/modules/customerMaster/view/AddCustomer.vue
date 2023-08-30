<template>
  <Panel class="p-4">
    <template #header>
      <div class="d-flex align-items-center">
        <Button icon="pi pi-arrow-left" text raised rounded @click="onCancel" />
        <span class="fw-bold mx-4">{{ route.params.id ? 'Edit Customer' : 'Add Customer' }}</span>
      </div>
    </template>
    <Form ref="form" :validation-schema="schema" @submit="onSubmit">
      <div class="row mt-4 customer__add">
        <div class="col-md">
          <Field name="s_no" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="s_no" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="s_no">S No.</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md">
          <Field name="group_name" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="group_name" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="group_name">Group Name</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md">
          <Field name="buyer_name" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="buyer_name" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="buyer_name">Buyer Name</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
      </div>
      <div class="row mt-4 customer__add">
        <div class="col-md-12">
          <Field name="address" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <Textarea rows="5" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label>Address</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
      </div>
      <div class="row mt-4 customer__add">
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
        <div class="col-md">
          <Field name="contact_person" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="contact_person" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="contact_person">Contact Person</label>
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
          <Field name="contact_no" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="contact_no" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="contact_no">Contact No.</label>
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
  s_no: yup.string().required('Please enter S no.'),
  group_name: yup.string().required('Please enter group name'),
  buyer_name: yup.string().required('Please enter buyer name'),
  address: yup.string().required('Please enter address'),
  country_id: yup.number().required('Please select country'),
  contact_person: yup.string().required('Please enter contact person'),
  email: yup.string().required('Please enter email'),
  contact_no: yup.string().required('Please enter contact no.')
});

onMounted(async () => {
  form.value.resetForm();
  await getCountries();
  if (route.params.id) await getCustomerForEdit();
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

const getCustomerForEdit = async () => {
  store.state.spinner = true;
  const res = await store.dispatch('getCustomerForEdit', { id: route.params.id });
  store.state.spinner = false;
  if (res.status == 'success') {
    form.value.setValues(res.data);
    return;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong unable to fetch supplier details', life: 2500 });
};

const onSubmit = async (data: any, { resetForm }: any) => {
  const res = await store.dispatch('saveCustomer', { id: route.params.id ? route.params.id : '0', ...data });
  if (res.status == 'success') {
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'Successfully saved', life: 2500 });
    resetForm();
    onCancel();
    return;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong unable to save operation', life: 2500 });
};

const onCancel = () => {
  router.replace({ name: 'CustomersList' });
};
</script>
<style lang="scss">
.customer__add input,
.customer__add textarea,
.customer__add .p-dropdown,
.customer__add .p-calendar {
  width: 100%;
}
</style>
