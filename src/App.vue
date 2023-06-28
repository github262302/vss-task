<script setup>
import { getCurrentInstance } from 'vue';
import Layout from './layout/index.vue'
import { onMessage } from '@/utils/index';
import { ElConfigProvider } from 'element-plus';
import { loadAnimation, loadBackground } from '@/utils/bg';
const { proxy } = getCurrentInstance();
window.VueApp = proxy
onMessage(function (data) {
  proxy.$message({ showClose: true,message:data })
})
const config = {
  showClose: true
}
loadBackground()
loadAnimation()
</script>

<template>
  <el-config-provider :message="config">
    <Layout />
  </el-config-provider>
</template>
