<template>
  <Panel class="p-4">
    <template #header>
      <div class="d-flex align-items-center">
        <Button icon="pi pi-arrow-left" text raised rounded @click="onCancel" />
        <span class="fw-bold mx-4">{{ route.params.id ? 'Edit Supplier' : 'Add Supplier' }}</span>
      </div>
    </template>
    <Form ref="form" :validation-schema="schema" @submit="onSubmit">
      <div class="row mt-4 supplier__add">
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
          <Field name="supplier_name" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="supplier_name" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="supplier_name">Supplier Name</label>
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
      </div>
      <div class="row mt-4 supplier__add">
        <div class="col-md">
          <Field name="address" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="address" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="address">Address</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
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
      <div class="row mt-4 supplier__add">
        <div class="col-md">
          <Field name="bank_account_no" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="bank_account_no" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="bank_account_no">Bank A/c No.</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md">
          <Field name="bank_name" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="bank_name" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="bank_name">Bank Name</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md">
          <Field name="bank_address" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="bank_address" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="bank_address">Bank Address & Branch</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
      </div>
      <div class="row mt-4 supplier__add">
        <div class="col-md">
          <Field name="iban_no" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="iban_no" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="iban_no">IBAN No.</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md">
          <Field name="swift_code" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="swift_code" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="swift_code">Swift Code/BIC</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
        <div class="col-md">
          <Field name="payment_term_id" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <Dropdown
                id="payment_term_id"
                :model-value="value"
                :options="paymentTerms"
                option-label="payment_term"
                option-value="id"
                :class="{ 'p-invalid': errorMessage }"
                @update:model-value="handleChange"
              />
              <label for="payment_term_id">Payment Terms</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
          </Field>
        </div>
      </div>
      <div class="row mt-4 supplier__add">
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
          <Field name="contact_person" v-slot="{ value, errorMessage, handleChange }">
            <span class="p-float-label">
              <InputText id="contact_person" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <label for="contact_person">Contact Person</label>
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
const paymentTerms = ref([]);
const countries = ref([]);
const schema = yup.object({
  s_no: yup.string().required('Please enter S no.'),
  supplier_name: yup.string().required('Please enter supplier name'),
  phone_no: yup.string().required('Please enter phone no.'),
  address: yup.string().required('Please enter address'),
  pincode: yup.string().required('Please enter pincode'),
  bank_name: yup.string(),
  bank_address: yup.string(),
  bank_account_no: yup.string(),
  iban_no: yup.string(),
  swift_code: yup.string(),
  country_id: yup.number().required('Please select country'),
  payment_term_id: yup.number().required('Please select payment terms'),
  contact_person: yup.string().required('Please enter contact person'),
  email: yup.string().required('Please enter email'),
  contact_no: yup.string().required('Please enter contact no.')
});

onMounted(async () => {
  store.state.spinner = true;
  await getPaymentTerm();
  await getCountries();
  form.value.resetForm();
  if (route.params.id) await getSupplierForEdit();
  store.state.spinner = false;
});

const getCountries = async () => {
  const res = await store.dispatch('getCountries');
  if (res.status == 'success') countries.value = res.data;
};

const getPaymentTerm = async () => {
  const res = await store.dispatch('getPaymentTerm');
  if (res.status == 'success' && res.data.length > 0) {
    for (const object of res.data) {
      object.payment_term = `${object.advance_percentage}% ${object.advance_text} - ${object.pending_percentage}% ${object.pending_text}`;
    }
    paymentTerms.value = res.data;
  }
};

const getSupplierForEdit = async () => {
  store.state.spinner = true;
  const res = await store.dispatch('getSupplierForEdit', { id: route.params.id });
  store.state.spinner = false;
  if (res.status == 'success') {
    if (!res.data.bank_name) delete res.data.bank_name;
    if (!res.data.bank_address) delete res.data.bank_address;
    if (!res.data.bank_account_no) delete res.data.bank_account_no;
    if (!res.data.iban_no) delete res.data.iban_no;
    if (!res.data.swift_code) delete res.data.swift_code;
    form.value.setValues(res.data);
    return;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong unable to fetch supplier details', life: 2500 });
};

const onSubmit = async (data: any, { resetForm }: any) => {
  const res = await store.dispatch('saveSupplier', { id: route.params.id ? route.params.id : '0', ...data });
  if (res.status == 'success') {
    resetForm();
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'Supplier successfully saved', life: 2500 });
    onCancel();
    return;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong unable to save operation', life: 2500 });
};

const onCancel = () => {
  router.replace({ name: 'SuppliersList' });
};
</script>
<style lang="scss">
.supplier__add {
  input,
  textarea,
  .p-dropdown,
  .p-calendar {
    width: 100%;
  }
}
</style>
