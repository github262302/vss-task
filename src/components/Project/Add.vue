<template>
    <span>
        <el-dialog append-to-body draggable v-model="vis" title="新增项目">
            <el-form :model="form" :rules="formRule">
                <el-form-item label="项目名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="项目路径" prop="path">
                    <el-input readonly v-model="form.path">
                        <template #append>
                            <el-button @click="choose">选择</el-button>
                        </template>
                    </el-input>

                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="vis = false">取 消</el-button>
                <el-button type="primary" @click="yes">确 定</el-button>
            </template>
        </el-dialog>
        <span @click="open">
            <slot name="open">
                <span>
                    open
                </span>
            </slot>
        </span>

    </span>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { chooseFolder } from "@/utils"
import { useProject } from '@/stores/project';
import { useProjectStorage } from '@/utils/project';
const ups =new useProjectStorage()
const vis = ref(false)
const form = reactive({
    name: "",
    path: ""
})
const emit = defineEmits(['yes', 'register'])
const formRule = {
    name: [
        { required: true, message: '请输入项目名称', trigger: 'blur' },
        { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
    ],
    path: [
        { required: true, message: '请选择项目路径', trigger: 'blur' },
        { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
    ]
}
function open () {
    vis.value = true
}
function yes () {
    ups.add(JSON.parse(JSON.stringify(form)))
    setTimeout(() => {
        form.name = ""
        form.path = ""
        vis.value = false
        emit("yes")
    }, 0);

}
function choose () {
    Promise.resolve(0).then(() => {
        chooseFolder().then(res => {
            if (res) {
                form.path = res[0]
            }

        })
    })
}
emit("register", {
    open
})
</script>
<style lang="scss" scoped>
</style>
