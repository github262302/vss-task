<script setup>
import { getCurrentInstance } from 'vue';
import Layout from './layout/index.vue'
import { onMessage } from '@/utils/index';
import { ElConfigProvider } from 'element-plus';
import { useMessage } from '@/stores/message';
const { proxy } = getCurrentInstance();
const up = useMessage()
window.VueApp = proxy
onMessage(function (data) {
  proxy.$message({ showClose: true, message: data.content })
})
onMessage(up.add)
const config = {
  showClose: true
}
</script>

<template>
  <el-config-provider :message="config">
    <Layout />
  </el-config-provider>
</template>
