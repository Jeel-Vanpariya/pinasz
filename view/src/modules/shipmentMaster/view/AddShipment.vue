<template>
  <Panel class="p-4">
    <template #header>
      <div class="d-flex align-items-center">
        <Button icon="pi pi-arrow-left" text raised rounded @click="onCancel" />
        <span class="fw-bold mx-4">{{ route.params.id ? 'Edit Shipment' : 'Add Shipment' }}</span>
      </div>
    </template>
    <template #icons>
      <Button v-tooltip.bottom="'Refresh Masters'" icon="pi pi-refresh" severity="success" text raised rounded @click="refreshMasters" />
    </template>
    <Form ref="form" :validation-schema="schema" @submit="onSubmit">
      <TabView v-model:activeIndex="active">
        <TabPanel>
          <template #header>
            <span>Pre Shipment</span>
            <i class="mdi mdi-multiplication ms-1 text-danger" />
          </template>
          <div class="row mt-4 add__shipment">
            <div class="col-md-4">
              <Field name="po_no" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <InputText id="po_no" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
                  <label for="po_no">PO Number <i class="mdi mdi-multiplication text-danger" /></label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>

            <div class="col-md-4">
              <Field name="supp_po_date" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <Calendar id="supp_po_date" :model-value="value" showIcon dateFormat="dd-mm-yy" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
                  <label for="supp_po_date">Supp PO Date <i class="mdi mdi-multiplication text-danger" /></label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>

            <div class="col-md-4">
              <Field name="supplier_id" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <Dropdown
                    id="supplier_id"
                    :model-value="value"
                    :options="suppliers"
                    optionLabel="supplier_name"
                    optionValue="id"
                    :class="{ 'p-invalid': errorMessage }"
                    @update:model-value="handleChange"
                    @change="handleSupplierChange"
                  />
                  <label for="supplier_id">Supplier <i class="mdi mdi-multiplication text-danger" /></label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>
          </div>
          <div class="row mt-4 add__shipment">
            <div class="col-md-4">
              <Field name="invoicing_party_id" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <Dropdown
                    id="invoicing_party_id"
                    :model-value="value"
                    :options="invoiceParty"
                    optionLabel="party_name"
                    optionValue="id"
                    :class="{ 'p-invalid': errorMessage }"
                    @update:model-value="handleChange"
                  />
                  <label for="invoicing_party_id">Invoicing Party <i class="mdi mdi-multiplication text-danger" /></label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>

            <div class="col-md-4">
              <Field name="our_po_date" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <Calendar id="our_po_date" :model-value="value" showIcon dateFormat="dd-mm-yy" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
                  <label for="our_po_date">Our PO Date <i class="mdi mdi-multiplication text-danger" /></label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>

            <div class="col-md-4">
              <Field name="our_po_no" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <InputText id="our_po_no" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
                  <label for="our_po_no">Our PO No. <i class="mdi mdi-multiplication text-danger" /></label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>
          </div>
          <div class="row mt-4 add__shipment">
            <div class="col-md-4">
              <Field name="buyer_id" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <Dropdown id="buyer_id" :model-value="value" :options="buyers" optionLabel="buyer_name" optionValue="id" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
                  <label for="buyer_id">Buyer <i class="mdi mdi-multiplication text-danger" /></label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>

            <div class="col-md-4">
              <Field name="customer_id" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <Dropdown
                    id="customer_id"
                    :model-value="value"
                    :options="customers"
                    optionLabel="group_name"
                    optionValue="id"
                    :class="{ 'p-invalid': errorMessage }"
                    @update:model-value="handleChange"
                  />
                  <label for="customer_id">Customer <i class="mdi mdi-multiplication text-danger" /></label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>

            <div class="col-md-4">
              <Field name="cust_po_no" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <Chips id="cust_po_no" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
                  <label for="cust_po_no">Cust PO No. <i class="mdi mdi-multiplication text-danger" /></label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>
          </div>
          <div class="row mt-4 add__shipment">
            <div class="col-md-4">
              <Field name="payment_term_id" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <Dropdown
                    id="payment_term_id"
                    :model-value="value"
                    :options="paymentTerm"
                    optionLabel="payment_term"
                    optionValue="id"
                    :class="{ 'p-invalid': errorMessage }"
                    @update:model-value="handleChange"
                  />
                  <label for="payment_term_id">Payment Terms <i class="mdi mdi-multiplication text-danger" /></label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>

            <div class="col-md-4">
              <Field name="supp_po_value" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <InputText id="supp_po_value" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
                  <label for="supp_po_value">Supp PO Value <i class="mdi mdi-multiplication text-danger" /></label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>

            <div class="col-md-4">
              <Field name="currency" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <Dropdown id="currency" :model-value="value" :options="store.state.currency" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
                  <label for="currency">Currency <i class="mdi mdi-multiplication text-danger" /></label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>
          </div>
          <div class="row mt-4 add__shipment">
            <div class="col-md-4">
              <Field name="loading_port_id" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <Dropdown
                    id="loading_port_id"
                    :model-value="value"
                    :options="loadingPort"
                    optionLabel="port_name"
                    optionValue="id"
                    :class="{ 'p-invalid': errorMessage }"
                    @update:model-value="handleChange"
                  />
                  <label for="loading_port_id">Loading Ports <i class="mdi mdi-multiplication text-danger" /></label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>

            <div class="col-md-4">
              <Field name="destination_port_id" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <Dropdown
                    id="destination_port_id"
                    :model-value="value"
                    :options="destinationPort"
                    optionLabel="port_name"
                    optionValue="id"
                    :class="{ 'p-invalid': errorMessage }"
                    @update:model-value="handleChange"
                  />
                  <label for="destination_port_id">Destination Port <i class="mdi mdi-multiplication text-danger" /></label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>

            <div class="col-md-4">
              <Field name="final_destination_id" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <Dropdown
                    id="final_destination_id"
                    :model-value="value"
                    :options="finalDestination"
                    optionLabel="destination_name"
                    optionValue="id"
                    :class="{ 'p-invalid': errorMessage }"
                    @update:model-value="handleChange"
                  />
                  <label for="final_destination_id">Final Destination <i class="mdi mdi-multiplication text-danger" /></label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>
          </div>
          <div class="row mt-4 add__shipment">
            <div class="col-md-4">
              <Field name="number_of_container" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <InputText id="number_of_container" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
                  <label for="number_of_container">Number of containers <i class="mdi mdi-multiplication text-danger" /></label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>

            <div class="col-md-4">
              <Field name="sup_po_no" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <InputText id="sup_po_no" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
                  <label for="sup_po_no">Sup PO No. <i class="mdi mdi-multiplication text-danger" /></label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>

            <div class="col-md-4">
              <Field name="incoterm_id" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <Dropdown
                    id="incoterm_id"
                    :model-value="value"
                    :options="incoterm"
                    optionLabel="name"
                    optionValue="id"
                    filter
                    :class="{ 'p-invalid': errorMessage }"
                    @update:model-value="handleChange"
                  />
                  <label for="incoterm_id">Incoterm</label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>
          </div>
          <div class="row mt-4 add__shipment">
            <div class="col-md-4">
              <Field name="mode_of_transport_id" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <Dropdown
                    id="mode_of_transport_id"
                    :model-value="value"
                    :options="mode_of_transport"
                    optionLabel="name"
                    optionValue="id"
                    filter
                    :class="{ 'p-invalid': errorMessage }"
                    @update:model-value="handleChange"
                  />
                  <label for="mode_of_transport_id">Mode of Transport</label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>
          </div>
          <Divider />
          <Form :validation-schema="poSchema" @submit="handlePOAdd">
            <div class="row mt-5 add__shipment">
              <div class="col-md-3">
                <Field name="item_id" v-slot="{ value, errorMessage, handleChange }">
                  <span class="p-float-label">
                    <Dropdown
                      id="item_id"
                      :options="products"
                      option-label="item_name"
                      option-value="id"
                      :model-value="value"
                      :class="{ 'p-invalid': errorMessage }"
                      @update:model-value="handleChange"
                    />
                    <label for="item_id">Products</label>
                  </span>
                  <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
                </Field>
              </div>
              <div class="col-md">
                <Button label="Add" icon="pi pi-plus" type="submit" />
              </div>
            </div>
          </Form>
          <div class="mt-4">
            <DataTable v-model:editingRows="editingRows" :value="po_details" editMode="row" dataKey="id" tableClass="editable-cells-table" @row-edit-save="onRowEditSave">
              <Column field="supplier_name" header="Supplier">
                <template #body="{ data }">{{ data.supplier_name }}</template>
              </Column>
              <Column field="item_name" header="Item name">
                <template #body="{ data }">{{ data.item_name }}</template>
              </Column>
              <Column field="qty" header="Qty">
                <template #body="{ data }">{{ data.qty }}</template>
                <template #editor="{ data, field }">
                  <InputNumber v-model="data[field]" inputId="integeronly" />
                </template>
              </Column>
              <Column field="uom" header="UOM">
                <template #body="{ data }">{{ data.uom }}</template>
              </Column>
              <Column field="currency" header="Currency">
                <template #body="{ data }">{{ data.currency }}</template>
              </Column>
              <Column field="price" header="Price">
                <template #body="{ data }">{{ data.price }}</template>
                <template #editor="{ data, field }">
                  <InputNumber v-model="data[field]" inputId="minmaxfraction" :minFractionDigits="2" :maxFractionDigits="2" />
                </template>
              </Column>
              <Column field="total" header="Total">
                <template #body="{ data }">{{ data.qty * data.price }}</template>
              </Column>
              <Column :rowEditor="true" style="min-width: 8rem" bodyStyle="text-align:center" />
              <Column :exportable="false" alignFrozen="right" :frozen="true">
                <template #body="slotProps">
                  <span class="pi pi-trash" @click="handlePODetailsDelete(slotProps.index)" />
                </template>
              </Column>
            </DataTable>
          </div>
        </TabPanel>
        <TabPanel>
          <template #header>
            <span>Finance</span>
          </template>
          <div class="row mt-4 add__shipment">
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
          </div>
          <div class="row mt-4 add__shipment">
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
                <Field name="sale_invoice_val_currency" v-slot="{ value, errorMessage, handleChange }">
                  <span class="p-float-label">
                    <Dropdown
                      id="sale_invoice_val_currency"
                      :model-value="value"
                      :options="store.state.currency"
                      :class="{ 'p-invalid': errorMessage }"
                      @update:model-value="handleChange"
                      style="width: 200px"
                    />
                    <label for="sale_invoice_val_currency">Currency</label>
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
          </div>
          <div class="row mt-4 add__shipment">
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
                <Field name="s_final_inv_value_currency" v-slot="{ value, errorMessage, handleChange }">
                  <span class="p-float-label">
                    <Dropdown
                      id="s_final_inv_value_currency"
                      :model-value="value"
                      :options="store.state.currency"
                      :class="{ 'p-invalid': errorMessage }"
                      @update:model-value="handleChange"
                      style="width: 200px"
                    />
                    <label for="s_final_inv_value_currency">Currency</label>
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
          </div>
          <div class="row mt-4 add__shipment">
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
                    :options="shipping_line"
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
        </TabPanel>
        <TabPanel>
          <template #header>
            <span>Logistics</span>
            <i class="mdi mdi-multiplication ms-1 text-danger" />
          </template>
          <div class="row mt-4 add__shipment">
            <div class="col-md-4">
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
                  <Dropdown id="inspection" :options="store.state.inspection" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
                  <label for="inspection">Inspection <i class="mdi mdi-multiplication text-danger" /></label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>

            <div class="col-md-4">
              <Field name="cod_number" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <InputText id="cod_number" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
                  <label for="cod_number">COD Number</label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>
          </div>
          <div class="row mt-4 add__shipment">
            <div class="col-md-4">
              <Field name="rfi_date" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <Calendar id="rfi_date" :model-value="value" showIcon dateFormat="dd-mm-yy" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
                  <label for="rfi_date">RFI Date</label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>

            <div class="col-md-4">
              <Field name="consignee_id" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <Dropdown
                    id="consignee_id"
                    :model-value="value"
                    :options="consignee"
                    optionLabel="consignee_name"
                    optionValue="id"
                    :class="{ 'p-invalid': errorMessage }"
                    @update:model-value="handleChange"
                  />
                  <label for="consignee_id">Consignee</label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>

            <div class="col-md-4">
              <Field name="freight_booking_date" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <Calendar id="freight_booking_date" :model-value="value" showIcon dateFormat="dd-mm-yy" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
                  <label for="freight_booking_date">Freight Booking Date</label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>
          </div>
          <div class="row mt-4 add__shipment">
            <div class="col-md-4">
              <Field name="estimated_dob" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <Calendar id="estimated_dob" :model-value="value" showIcon dateFormat="dd-mm-yy" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
                  <label for="estimated_dob">Estimated DOB</label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>

            <div class="col-md-4">
              <Field name="freight_booking_no" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <InputText id="freight_booking_no" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
                  <label for="freight_booking_no">Freight Booking No.</label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>

            <div class="col-md-4">
              <Field name="bl_no" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <InputText id="bl_no" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
                  <label for="bl_no">BL No.</label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>
          </div>
          <div class="row mt-4 add__shipment">
            <div class="col-md-4">
              <Field name="revised_dob" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <Calendar id="revised_dob" :model-value="value" showIcon dateFormat="dd-mm-yy" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
                  <label for="revised_dob">Revised DOB</label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>

            <div class="col-md-4">
              <Field name="actual_dob" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <Calendar id="actual_dob" :model-value="value" showIcon dateFormat="dd-mm-yy" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
                  <label for="actual_dob">Actual DOB</label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>

            <div class="col-md-4">
              <Field name="scan_bl_date" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <Calendar id="scan_bl_date" :model-value="value" showIcon dateFormat="dd-mm-yy" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
                  <label for="scan_bl_date">Scan BL Date</label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>
          </div>
          <div class="row mt-4 add__shipment">
            <div class="col-md-4">
              <Field name="stuf_photo" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <Calendar id="stuf_photo" :model-value="value" showIcon dateFormat="dd-mm-yy" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
                  <label for="stuf_photo">Stuf Photos</label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>

            <div class="col-md-4">
              <Field name="est_arriv_date" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <Calendar id="est_arriv_date" :model-value="value" showIcon dateFormat="dd-mm-yy" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
                  <label for="est_arriv_date">Est Arriv Date</label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>
          </div>
          <div class="row mt-4 add__shipment">
            <div class="col-md-12">
              <Field name="remarks" v-slot="{ value, errorMessage, handleChange }">
                <span class="p-float-label">
                  <Textarea id="remarks" :model-value="value" autoResize rows="3" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
                  <label for="remarks">Remarks</label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
              </Field>
            </div>
          </div>
          <Divider />
          <Form :validation-schema="containerSchema" @submit="handleContainerAdd">
            <div class="row mt-5 add__shipment">
              <div class="col-md-3">
                <Field name="container_no" v-slot="{ value, errorMessage, handleChange }">
                  <span class="p-float-label">
                    <InputText id="container_no" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
                    <label for="container_no">Container No.</label>
                  </span>
                  <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
                </Field>
              </div>
              <div class="col-md-3">
                <Field name="container_type_id" v-slot="{ value, errorMessage, handleChange }">
                  <span class="p-float-label">
                    <Dropdown
                      id="container_type_id"
                      :options="containerTypes"
                      option-label="type_name"
                      option-value="id"
                      :model-value="value"
                      :class="{ 'p-invalid': errorMessage }"
                      @update:model-value="handleChange"
                    />
                    <label for="container_type_id">Container Type</label>
                  </span>
                  <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
                </Field>
              </div>
              <div class="col-md-3">
                <Field name="item_id" v-slot="{ value, errorMessage, handleChange }">
                  <span class="p-float-label">
                    <Dropdown
                      id="item_id"
                      :options="products"
                      option-label="item_name"
                      option-value="id"
                      :model-value="value"
                      :class="{ 'p-invalid': errorMessage }"
                      @update:model-value="handleChange"
                    />
                    <label for="item_id">Products</label>
                  </span>
                  <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
                </Field>
              </div>
              <div class="col-md-2">
                <Field name="qty" v-slot="{ value, errorMessage, handleChange }">
                  <span class="p-float-label">
                    <InputNumber id="qty" input-id="integeronly" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
                    <label for="qty">Qty</label>
                  </span>
                  <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
                </Field>
              </div>
              <div class="col-md">
                <Button label="Add" icon="pi pi-plus" type="submit" />
              </div>
            </div>
          </Form>
          <div class="mt-4">
            <DataTable :value="container_details" dataKey="id">
              <Column field="container_no" header="Container No.">
                <template #body="{ data }">{{ data.container_no }}</template>
              </Column>
              <Column field="type_name" header="Container type">
                <template #body="{ data }">{{ data.type_name }}</template>
              </Column>
              <Column field="item_name" header="Item name">
                <template #body="{ data }">{{ data.item_name }}</template>
              </Column>
              <Column field="qty" header="Qty">
                <template #body="{ data }">{{ data.qty }}</template>
              </Column>
              <Column field="uom" header="UOM">
                <template #body="{ data }">{{ data.uom }}</template>
              </Column>
              <Column :exportable="false" alignFrozen="right" :frozen="true">
                <template #body="slotProps">
                  <span class="pi pi-trash" @click="handleContainerDelete(slotProps.index)" />
                </template>
              </Column>
            </DataTable>
          </div>
        </TabPanel>
      </TabView>
      <div class="row mt-4 add__shipment">
        <div class="col-md text-center">
          <Button label="Save" icon="pi pi-save" class="mx-4" type="submit" />
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
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';
import Calendar from 'primevue/calendar';
import InputNumber from 'primevue/inputnumber';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { ref, onMounted } from 'vue';
import { Field, Form } from 'vee-validate';
import * as yup from 'yup';
import store from '../../../stores/index';
import Panel from 'primevue/panel';
import router from '../../../router/index';
import { useToast } from 'primevue/usetoast';
import { useRoute } from 'vue-router';
import Toast from 'primevue/toast';
import dayjs from 'dayjs';
import Divider from 'primevue/divider';
import Chips from 'primevue/chips';

const route = useRoute();
const toast = useToast();
const form = ref();
const suppliers = ref([]);
const buyers = ref([]);
const customers = ref([]);
const paymentTerm = ref([]);
const invoiceParty = ref([]);
const loadingPort = ref([]);
const destinationPort = ref([]);
const finalDestination = ref([]);
const consignee = ref([]);
const active = ref(0);
const editingRows = ref([]);
const po_details = ref([]) as any;
const container_details = ref([]) as any;
const containerTypes = ref([]);
const products = ref([]);
const shipping_line = ref([]);
const incoterm = ref([]);
const mode_of_transport = ref([]);
const schema = yup.object({
  po_no: yup.string().required('Please enter po no.'),
  supp_po_date: yup.date().required('Please select a supplier po date'),
  supplier_id: yup.number().required('Please select a supplier'),
  invoicing_party_id: yup.number().required('Please select a invoicing party'),
  our_po_date: yup.date().required('Please select a our po date'),
  our_po_no: yup.string().required('Please select a our po number'),
  buyer_id: yup.number().required('Please select a buyer'),
  customer_id: yup.number().required('Please select a customer'),
  cust_po_no: yup.array(),
  payment_term_id: yup.number().required('Please select a payment terms'),
  supp_po_value: yup.number().required('Please select a supp po value'),
  sup_po_no: yup.string().required('Please enter supplier po number'),
  currency: yup.string().required('Please Enter currency'),
  loading_port_id: yup.number().required('Please select a loading port'),
  destination_port_id: yup.number().required('Please select a destination port'),
  final_destination_id: yup.number().required('Please select a final destination'),
  number_of_container: yup.string().required('Please enter container'),
  incoterm_id: yup.number(),
  mode_of_transport_id: yup.number(),

  adv_rec_date: yup.date(),
  adv_pay_date: yup.date(),
  purchase_invoice: yup.string(),
  sale_invoice_val: yup.number(),
  sale_invoice_val_currency: yup.string(),
  sale_inv_no: yup.string(),
  s_f_inv_no: yup.string(),
  s_final_inv_value: yup.number(),
  s_final_inv_value_currency: yup.string(),
  final_rec_date: yup.date(),
  final_pay_date: yup.date(),
  percentage: yup.number(),
  commission: yup.number(),
  share: yup.number(),
  payment_request_lot: yup.string(),
  shipping_line_id: yup.number(),

  dhl_no: yup.string(),
  inspection: yup.string().required('Please select a inspection'),
  cod_number: yup.string(),
  rfi_date: yup.date(),
  consignee_id: yup.number(),
  freight_booking_date: yup.date(),
  freight_booking_no: yup.string(),
  estimated_dob: yup.date(),
  revised_dob: yup.date(),
  actual_dob: yup.date(),
  scan_bl_date: yup.date(),
  stuf_photo: yup.date(),
  est_arriv_date: yup.date(),
  bl_no: yup.string(),
  remarks: yup.string()
});
const containerSchema = yup.object({
  container_no: yup.string().required('Please enter container'),
  container_type_id: yup.number().required('Please select container type'),
  item_id: yup.number().required('Please select product'),
  qty: yup.number().required('Please enter qty')
});
const poSchema = yup.object({
  item_id: yup.number().required('Please select product')
});

onMounted(async () => {
  await refreshMasters();
  form.value.resetForm();
  if (route.params.id) await getShipmentForEdit();
});

const refreshMasters = async () => {
  store.state.spinner = true;
  await getSuppliers();
  await getBuyers();
  await getCustomers();
  await getInvoicingParty();
  await getPaymentTerm();
  await getLoadingPort();
  await getDestinationPort();
  await getFinalDestination();
  await getConsignee();
  await getContainerType();
  await getShippingLine();
  await getIncoterm();
  await getModeOfTransport();
  store.state.spinner = false;
};

const getSuppliers = async () => {
  const res = await store.dispatch('getSuppliers');
  if (res.status == 'success') {
    suppliers.value = res.data;
  }
};

const getBuyers = async () => {
  const res = await store.dispatch('getBuyers');
  if (res.status == 'success') {
    buyers.value = res.data;
  }
};

const getCustomers = async () => {
  const res = await store.dispatch('getCustomers');
  if (res.status == 'success') {
    customers.value = res.data;
  }
};

const getInvoicingParty = async () => {
  const res = await store.dispatch('getInvoicingParty');
  if (res.status == 'success') {
    invoiceParty.value = res.data;
  }
};

const getPaymentTerm = async () => {
  const res = await store.dispatch('getPaymentTerm');
  if (res.status == 'success' && res.data.length > 0) {
    for (const object of res.data) {
      object.payment_term = `${object.advance_percentage}% ${object.advance_text} - ${object.pending_percentage}% ${object.pending_text}`;
    }
    paymentTerm.value = res.data;
  }
};

const getLoadingPort = async () => {
  const res = await store.dispatch('getLoadingPort');
  if (res.status == 'success') {
    loadingPort.value = res.data;
  }
};

const getDestinationPort = async () => {
  const res = await store.dispatch('getDestinationPort');
  if (res.status == 'success') {
    destinationPort.value = res.data;
  }
};

const getFinalDestination = async () => {
  const res = await store.dispatch('getFinalDestination');
  if (res.status == 'success') {
    finalDestination.value = res.data;
  }
};

const getConsignee = async () => {
  const res = await store.dispatch('getConsignee');
  if (res.status == 'success') {
    consignee.value = res.data;
  }
};

const getContainerType = async () => {
  const res = await store.dispatch('getContainerType');
  if (res.status == 'success') {
    containerTypes.value = res.data;
  }
};

const getShippingLine = async () => {
  const res = await store.dispatch('getShippingLine');
  if (res.status == 'success') {
    shipping_line.value = res.data;
  }
};

const getIncoterm = async () => {
  const res = await store.dispatch('getIncoterm');
  if (res.status == 'success') {
    incoterm.value = res.data;
  }
};

const getModeOfTransport = async () => {
  const res = await store.dispatch('getModeOfTransport');
  if (res.status == 'success') {
    mode_of_transport.value = res.data;
  }
};

const getShipmentForEdit = async () => {
  store.state.spinner = true;
  const res = await store.dispatch('getShipmentForEdit', { id: route.params.id });
  store.state.spinner = false;
  if (res.status == 'success') {
    if (res.data.supp_po_date) res.data.supp_po_date = dayjs(res.data.supp_po_date).format('MM/DD/YYYY');
    else delete res.data.supp_po_date;
    if (res.data.our_po_date) res.data.our_po_date = dayjs(res.data.our_po_date).format('MM/DD/YYYY');
    else delete res.data.our_po_date;
    if (res.data.adv_rec_date) res.data.adv_rec_date = dayjs(res.data.adv_rec_date).format('MM/DD/YYYY');
    else delete res.data.adv_rec_date;
    if (res.data.adv_pay_date) res.data.adv_pay_date = dayjs(res.data.adv_pay_date).format('MM/DD/YYYY');
    else delete res.data.adv_pay_date;
    if (res.data.final_rec_date) res.data.final_rec_date = dayjs(res.data.final_rec_date).format('MM/DD/YYYY');
    else delete res.data.final_rec_date;
    if (res.data.final_pay_date) res.data.final_pay_date = dayjs(res.data.final_pay_date).format('MM/DD/YYYY');
    else delete res.data.final_pay_date;
    if (res.data.rfi_date) res.data.rfi_date = dayjs(res.data.rfi_date).format('MM/DD/YYYY');
    else delete res.data.rfi_date;
    if (res.data.freight_booking_date) res.data.freight_booking_date = dayjs(res.data.freight_booking_date).format('MM/DD/YYYY');
    else delete res.data.freight_booking_date;
    if (res.data.estimated_dob) res.data.estimated_dob = dayjs(res.data.estimated_dob).format('MM/DD/YYYY');
    else delete res.data.estimated_dob;
    if (res.data.revised_dob) res.data.revised_dob = dayjs(res.data.revised_dob).format('MM/DD/YYYY');
    else delete res.data.revised_dob;
    if (res.data.actual_dob) res.data.actual_dob = dayjs(res.data.actual_dob).format('MM/DD/YYYY');
    else delete res.data.actual_dob;
    if (res.data.scan_bl_date) res.data.scan_bl_date = dayjs(res.data.scan_bl_date).format('MM/DD/YYYY');
    else delete res.data.scan_bl_date;
    if (res.data.stuf_photo) res.data.stuf_photo = dayjs(res.data.stuf_photo).format('MM/DD/YYYY');
    else delete res.data.stuf_photo;
    if (res.data.est_arriv_date) res.data.est_arriv_date = dayjs(res.data.est_arriv_date).format('MM/DD/YYYY');
    else delete res.data.est_arriv_date;
    if (res.data.cust_po_no) res.data.cust_po_no = JSON.parse(res.data.cust_po_no);
    if (!res.data.sale_invoice_val) delete res.data.sale_invoice_val;
    if (!res.data.sale_invoice_val_currency) delete res.data.sale_invoice_val_currency;
    if (!res.data.sale_inv_no) delete res.data.sale_inv_no;
    if (!res.data.s_f_inv_no) delete res.data.s_f_inv_no;
    if (!res.data.s_final_inv_value) delete res.data.s_final_inv_value;
    if (!res.data.s_final_inv_value_currency) delete res.data.s_final_inv_value_currency;
    if (!res.data.purchase_invoice) delete res.data.purchase_invoice;
    if (!res.data.percentage) delete res.data.percentage;
    if (!res.data.commission) delete res.data.commission;
    if (!res.data.share) delete res.data.share;
    if (!res.data.payment_request_lot) delete res.data.payment_request_lot;
    if (!res.data.dhl_no) delete res.data.dhl_no;
    if (!res.data.cod_number) delete res.data.cod_number;
    if (!res.data.consignee_id) delete res.data.consignee_id;
    if (!res.data.freight_booking_no) delete res.data.freight_booking_no;
    if (!res.data.shipping_line_id) delete res.data.shipping_line_id;
    if (!res.data.bl_no) delete res.data.bl_no;
    if (!res.data.remarks) delete res.data.remarks;

    form.value.setValues(res.data);
    products.value = suppliers.value.filter((item) => item.id == res.data.supplier_id)[0].items;
    for (const object of res.po_details) {
      object.items = suppliers.value.filter((item) => item.id == object.supplier_id)[0].items;
      object.supplier_name = suppliers.value.filter((item) => item.id == object.supplier_id)[0].supplier_name;
      object.item_name = object.items.filter((item: any) => item.id == object.item_id)[0].item_name;
      object.uom = object.items.filter((item: any) => item.id == object.item_id)[0].uom;
      object.currency = res.data.currency;
    }
    po_details.value = res.po_details;

    if (res.container_details.length > 0) {
      for (const object of res.container_details) {
        object.type_name = containerTypes.value.filter((item) => item.id == object.container_type_id)[0].type_name;
        object.item_name = products.value.filter((item: any) => item.id == object.item_id)[0].item_name;
        object.uom = res.po_details.filter((item: any) => item.item_id == object.item_id)[0].uom;
      }
      container_details.value = res.container_details;
    }
  }
};

const handleSupplierChange = (e: any) => {
  products.value = suppliers.value.filter((item) => item.id == e.value)[0].items;
};

const handlePOAdd = (data: any, { resetForm }: any) => {
  const formData = form.value.getValues();
  if (!formData.supplier_id) {
    toast.add({ severity: 'error', summary: 'Error Message', detail: 'Please select supplier', life: 2500 });
  } else if (!formData.currency) {
    toast.add({ severity: 'error', summary: 'Error Message', detail: 'Please select currency', life: 2500 });
  } else if (po_details.value.filter((item: any) => item.item_id == data.item_id).length > 0) {
    toast.add({ severity: 'error', summary: 'Error Message', detail: 'item already present in list', life: 2500 });
  } else {
    const supplier: any = suppliers.value.filter((item) => item.id == formData.supplier_id)[0];
    po_details.value.push({
      id: `${Math.floor(1000 + Math.random() * 9000)}`,
      supplier_id: formData.supplier_id,
      supplier_name: supplier.supplier_name,
      item_name: products.value.filter((item) => item.id == data.item_id)[0].item_name,
      item_id: data.item_id,
      currency: formData.currency,
      uom: products.value.filter((item) => item.id == data.item_id)[0].uom,
      qty: 0,
      price: 0
    });
    resetForm();
  }
};

const handleContainerAdd = (data: any, { resetForm }: any) => {
  if (po_details.value.filter((item: any) => item.item_id == data.item_id).length == 0) {
    toast.add({ severity: 'error', summary: 'Error Message', detail: 'item not present in container wise list', life: 2500 });
    return;
  }
  const total_qty = po_details.value.filter((item: any) => item.item_id == data.item_id)[0],
    qty = container_details.value.filter((item: any) => item.item_id == data.item_id).reduce((a: any, b: any) => a + b.qty, 0);
  if (total_qty.qty >= qty + data.qty) {
    container_details.value.push({
      id: `${Math.floor(1000 + Math.random() * 9000)}`,
      type_name: containerTypes.value.filter((item) => item.id == data.container_type_id)[0].type_name,
      container_type_id: data.container_type_id,
      item_name: total_qty.item_name,
      item_id: data.item_id,
      container_no: data.container_no,
      qty: data.qty,
      uom: total_qty.uom
    });
    resetForm();
    return;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: `Max available qty is ${total_qty.qty - qty}`, life: 2500 });
};

const handleContainerDelete = (index: number) => {
  container_details.value.splice(index, 1);
};

const onRowEditSave = ({ newData, index }: any) => {
  po_details.value[index] = newData;
};

const handlePODetailsDelete = (index: number) => {
  po_details.value.splice(index, 1);
};

const onSubmit = async (data: any, { resetForm }: any) => {
  let error = false;
  if (po_details.value.length == 0) {
    toast.add({ severity: 'error', summary: 'Error Message', detail: 'Please add items in po details', life: 2500 });
    active.value = 0;
    error = true;
    return;
  }
  let total = 0;
  for (const object of po_details.value) {
    if (object.qty == 0) {
      toast.add({ severity: 'error', summary: 'Error Message', detail: 'Please enter quantity in container wise', life: 2500 });
      error = true;
      return;
    }
    if (object.price == 0) {
      toast.add({ severity: 'error', summary: 'Error Message', detail: 'Please enter price in container wise', life: 2500 });
      error = true;
      return;
    }
    total += object.qty * object.price;
  }
  if (data.percentage) {
    data.commission = (total * (data.percentage / 100)).toFixed(2);
    data.share = (data.commission / 2).toFixed(2);
  }

  if (!error) {
    const res = await store.dispatch('saveShipment', {
      id: route.params.id ? Number(route.params.id) : '0',
      data: data,
      po_details: po_details.value,
      container_details: container_details.value
    });
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
  router.replace({ name: 'ShipmentList' });
};
</script>
<style lang="scss">
.add__shipment {
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
}
</style>
