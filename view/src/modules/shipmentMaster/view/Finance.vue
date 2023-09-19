<template>
  <div class="row mt-4 add__shipment__finance">
    <div class="col-md-4">
      <Field name="adv_rec_date" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Calendar id="adv_rec_date" :model-value="value" showIcon dateFormat="dd-mm-yy" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="adv_rec_date">Adv Rec Date</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div class="col-md-4">
      <Field name="adv_pay_date" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Calendar id="adv_pay_date" :model-value="value" showIcon dateFormat="dd-mm-yy" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="adv_pay_date">Adv Pay Date</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div class="col-md-4">
      <Field name="purchase_invoice" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <InputText id="purchase_invoice" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="purchase_invoice">Purchase Invoice</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div class="col-md-4 d-flex justify-content-between">
      <div>
        <Field name="sale_invoice_val" v-slot="{ value, errorMessage, handleChange }">
          <span class="p-float-label">
            <InputNumber id="sale_invoice_val" inputId="integeronly" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
            <label for="sale_invoice_val">Sale Invoice Val</label>
          </span>
          <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
        </Field>
      </div>
      <div>
        <Field name="sale_invoice_val_currency_id" v-slot="{ value, errorMessage, handleChange }">
          <span class="p-float-label">
            <Dropdown
              id="sale_invoice_val_currency_id"
              :model-value="value"
              :options="store.state.currencies"
              optionLabel="name"
              optionValue="id"
              filter
              :class="{ 'p-invalid': errorMessage }"
              @update:model-value="handleChange"
              style="width: 200px"
            />
            <label for="sale_invoice_val_currency_id">Currency</label>
          </span>
          <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
        </Field>
      </div>
    </div>

    <div class="col-md-4">
      <Field name="sale_inv_no" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <InputText id="sale_inv_no" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="sale_inv_no">Sale Inv No.</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div class="col-md-4">
      <Field name="s_f_inv_no" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <InputText id="s_f_inv_no" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="s_f_inv_no">Supplier Final Invoice number</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div class="col-md-4 d-flex justify-content-between">
      <div>
        <Field name="s_final_inv_value" v-slot="{ value, errorMessage, handleChange }">
          <span class="p-float-label">
            <InputNumber id="s_final_inv_value" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
            <label for="s_final_inv_value">Supplier final invoice value</label>
          </span>
          <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
        </Field>
      </div>
      <div>
        <Field name="s_final_inv_value_currency_id" v-slot="{ value, errorMessage, handleChange }">
          <span class="p-float-label">
            <Dropdown
              id="s_final_inv_value_currency_id"
              :model-value="value"
              :options="store.state.currencies"
              optionLabel="name"
              optionValue="id"
              filter
              :class="{ 'p-invalid': errorMessage }"
              @update:model-value="handleChange"
              style="width: 200px"
            />
            <label for="s_final_inv_value_currency_id">Currency</label>
          </span>
          <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
        </Field>
      </div>
    </div>

    <div class="col-md-4">
      <Field name="final_rec_date" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Calendar id="final_rec_date" :model-value="value" showIcon dateFormat="dd-mm-yy" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="final_rec_date">Final rec date</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div class="col-md-4">
      <Field name="final_pay_date" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Calendar id="final_pay_date" :model-value="value" showIcon dateFormat="dd-mm-yy" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="final_pay_date">Final Pay Date</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div class="col-md-4">
      <Field name="percentage" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <InputNumber id="percentage" inputId="percent" suffix="%" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="percentage">%%</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div class="col-md-4">
      <Field name="payment_request_lot" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <InputText id="payment_request_lot" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label name="payment_request_lot">Payment request Lot</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div class="col-md-4 d-none">
      <Field name="commission" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <InputNumber
            id="commission"
            putId="minmaxfraction"
            :minFractionDigits="2"
            :maxFractionDigits="2"
            :model-value="value"
            :class="{ 'p-invalid': errorMessage }"
            @update:model-value="handleChange"
          />
          <label for="commission"> Commission </label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div class="col-md-4 d-none">
      <Field name="share" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <InputNumber
            id="share"
            inputId="minmaxfraction"
            :minFractionDigits="2"
            :maxFractionDigits="2"
            :model-value="value"
            :class="{ 'p-invalid': errorMessage }"
            @update:model-value="handleChange"
          />
          <label for="share"> Share </label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>
    <div class="col-md-4">
      <Field name="shipping_line_id" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Dropdown
            id="shipping_line_id"
            :model-value="value"
            :options="store.state.shippingLine"
            optionLabel="name"
            optionValue="id"
            filter
            :class="{ 'p-invalid': errorMessage }"
            @update:model-value="handleChange"
          />
          <label for="shipping_line_id">Shipping Line</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Field } from 'vee-validate';
import store from '../../../stores/index';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import InputNumber from 'primevue/inputnumber';
</script>
<style lang="scss">
.add__shipment__finance {
  .col-md-4,
  .row {
    margin-bottom: 25px !important;
  }
}
</style>
