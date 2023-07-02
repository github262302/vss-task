<template>
    <el-drawer class="container" v-model="drawer2" :direction="direction">
        <template #header>
            <h4 style="margin:0">消息列表</h4>
        </template>
        <template #default>
            <div v-if="messageValue.length">
                <el-alert style="margin-bottom:12px" v-for="item in messageValue" :key="item.content" :type="item.type" :closable="false"
                    :title="item.title" :description="item.content" show-icon>
                </el-alert>
            </div>
            <el-empty v-else :image="undraw_no_data"></el-empty>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="clean" type="primary">清空</el-button>
                <el-button @click="cancelClick">关闭</el-button>
            </div>
        </template>
    </el-drawer>
</template>
<script setup>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus';
import { useMessage } from "@/stores/message"
import undraw_no_data from '@/assets/bg/undraw_no_data.svg'

import { storeToRefs } from 'pinia';
const emit = defineEmits(['yes', 'register'])
const um = useMessage()
const { messageValue } = storeToRefs(um)

function open () {
    drawer2.value = true
}

emit("register", {
    open
})
function clean(){
    um.clean()
}
const drawer2 = ref(false)
const direction = ref('rtl')

const handleClose = (done) => {
    ElMessageBox.confirm('Are you sure you want to close this?')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}
function cancelClick () {
    drawer2.value = false
}
function confirmClick () {
    ElMessageBox.confirm(`Are you confirm to chose ?`)
        .then(() => {
            drawer2.value = false
        })
        .catch(() => {
            // catch error
        })
}
</script>
<style lang="scss" scoped>
.notice-single {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ebeef5;

    .notice-single-content {
        display: flex;
        align-items: center;

        .notice-single-content-icon {
            margin-right: 10px;
        }
    }

    .notice-single-close {
        cursor: pointer;
    }
}

.container {
    :deep .el-drawer__header {
        margin-bottom: 0 !important;
        padding-top: 0 !important;
    }
}
</style>


