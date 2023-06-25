<script setup>
import { getCurrentInstance } from 'vue';
import Layout from './layout/index.vue'
const { proxy } = getCurrentInstance();
window.VueApp = proxy

</script>

<template>
  <Layout />
</template>
