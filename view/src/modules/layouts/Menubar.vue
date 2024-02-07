<template>
  <Menubar :model="menuItems">
    <template #start> </template>
    <template #end>
      <UserSettings />
    </template>
  </Menubar>
</template>
<script lang="ts" setup>
import { defineAsyncComponent, ref, watchEffect } from 'vue';
import Menubar from 'primevue/menubar';
import router from '@/router';
import store from '@/stores';

const UserSettings = defineAsyncComponent(() => import('../user-settings/view/UserSettings.vue'));
const menuItems = ref([
  {
    label: 'Other Masters',
    items: [
      {
        label: 'Payment Terms',
        command: () => router.push({ name: 'PaymentTermList' })
      },
      {
        label: 'Container Types',
        command: () => router.push({ name: 'ContainerTypeList' })
      },
      {
        label: 'Invoicing Parties',
        command: () => router.push({ name: 'InvoicingPartyList' })
      },
      {
        label: 'Ports',
        items: [
          {
            label: 'Loading Ports',
            command: () => router.push({ name: 'LoadingPortList' })
          },
          {
            label: 'Destination Ports',
            command: () => router.push({ name: 'DestinationPortList' })
          }
        ]
      },
      {
        label: 'Final Destinations',
        command: () => router.push({ name: 'FinalDestinationList' })
      },
      {
        label: 'Consignees',
        command: () => router.push({ name: 'ConsigneeList' })
      }
    ]
  },
  {
    label: 'Product Master',
    items: [
      {
        label: 'Categories',
        command: () => router.push({ name: 'ProductCategory' })
      },
      {
        label: 'Products',
        command: () => router.push({ name: 'Products' })
      }
    ]
  },
  {
    label: 'Supplier Master',
    command: () => router.push({ name: 'SuppliersList' })
  },
  {
    label: 'Customer Master',
    command: () => router.push({ name: 'CustomersList' })
  },
  {
    label: 'Shipment Master',
    command: () => router.push({ name: 'ShipmentList' })
  },
  {
    label: 'User Master',
    items: [
      {
        label: 'Roles',
        command: () => router.push({ name: 'RoleList' })
      },
      {
        label: 'Users',
        command: () => router.push({ name: 'UsersList' })
      }
    ]
  },
  {
    label: 'Report Master',
    items: [
      {
        label: 'Blueprints',
        command: () => router.push({ name: 'ReportBlueprintList' })
      },
      {
        label: 'Reports',
        command: () => router.push({ name: 'ReportList' })
      }
    ]
  }
]);

watchEffect(() => {
  if (!store.state.permission.other.includes('view')) menuItems.value.splice(0, 1);
  if (!store.state.permission.product.includes('view')|| !store.state.permission.product.includes('categoryView')) menuItems.value.splice(1, 1);
  if (!store.state.permission.supplier.includes('view')) menuItems.value.splice(2, 1);
  if (!store.state.permission.customer.includes('view')) menuItems.value.splice(3, 1);
  if (!store.state.permission.shipment.includes('view')) menuItems.value.splice(4, 1);
  if (!store.state.permission.user.includes('view')|| !store.state.permission.user.includes('roleView')) menuItems.value.splice(5, 1);
  if (!store.state.permission.report.includes('view')|| !store.state.permission.report.includes('blueprintView')) menuItems.value.splice(6, 1);
});
</script>
