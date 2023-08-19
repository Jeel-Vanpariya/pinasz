<template>
  <div class="flex justify-content-center">
    <Button class="mx-2" icon="pi pi-user" severity="secondary" rounded outlined aria-label="User" aria-controls="overlay_tmenu" @click="menu.toggle($event)" />
    <TieredMenu ref="menu" id="overlay_tmenu" :model="menuItems" popup />
  </div>
</template>
<script lang="ts" setup>
import Button from 'primevue/button';
import TieredMenu from 'primevue/tieredmenu';
import { ref } from 'vue';
import router from '../../../router/index';

const menu = ref();
const menuItems = ref([
  // {
  //   label: 'Account Settings',
  //   icon: 'pi pi-cog'
  // },
  // {
  //   separator: true
  // },
  {
    label: 'Log out',
    icon: 'pi pi-download',
    command: () => {
      sessionStorage.clear();
      router.replace({ name: 'UserLogin' });
    }
  }
]);
</script>
<style lang="scss">
.p-menuitem-icon.pi-download {
  transform: rotate(-90deg);
}
</style>
