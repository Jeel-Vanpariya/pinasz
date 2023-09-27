<template>
  <FileUpload class="mx-3" mode="basic" accept="text/csv" chooseLabel="Import CSV" :auto="true" customUpload @uploader="onUpload" />
</template>
<script setup lang="ts">
import FileUpload from 'primevue/fileupload';

const onUpload=(e)=>{
console.log(e);

}
</script>
