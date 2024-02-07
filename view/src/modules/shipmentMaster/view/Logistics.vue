<template>
  <div class="row mt-4 add__shipment__logistics">
    <div
      class="col-md-4"
      :class="[store.state.permission.shipment_add.logistics.includes('dhl_no') || (store.state.permission.shipment_edit.logistics.includes('dhl_no') && $route.params.id) ? '' : 'd-none']"
    >
      <Field name="dhl_no" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <InputText id="dhl_no" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="dhl_no">DHL No.</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div class="col-md-4">
      <Field name="inspection" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Dropdown id="inspection" :options="store.state.inspection" filter :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="inspection">Inspection <i class="mdi mdi-multiplication text-danger" /></label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div
      class="col-md-4"
      :class="[store.state.permission.shipment_add.logistics.includes('cod_number') || (store.state.permission.shipment_edit.logistics.includes('cod_number') && $route.params.id) ? '' : 'd-none']"
    >
      <Field name="cod_number" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <InputText id="cod_number" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="cod_number">COD Number</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div
      class="col-md-4"
      :class="[store.state.permission.shipment_add.logistics.includes('rfi_date') || (store.state.permission.shipment_edit.logistics.includes('rfi_date') && $route.params.id) ? '' : 'd-none']"
    >
      <Field name="rfi_date" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Calendar id="rfi_date" :model-value="value" showIcon dateFormat="dd-mm-yy" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="rfi_date">RFI Date</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div
      class="col-md-4"
      :class="[store.state.permission.shipment_add.logistics.includes('consignee') || (store.state.permission.shipment_edit.logistics.includes('consignee') && $route.params.id) ? '' : 'd-none']"
    >
      <Field name="consignee_id" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Dropdown
            id="consignee_id"
            :model-value="value"
            :options="store.state.consignees"
            optionLabel="consignee_name"
            optionValue="id"
            filter
            :class="{ 'p-invalid': errorMessage }"
            @update:model-value="handleChange"
          />
          <label for="consignee_id">Consignee</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div
      class="col-md-4"
      :class="[
        store.state.permission.shipment_add.logistics.includes('freight_booking_date') || (store.state.permission.shipment_edit.logistics.includes('freight_booking_date') && $route.params.id)
          ? ''
          : 'd-none'
      ]"
    >
      <Field name="freight_booking_date" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Calendar id="freight_booking_date" :model-value="value" showIcon dateFormat="dd-mm-yy" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="freight_booking_date">Freight Booking Date</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div
      class="col-md-4"
      :class="[
        store.state.permission.shipment_add.logistics.includes('estimated_dob') || (store.state.permission.shipment_edit.logistics.includes('estimated_dob') && $route.params.id) ? '' : 'd-none'
      ]"
    >
      <Field name="estimated_dob" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Calendar id="estimated_dob" :model-value="value" showIcon dateFormat="dd-mm-yy" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="estimated_dob">Estimated DOB</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div
      class="col-md-4"
      :class="[
        store.state.permission.shipment_add.logistics.includes('freight_booking_no') || (store.state.permission.shipment_edit.logistics.includes('freight_booking_no') && $route.params.id)
          ? ''
          : 'd-none'
      ]"
    >
      <Field name="freight_booking_no" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <InputText id="freight_booking_no" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="freight_booking_no">Freight Booking No.</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div
      class="col-md-4"
      :class="[store.state.permission.shipment_add.logistics.includes('bl_no') || (store.state.permission.shipment_edit.logistics.includes('bl_no') && $route.params.id) ? '' : 'd-none']"
    >
      <Field name="bl_no" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <InputText id="bl_no" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="bl_no">BL No.</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div
      class="col-md-4"
      :class="[store.state.permission.shipment_add.logistics.includes('revised_dob') || (store.state.permission.shipment_edit.logistics.includes('revised_dob') && $route.params.id) ? '' : 'd-none']"
    >
      <Field name="revised_dob" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Calendar id="revised_dob" :model-value="value" showIcon dateFormat="dd-mm-yy" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="revised_dob">Revised DOB</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div
      class="col-md-4"
      :class="[store.state.permission.shipment_add.logistics.includes('actual_dob') || (store.state.permission.shipment_edit.logistics.includes('actual_dob') && $route.params.id) ? '' : 'd-none']"
    >
      <Field name="actual_dob" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Calendar id="actual_dob" :model-value="value" showIcon dateFormat="dd-mm-yy" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="actual_dob">Actual DOB</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div
      class="col-md-4"
      :class="[store.state.permission.shipment_add.logistics.includes('scan_bl_date') || (store.state.permission.shipment_edit.logistics.includes('scan_bl_date') && $route.params.id) ? '' : 'd-none']"
    >
      <Field name="scan_bl_date" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Calendar id="scan_bl_date" :model-value="value" showIcon dateFormat="dd-mm-yy" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="scan_bl_date">Scan BL Date</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div
      class="col-md-4"
      :class="[store.state.permission.shipment_add.logistics.includes('stuf_photo') || (store.state.permission.shipment_edit.logistics.includes('stuf_photo') && $route.params.id) ? '' : 'd-none']"
    >
      <Field name="stuf_photo" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Calendar id="stuf_photo" :model-value="value" showIcon dateFormat="dd-mm-yy" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="stuf_photo">Stuf Photos</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div
      class="col-md-4"
      :class="[
        store.state.permission.shipment_add.logistics.includes('est_arriv_date') || (store.state.permission.shipment_edit.logistics.includes('est_arriv_date') && $route.params.id) ? '' : 'd-none'
      ]"
    >
      <Field name="est_arriv_date" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Calendar id="est_arriv_date" :model-value="value" showIcon dateFormat="dd-mm-yy" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="est_arriv_date">Est Arriv Date</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div
      class="col-md-4"
      :class="[store.state.permission.shipment_add.logistics.includes('draft_cnca') || (store.state.permission.shipment_edit.logistics.includes('draft_cnca') && $route.params.id) ? '' : 'd-none']"
    >
      <Field name="draft_cnca" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Calendar id="draft_cnca" :model-value="value" showIcon dateFormat="dd-mm-yy" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="draft_cnca">Draft CNCA</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div
      class="col-md-4"
      :class="[
        store.state.permission.shipment_add.logistics.includes('original_cnca') || (store.state.permission.shipment_edit.logistics.includes('original_cnca') && $route.params.id) ? '' : 'd-none'
      ]"
    >
      <Field name="original_cnca" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Calendar id="original_cnca" :model-value="value" showIcon dateFormat="dd-mm-yy" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="original_cnca">Original CNCA</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div
      class="col-md-4"
      :class="[store.state.permission.shipment_add.logistics.includes('cnca_agent') || (store.state.permission.shipment_edit.logistics.includes('cnca_agent') && $route.params.id) ? '' : 'd-none']"
    >
      <Field name="cnca_agent_id" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Dropdown
            id="cnca_agent_id"
            :model-value="value"
            :options="store.state.suppliers"
            optionLabel="supplier_name"
            optionValue="id"
            filter
            :class="{ 'p-invalid': errorMessage }"
            @update:model-value="handleChange"
          />
          <label for="cnca_agent_id">CNCA Agent</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div
      class="col-md-4"
      :class="[store.state.permission.shipment_add.logistics.includes('dup') || (store.state.permission.shipment_edit.logistics.includes('dup') && $route.params.id) ? '' : 'd-none']"
    >
      <Field name="dup" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Calendar id="dup" :model-value="value" showIcon dateFormat="dd-mm-yy" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="dup">DUP</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </Field>
    </div>

    <div
      class="col-md-12"
      :class="[store.state.permission.shipment_add.logistics.includes('remarks') || (store.state.permission.shipment_edit.logistics.includes('remarks') && $route.params.id) ? '' : 'd-none']"
    >
      <Field name="remarks" v-slot="{ value, errorMessage, handleChange }">
        <span class="p-float-label">
          <Textarea id="remarks" :model-value="value" autoResize rows="3" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
          <label for="remarks">Remarks</label>
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
import Textarea from 'primevue/textarea';
</script>
<style lang="scss">
.add__shipment__logistics {
  .col-md-4,
  .row {
    margin-bottom: 25px !important;
  }
}
</style>
