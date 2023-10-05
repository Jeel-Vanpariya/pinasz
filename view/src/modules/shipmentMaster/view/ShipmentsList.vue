<template>
  <Panel header="Shipments" class="p-4">
    <template #icons>
      <RouterLink :to="{ name: 'AddShipment' }">
        <Button label="Add Shipment" icon="pi pi-plus" />
      </RouterLink>
    </template>
    <DataTable :value="shipments" v-model:filters="filters" :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" scrollable filterDisplay="row" dataKey="id" ref="dt" removableSort paginator>
      <template #header>
        <div class="d-flex justify-content-end">
          <Button class="mx-3" icon="pi pi-external-link" label="Export" severity="secondary" @click="exportCSV" />
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
          </span>
        </div>
      </template>
      <Column field="po_no" header="PO No" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.po_no }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="supp_po_date" header="Supp PO Date" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.supp_po_date ? dayjs(data.supp_po_date).format('DD-MM-YYYY') : '' }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="supplier" header="Supplier" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.supplier }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="invoicing_party" header="Invoicing Party" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.invoicing_party }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="our_po_date" header="Our PO Date" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.our_po_date ? dayjs(data.our_po_date).format('DD-MM-YYYY') : '' }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="our_po_no" header="Our PO No" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.our_po_no }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="buyer" header="Buyer" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.buyer }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="customer" header="Customer" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.customer }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="cust_po_no" header="Cust PO No" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.cust_po_no }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="payment_terms" header="Payment Terms" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ `${data.advance_percentage}% advanced - ${data.pending_percentage}% pending` }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="supp_po_value" header="Supp PO Value" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.supp_po_value }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="sup_po_no" header="Supp PO No" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.sup_po_no }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="currency" header="Currency" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.currency }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="loading_port" header="Loading Port" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.loading_port }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="destination_port" header="Destination Port" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.destination_port }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="final_destination" header="Final Destination" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.final_destination }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="number_of_container" header="Number of Container" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.number_of_container }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="incoterm" header="Incoterm" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.incoterm }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="mode_of_transport" header="Mode of Transport" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.mode_of_transport }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="adv_rec_date" header="Adv Rec Date" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.adv_rec_date ? dayjs(data.adv_rec_date).format('DD-MM-YYYY') : '' }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="adv_pay_date" header="Adv Pay Date" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.adv_pay_date ? dayjs(data.adv_pay_date).format('DD-MM-YYYY') : '' }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="purchase_invoice" header="Purchase Invoice" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.purchase_invoice }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="sale_invoice_val" header="Sale Invoice Val" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.sale_invoice_val }} {{ data.sale_invoice_val_currency }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="sale_inv_no" header="Sale Inv No" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.sale_inv_no }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="s_f_inv_no" header="Supplier Final Invoice number" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.s_f_inv_no }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="s_final_inv_value" header="Supplier final invoice value" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.s_final_inv_value }} {{ data.s_final_inv_value_currency }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="final_rec_date" header="Final Rec Date" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.final_rec_date ? dayjs(data.final_rec_date).format('DD-MM-YYYY') : '' }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="final_pay_date" header="Final Pay Date" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.final_pay_date ? dayjs(data.final_pay_date).format('DD-MM-YYYY') : '' }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="percentage" header="Percentage" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.percentage }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="commission" header="Commission" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.commission }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="share" header="Share" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.share }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="payment_request_lot" header="Payment Request Lot" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.payment_request_lot }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="dhl_no" header="DHL No" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.dhl_no }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="inspection" header="Inspection" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.inspection }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="cod_number" header="COD Number" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.cod_number }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="rfi_date" header="RFI Date" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.rfi_date ? dayjs(data.rfi_date).format('DD-MM-YYYY') : '' }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="consignee" header="Consignee" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.consignee }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="freight_booking_date" header="Freight Booking Date" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.freight_booking_date ? dayjs(data.freight_booking_date).format('DD-MM-YYYY') : '' }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="freight_booking_no" header="Freight Booking No" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.freight_booking_no }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="shipping_line" header="Shipping Line" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.shipping_line }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="delay_in_loading" header="Delay in Loading" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.delay_in_loading }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="estimated_dob" header="Estimated DOB" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.estimated_dob ? dayjs(data.estimated_dob).format('DD-MM-YYYY') : '' }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="revised_dob" header="Revised DOB" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.revised_dob ? dayjs(data.revised_dob).format('DD-MM-YYYY') : '' }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="actual_dob" header="Actual DOB" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.actual_dob ? dayjs(data.actual_dob).format('DD-MM-YYYY') : '' }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="scan_bl_date" header="Scan BL Date" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.scan_bl_date ? dayjs(data.scan_bl_date).format('DD-MM-YYYY') : '' }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="stuf_photo" header="Stuf Photo" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.stuf_photo ? dayjs(data.stuf_photo).format('DD-MM-YYYY') : '' }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="est_arriv_date" header="Est Arriv Date" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.est_arriv_date ? dayjs(data.est_arriv_date).format('DD-MM-YYYY') : '' }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="bl_no" header="BL No" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.bl_no }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="draft_cnca" header="Draft CNCA" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.draft_cnca ? dayjs(data.draft_cnca).format('DD-MM-YYYY') : '' }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="original_cnca" header="Original CNCA" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.original_cnca ? dayjs(data.original_cnca).format('DD-MM-YYYY') : '' }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="cnca_agent" header="CNCA Agent" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.cnca_agent }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="dup" header="DUP" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.dup ? dayjs(data.dup).format('DD-MM-YYYY') : '' }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="remarks" header="Remarks" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.remarks }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column :exportable="false" alignFrozen="right" :frozen="true">
        <template #body="slotProps">
          <div class="d-flex">
            <Button icon="pi pi-eye" outlined rounded severity="success" @click="getShipmentDetails(slotProps.data.id, slotProps.data.po_no)" />
            <RouterLink :to="{ name: 'EditShipment', params: { id: slotProps.data.id } }">
              <Button icon="pi pi-pencil" outlined rounded class="mx-3" />
            </RouterLink>
            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteShipment(slotProps.data.id)" />
          </div>
        </template>
      </Column>
    </DataTable>
  </Panel>
  <ConfirmDialog />
  <Teleport to="body">
    <Dialog v-model:visible="visible" modal :header="header" :style="{ width: '95vw' }">
      <DataTable :value="po_details" v-model:filters="poFilters" :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" scrollable filterDisplay="row" dataKey="id" removableSort paginator>
        <Column field="supplier_name" header="Supplier Name" sortable style="min-width: 20rem">
          <template #body="{ data }">{{ data.supplier_name }}</template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
          </template>
        </Column>
        <Column field="item_name" header="Item Name" sortable style="min-width: 20rem">
          <template #body="{ data }">{{ data.item_name }}</template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
          </template>
        </Column>
        <Column field="qty" header="Qty" sortable style="min-width: 20rem">
          <template #body="{ data }">{{ data.qty }}</template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
          </template>
        </Column>
        <Column field="uom" header="UOM" sortable style="min-width: 20rem">
          <template #body="{ data }">{{ data.uom }}</template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
          </template>
        </Column>
        <Column field="price" header="Price" sortable style="min-width: 20rem">
          <template #body="{ data }">{{ data.price }}</template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
          </template>
        </Column>
        <Column header="Total" sortable style="min-width: 10rem">
          <template #body="{ data }">{{ data.price * data.qty }}</template>
        </Column>
      </DataTable>
      <DataTable :value="container_details" v-model:filters="containerFilters" :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" scrollable filterDisplay="row" dataKey="id" removableSort paginator>
        <Column field="container_no" header="Container No" sortable style="min-width: 20rem">
          <template #body="{ data }">{{ data.container_no }}</template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
          </template>
        </Column>
        <Column field="type_name" header="Container Type" sortable style="min-width: 20rem">
          <template #body="{ data }">{{ data.type_name }}</template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
          </template>
        </Column>
        <Column field="item_name" header="Item Name" sortable style="min-width: 20rem">
          <template #body="{ data }">{{ data.item_name }}</template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
          </template>
        </Column>
        <Column field="qty" header="Qty" sortable style="min-width: 20rem">
          <template #body="{ data }">{{ data.qty }}</template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
          </template>
        </Column>
      </DataTable>
    </Dialog>
  </Teleport>
</template>
<script lang="ts" setup>
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Panel from 'primevue/panel';
import { FilterMatchMode } from 'primevue/api';
import InputText from 'primevue/inputtext';
import { ref, onMounted } from 'vue';
import { useConfirm } from 'primevue/useconfirm';
import ConfirmDialog from 'primevue/confirmdialog';
import store from '../../../stores/index';
import dayjs from 'dayjs';
import Dialog from 'primevue/dialog';

const confirm = useConfirm();
const dt = ref();
const shipments = ref([]);
const visible = ref(false);
const header = ref('');
const po_details = ref([]);
const container_details = ref([]);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  po_no: { value: null, matchMode: FilterMatchMode.CONTAINS },
  supp_po_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
  supplier: { value: null, matchMode: FilterMatchMode.CONTAINS },
  invoicing_party: { value: null, matchMode: FilterMatchMode.CONTAINS },
  our_po_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
  our_po_no: { value: null, matchMode: FilterMatchMode.CONTAINS },
  buyer: { value: null, matchMode: FilterMatchMode.CONTAINS },
  customer: { value: null, matchMode: FilterMatchMode.CONTAINS },
  cust_po_no: { value: null, matchMode: FilterMatchMode.CONTAINS },
  payment_terms: { value: null, matchMode: FilterMatchMode.CONTAINS },
  supp_po_value: { value: null, matchMode: FilterMatchMode.CONTAINS },
  sup_po_no: { value: null, matchMode: FilterMatchMode.CONTAINS },
  currency: { value: null, matchMode: FilterMatchMode.CONTAINS },
  loading_port: { value: null, matchMode: FilterMatchMode.CONTAINS },
  destination_port: { value: null, matchMode: FilterMatchMode.CONTAINS },
  final_destination: { value: null, matchMode: FilterMatchMode.CONTAINS },
  number_of_container: { value: null, matchMode: FilterMatchMode.CONTAINS },
  incoterm: { value: null, matchMode: FilterMatchMode.CONTAINS },
  mode_of_transport: { value: null, matchMode: FilterMatchMode.CONTAINS },
  adv_rec_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
  adv_pay_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
  purchase_invoice: { value: null, matchMode: FilterMatchMode.CONTAINS },
  sale_invoice_val: { value: null, matchMode: FilterMatchMode.CONTAINS },
  sale_inv_no: { value: null, matchMode: FilterMatchMode.CONTAINS },
  s_f_inv_no: { value: null, matchMode: FilterMatchMode.CONTAINS },
  s_final_inv_value: { value: null, matchMode: FilterMatchMode.CONTAINS },
  final_rec_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
  final_pay_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
  percentage: { value: null, matchMode: FilterMatchMode.CONTAINS },
  commission: { value: null, matchMode: FilterMatchMode.CONTAINS },
  share: { value: null, matchMode: FilterMatchMode.CONTAINS },
  payment_request_lot: { value: null, matchMode: FilterMatchMode.CONTAINS },
  dhl_no: { value: null, matchMode: FilterMatchMode.CONTAINS },
  inspection: { value: null, matchMode: FilterMatchMode.CONTAINS },
  cod_number: { value: null, matchMode: FilterMatchMode.CONTAINS },
  rfi_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
  consignee: { value: null, matchMode: FilterMatchMode.CONTAINS },
  freight_booking_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
  freight_booking_no: { value: null, matchMode: FilterMatchMode.CONTAINS },
  shipping_line: { value: null, matchMode: FilterMatchMode.CONTAINS },
  delay_in_loading: { value: null, matchMode: FilterMatchMode.CONTAINS },
  estimated_dob: { value: null, matchMode: FilterMatchMode.CONTAINS },
  revised_dob: { value: null, matchMode: FilterMatchMode.CONTAINS },
  actual_dob: { value: null, matchMode: FilterMatchMode.CONTAINS },
  scan_bl_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
  stuf_photo: { value: null, matchMode: FilterMatchMode.CONTAINS },
  est_arriv_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
  bl_no: { value: null, matchMode: FilterMatchMode.CONTAINS },
  draft_cnca: { value: null, matchMode: FilterMatchMode.CONTAINS },
  original_cnca: { value: null, matchMode: FilterMatchMode.CONTAINS },
  cnca_agent: { value: null, matchMode: FilterMatchMode.CONTAINS },
  dup: { value: null, matchMode: FilterMatchMode.CONTAINS },
  remarks: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const poFilters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  supplier_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  item_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  qty: { value: null, matchMode: FilterMatchMode.CONTAINS },
  uom: { value: null, matchMode: FilterMatchMode.CONTAINS },
  price: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const containerFilters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  item_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  qty: { value: null, matchMode: FilterMatchMode.CONTAINS },
  type_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  container_no: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

onMounted(async () => {
  await getShipments();
});

const getShipments = async () => {
  store.state.spinner = true;
  const res = await store.dispatch('getShipments');
  store.state.spinner = false;
  if (res.status == 'success') {
    shipments.value = res.data;
  }
};

const getShipmentDetails = async (id: number, po_no: string) => {
  store.state.spinner = true;
  const res = await store.dispatch('getShipmentDetails', { id: id });
  store.state.spinner = false;
  if (res.status == 'success') {
    header.value = po_no;
    po_details.value = res.data.po_details;
    container_details.value = res.data.container_details;
    visible.value = true;
  }
};

const confirmDeleteShipment = (id: number) => {
  confirm.require({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      store.state.spinner = true;
      const res = await store.dispatch('deleteShipment', { id: id });
      store.state.spinner = false;
      if (res.status == 'success') {
        await getShipments();
      }
    }
  });
};

const exportCSV = () => {
    dt.value.exportCSV();
};
</script>
