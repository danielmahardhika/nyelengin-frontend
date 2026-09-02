<template>
  <!-- RouterView akan otomatis memuat LoginView atau DashboardView sesuai URL -->
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style>
/* Reset margin bawaan browser agar layout full-screen kita bekerja rapi */
body { 
  margin: 0; 
  padding: 0;
  font-family: 'Inter', system-ui, -apple-system, sans-serif; 
}
</style>