<template>
  <Menubar :model="menuItems">
    <template #start> </template>
    <template #end>
      <UserSettings />
    </template>
  </Menubar>
</template>
<script lang="ts" setup>
import { defineAsyncComponent, ref } from 'vue';
import Menubar from 'primevue/menubar';
import router from '@/router';

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
    command: () => router.push({ name: 'UsersList' })
  },
  {
    label: 'Report Master',
    items: [
      {
        label: 'Blueprints',
        command: () => router.push({ name: 'ReportBlueprintList' })
      },
    ]
  }
]);
</script>
