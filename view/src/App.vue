<template>
  <Menubar v-if="!['UserLogin'].includes($route.name as string)" />
  <div class="progress-spinner" v-if="store.state.spinner">
    <ProgressSpinner />
  </div>
  <RouterView />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import ProgressSpinner from 'primevue/progressspinner';
import store from './stores';

const Menubar = defineAsyncComponent(() => import('./modules/layouts/Menubar.vue'));
</script>
<style>
.progress-spinner {
  position: fixed;
  z-index: 999;
  height: 2em;
  width: 2em;
  overflow: show;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

/* Transparent Overlay */
.progress-spinner:before {
  content: '';
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.53);
}
</style>
