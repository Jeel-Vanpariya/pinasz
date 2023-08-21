<template>
  <Panel header="Products" class="p-4">
    <template #icons>
      <div class="d-flex">
        <download-csv :data="[sample_json]" name="sample.csv">
          <Button label="Sample CSV" icon="pi pi-cloud-download" severity="help" />
        </download-csv>
        <FileUpload class="mx-4" mode="basic" name="demo[]" accept="text/csv" :auto="true" customUpload @uploader="onUpload" chooseLabel="Import CSV" />
        <RouterLink :to="{ name: 'AddProduct' }">
          <Button label="Add Product" icon="pi pi-plus" />
        </RouterLink>
      </div>
    </template>
    <div class="mb-3">
      <InlineMessage severity="warn">Note : If related masters details were not found then those product won't be added from CSV.</InlineMessage>
    </div>
    <DataTable :value="products" v-model:filters="filters" :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" scrollable filterDisplay="row" dataKey="id" removableSort paginator>
      <template #header>
        <div class="d-flex flex-wrap align-items-center justify-content-end gap-2">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters['global'].value" placeholder="Search..." />
          </span>
        </div>
      </template>
      <Column field="item_no" header="Item no" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.item_no }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="category" header="Category Name" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.category }}</template>
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
      <Column field="long_name" header="Long Name" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ `${data.brand} ${data.item_name} ${data.pack}x${data.pack_size} ${data.umo}` }}</template>
      </Column>
      <Column field="brand" header="Brand" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.brand }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="additions_details" header="Additions Details" sortable style="min-width: 25rem">
        <template #body="{ data }">{{ data.additions_details }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="container_type" header="Container Type" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.container_type }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="pack" header="Pack" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.pack }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="pack_size" header="Packsize" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.pack_size }}</template>
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
      <Column field="cbm" header="CBM" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.cbm }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="loading_per_container" header="Loading per container" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.loading_per_container }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="origin" header="Origin" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.origin }}</template>
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
      <Column field="last_fob" header="Last FOB" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.last_fob }}</template>
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
      <Column field="date" header="Date" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ dayjs(data.date).format('DD-MM-YYYY') }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="supplier" header="Supplier" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data.supplier.join(',') }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column :exportable="false" alignFrozen="right" :frozen="true">
        <template #body="slotProps">
          <div class="d-flex">
            <RouterLink :to="{ name: 'EditProduct', params: { id: slotProps.data.id } }">
              <Button icon="pi pi-pencil" outlined rounded class="mx-3" />
            </RouterLink>
            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data.id)" />
          </div>
        </template>
      </Column>
    </DataTable>
  </Panel>
  <Toast />
  <ConfirmDialog />
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
import FileUpload from 'primevue/fileupload';
import { useToast } from 'primevue/usetoast';
import Papa from 'papaparse';
import moment from 'moment';
import Toast from 'primevue/toast';
import InlineMessage from 'primevue/inlinemessage';

const confirm = useConfirm();
const toast = useToast();
const products = ref([]);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  item_no: { value: null, matchMode: FilterMatchMode.CONTAINS },
  category: { value: null, matchMode: FilterMatchMode.CONTAINS },
  item_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  additions_details: { value: null, matchMode: FilterMatchMode.CONTAINS },
  brand: { value: null, matchMode: FilterMatchMode.CONTAINS },
  description: { value: null, matchMode: FilterMatchMode.CONTAINS },
  container_type: { value: null, matchMode: FilterMatchMode.CONTAINS },
  pack: { value: null, matchMode: FilterMatchMode.CONTAINS },
  pack_size: { value: null, matchMode: FilterMatchMode.CONTAINS },
  uom: { value: null, matchMode: FilterMatchMode.CONTAINS },
  cbm: { value: null, matchMode: FilterMatchMode.CONTAINS },
  loading_per_container: { value: null, matchMode: FilterMatchMode.CONTAINS },
  origin: { value: null, matchMode: FilterMatchMode.CONTAINS },
  loading_port: { value: null, matchMode: FilterMatchMode.CONTAINS },
  last_fob: { value: null, matchMode: FilterMatchMode.CONTAINS },
  currency: { value: null, matchMode: FilterMatchMode.CONTAINS },
  date: { value: null, matchMode: FilterMatchMode.CONTAINS },
  supplier: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const sample_json = {
  item_no: '',
  category: '',
  item_name: '',
  additions_details: '',
  brand: '',
  container_type: '',
  pack: '',
  pack_size: '',
  uom: '',
  cbm: '',
  loading_per_container: '',
  origin: '',
  loading_port: '',
  last_fob: '',
  currency: '',
  date: '',
  supplier: ''
};

onMounted(async () => {
  await getProducts();
});

const getProducts = async () => {
  store.state.spinner = true;
  const res = await store.dispatch('getProducts');
  store.state.spinner = false;
  if (res.status == 'success') {
    products.value = res.data;
  }
};

const onUpload = (e: any) => {
  Papa.parse(e.files[0], {
    header: true,
    skipEmptyLines: true,
    complete: async (res: any) => {
      if (Object.keys(sample_json).filter((item: string) => res.meta.fields.indexOf(item) == -1).length == 0) {
        let error = false;
        for (const object of res.data) {
          if (moment(object.date).isValid()) {
            object.date = dayjs(object.date).format('DD-MM-YYYY');
          } else {
            toast.add({ severity: 'error', summary: 'Error Message', detail: 'Invalid date formate found in CSV', life: 3000 });
            return;
          }

          for (const key in object) {
            if (object[key].replace(' ', '').length == 0) {
              toast.add({ severity: 'error', summary: 'Error Message', detail: 'Some of fields found empty in CSV', life: 3000 });
              return;
            }
          }
        }
        if (!error) {
          store.state.spinner = true;
          const response = await store.dispatch('saveProductFromCSV', res.data);
          store.state.spinner = false;
          if (response.status == 'success') {
            location.reload();
            return;
          }
          toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong unable to save products from csv', life: 3000 });
        }
        return;
      }
      toast.add({ severity: 'error', summary: 'Error Message', detail: 'Invalid CSV', life: 3000 });
    }
  });
};

const confirmDeleteProduct = (id: number) => {
  confirm.require({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      store.state.spinner = true;
      const res = await store.dispatch('deleteProduct', { id: id });
      store.state.spinner = false;
      if (res.status == 'success') {
        getProducts();
      }
    }
  });
};
</script>
