<template>
  <div class="d-flex justify-content-center align-items-center user__auth">
    <Form :validation-schema="schema" @submit="onSubmit" class="user__auth__form">
      <div class="d-flex flex-column">
        <Field name="email" v-slot="{ value, errorMessage, handleChange }">
          <span class="p-float-label p-input-icon-left">
            <i class="pi pi-user" />
            <InputText id="email" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
            <label for="email">Email</label>
          </span>
          <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
        </Field>
      </div>
      <div class="d-flex flex-column mt-4">
        <Field name="password" v-slot="{ value, errorMessage, handleChange }">
          <span class="p-float-label">
            <Password :model-value="value" toggleMask id="password" type="text" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
            <label for="password">Password</label>
          </span>
          <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
        </Field>
      </div>
      <div class="d-flex flex-column mt-4">
        <Button type="submit" label="Submit" />
      </div>
    </Form>
    <Toast />
  </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Toast from 'primevue/toast';
import { Field, Form } from 'vee-validate';
import * as yup from 'yup';
import store from '../../../stores/index';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8)
});

const onSubmit = async (data: any) => {
  store.state.spinner = true;
  const res = await store.dispatch('login', data);
  store.state.spinner = false;
  if (res.status == 'success') {
    if (res.message) toast.add({ severity: 'error', summary: 'Error Message', detail: res.message, life: 2500 });
    else {
      sessionStorage.setItem('user_id', res.data.id);
      router.replace({ name: 'dashboard' });
    }
    return;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong', life: 2500 });
};
</script>

<style lang="scss">
.user__auth {
  height: 100vh;
  background: #f6dcdc;
}
.user__auth__form {
  background: #fff;
  padding: 50px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 1rem;
}
</style>
