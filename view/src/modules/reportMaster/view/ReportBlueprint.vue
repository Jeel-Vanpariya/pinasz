<template>
  <div class="card flex justify-content-center">
    <p>Report Name: <input v-model="request_obj.report_name" type="text" /></p>
    <Toast />
    <Tree v-model:selectionKeys="selectedKey" :value="nodes" selectionMode="checkbox" class="w-full md:w-30rem" @nodeSelect="onNodeSelect" @nodeUnselect="onNodeUnselect"></Tree>
    <!-- <br />
    <div class="flex flex-wrap gap-3">
      <div class="flex align-items-center">
        <label for="Scheduled Mail" class="ml-2">Scheduled Mail</label>&nbsp;&nbsp;
        <RadioButton v-model="request_obj.is_scheduled_mail" inputId="true" name="true" value="true" />
        <label for="Yes" class="ml-2">Yes</label>&nbsp;&nbsp;
        <RadioButton v-model="request_obj.is_scheduled_mail" inputId="false" name="false" value="false" />
        <label for="No" class="ml-2">No</label>
      </div>
    </div>
    <br />
    <div class="flex flex-wrap gap-3">
      <div class="flex align-items-center">
        <label for="Mail Receiver" class="ml-2"
          >Mail Receiver:
          <div v-for="mailReceiverSingle of mailReceiver" :key="mailReceiverSingle" class="flex align-items-center">
            <Checkbox v-model="mailReceiverSelected" :inputId="mailReceiverSingle" name="mailReceiverSingle" :value="mailReceiverSingle" />
            <label :for="mailReceiverSingle">{{ mailReceiverSingle }}</label>
          </div>
        </label>
      </div>
    </div>
    <br /> -->
    <!-- <div class="flex flex-wrap gap-3">
      <div class="flex align-items-center">
        <label for="Report Creation" class="ml-2">Report Creation</label>&nbsp;&nbsp;
        <RadioButton v-model="request_obj.report_creation" inputId="daily" name="daily" value="daily" />
        <label for="Daily" class="ml-2">Daily</label>&nbsp;&nbsp;
        <RadioButton v-model="request_obj.report_creation" inputId="weekly" name="weekly" value="weekly" />
        <label for="Weekly" class="ml-2">Weekly</label>&nbsp;&nbsp;
        <RadioButton v-model="request_obj.report_creation" inputId="monthly" name="monthly" value="monthly" />
        <label for="Monthly" class="ml-2">Monthly</label>
      </div>
    </div> -->
    <br />
    <div class="d-flex justify-content-end mt-4 pe-2">
      <!-- <Button label="Save" icon="pi pi-save" @click="handleButtonClick" /> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import Button from 'primevue/button';
import store from '../../../stores/index';
import { NodeService } from './MasterSchema';
import Toast from 'primevue/toast';
import Tree from 'primevue/tree';

const nodes = ref(null);
const selectedKey = ref(null);
const toast = useToast();
let request_obj = {
  report_fields: [],
  mail_receiver: ''
};
let arr = [];
let mailReceiver = [];
let mailReceiverSelected = ref([]);

onMounted(() => {
  NodeService.getTreeNodes().then((data) => (nodes.value = data));
});

const onNodeSelect = (node) => {
  if (node.children != undefined) {
    node.children.forEach((item) => {
      arr.push({ field_label: item.label, field_name: item.data, table_name: item.table_name });
      console.log(arr);

      let indexMailReceiver = mailReceiver.findIndex((x) => x.master_name == item.master_name);
      if (indexMailReceiver == -1) {
        mailReceiver.push({ table_name: item.table_name, master_name: item.master_name });
      }
    });
  } else {
    arr.push({ field_label: node.label, field_name: node.data, table_name: node.table_name });
    console.log(arr);
    let indexMailReceiver1 = mailReceiver.findIndex((x) => x.master_name == node.master_name);
    if (indexMailReceiver1 == -1) {
      mailReceiver.push({ table_name: node.table_name, master_name: node.master_name });
    }
  }
  toast.add({ severity: 'success', summary: 'Node Selected', detail: node.data, life: 3000 });
};
const onNodeUnselect = (node) => {
  if (node.children != undefined) {
    node.children.forEach((item) => {
      const index = arr.findIndex((x) => x.field_name == item.data);
      if (index > -1) {
        // only splice array when item is found
        arr.splice(index, 1); // 2nd parameter means remove one item only
      }
      console.log(arr);
    });
  }
  if (node.children != undefined) {
    node.children.forEach((item) => {
      const index = mailReceiver.findIndex((x) => x.master_name == item.master_name);
      if (index > -1) {
        // only splice array when item is found
        mailReceiver.splice(index, 1); // 2nd parameter means remove one item only
      }
      console.log(mailReceiver);
    });
  } else {
    const index = arr.findIndex((x) => x.field_name == node.data);
    if (index > -1) {
      // only splice array when item is found
      arr.splice(index, 1); // 2nd parameter means remove one item only
    }
    console.log(arr);
    const index1 = mailReceiver.findIndex((x) => x.master_name == node.master_name);
    if (index1 > -1) {
      // only splice array when item is found
      mailReceiver.splice(index1, 1); // 2nd parameter means remove one item only
    }
    console.log(mailReceiver);
  }
  toast.add({ severity: 'error', summary: 'Node Unselected', detail: node.data, life: 3000 });
};
const handleButtonClick = async () => {
  request_obj.report_fields = arr;
  request_obj.mail_receiver = mailReceiverSelected._value.join(',');
  const res = await store.dispatch('saveFields', request_obj);
  if (res.status == 'success') {
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'Saved', life: 3000 });
    return;
  }
};
</script>
