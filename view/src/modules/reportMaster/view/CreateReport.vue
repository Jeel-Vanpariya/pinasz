<template>
  <Panel header="Create Report" class="p-4">
    <template #icons>
      <Button label="Save" icon="pi pi-save" @click="onSave" />
    </template>
    <DataTable
      ref="dt"
      :value="reportData"
      v-model:filters="filters"
      filterDisplay="menu"
      :showFilterMatchModes="true"
      scrollable
      removableSort
      editMode="cell"
      @cell-edit-complete="onCellEditComplete"
      v-on:filter="onFilter"
    >
      <template #header>
        <Form :validation-schema="schema" @submit="onSubmit">
          <div class="d-flex flex-wrap align-items-center justify-content-end gap-2">
            <Field name="column" v-slot="{ value, errorMessage, handleChange }">
              <InputText id="column" placeholder="Column" type="text" :model-value="value" :class="{ 'p-invalid': errorMessage }" @update:model-value="handleChange" />
              <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
            </Field>
            <Button label="Add" icon="pi pi-plus" severity="info" class="mx-4" type="submit" />
          </div>
        </Form>
      </template>
      <Column v-for="col in columns" :field="col.field" :header="col.header" sortable style="min-width: 20rem">
        <template #body="{ data }">{{ data[col.field] }}</template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
        <template v-if="col.extra" #editor="{ data, field }">
          <InputText v-model="data[field]" autofocus />
        </template>
      </Column>
      <Column :exportable="false" alignFrozen="right" :frozen="true">
        <template #body="slotProps">
          <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDelete(slotProps.index)" />
        </template>
      </Column>
    </DataTable>
  </Panel>
  <Toast />
  <ConfirmDialog />
</template>
<script setup lang="ts">
import router from '@/router';
import store from '@/stores';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import Button from 'primevue/button';
import Column from 'primevue/column';
import ConfirmDialog from 'primevue/confirmdialog';
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';
import Panel from 'primevue/panel';
import Toast from 'primevue/toast';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { Field, Form } from 'vee-validate';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import * as yup from 'yup';

const route = useRoute();
const toast = useToast();
const confirm = useConfirm();
const dt = ref();
const filters = ref({}) as any;
const schema = yup.object({
  column: yup.string().required('Please enter column name')
});
const reportData = ref([]) as any;
const columns = ref([]) as any;
const filterData = ref([]);

onMounted(async () => {
  if (route.params.id) await getReportData();
  console.log(filterData.value);
});

const getReportData = async () => {
  store.state.spinner = true;
  const res = await store.dispatch('getReportData', { id: route.params.id });
  store.state.spinner = false;
  if (res.status == 'success' && res.data.length > 0) {
    for (const object of res.data) {
      for (const key in object) {
        filters.value[key] = { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] };
        // filters.value[key] = filterOption;
        for (const obj of store.state.masters) {
          for (const val of obj.children) {
            if (val.data == key && columns.value.filter((item) => item.field == key).length == 0) columns.value.push({ field: key, header: val.label });
          }
        }
      }
    }
    reportData.value = res.data;
    return;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went unable to fetch report data', life: 2500 });
};

const onSave = async () => {
  if (filterData.value.length == 0 || reportData.value.length == 0) return;
  store.state.spinner = true;
  const res = await store.dispatch('saveReportData', { id: route.params.id, data: filterData.value, columns: columns.value });
  store.state.spinner = false;
  if (res.status == 'success') {
    router.push({ name: 'ReportList' });
    return;
  }
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Something went unable to save report', life: 2500 });
};

const onFilter = ({ filteredValue }: any) => {
  filterData.value = filteredValue;
};

const onSubmit = async ({ column }: any, { resetForm }: any) => {
  for (const obj of reportData.value) {
    if (typeof obj[column] == 'undefined') {
      obj[column] = '';
    } else {
      toast.add({ severity: 'error', summary: 'Error Message', detail: 'Column already present in table', life: 2500 });
      return;
    }
  }
  filters.value[column] = { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] };
  columns.value.push({ field: column, header: column, extra: true });
  resetForm();
};

const onCellEditComplete = ({ data, newValue, field }: any) => {
  data[field] = newValue;
};

const confirmDelete = (index: number) => {
  confirm.require({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      reportData.value.splice(index, 1);
    }
  });
};
</script>
