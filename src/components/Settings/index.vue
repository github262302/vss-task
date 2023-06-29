<template>
    <div class="container">
        <el-form label-position="top" ref="settingsForm" :model="form" :rules="rule">
            <el-form-item label="node包管理工具" prop="nodePackageTools">
                <el-radio-group v-model="form.nodePackageTools">
                    <el-radio v-for="item in nodePackageTools" :key="item.value" :label="item.value">
                        {{ item.label }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="自定义背景" prop="bgCustom">
                <el-switch v-model="form.bgCustom" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
            <el-form-item label="背景图片" v-if="form.bgCustom" prop="bgPath">
                <el-input readonly class="folderInput" style="padding-right: 0;" v-model="form.bgPath"
                    placeholder="请输入背景图片路径">
                    <template #append>
                        <div>
                            <el-button type="primary" @click="setFolder('bg')">选择路径</el-button>
                        </div>
                    </template>
                    <template #suffix>
                        <el-select style="width:100px" v-model="form.bgSuffix" placeholder="请选择后缀">
                            <el-option label="png" value="png"></el-option>
                            <el-option label="jpg" value="jpg"></el-option>
                            <el-option label="jpeg" value="jpeg"></el-option>
                            <el-option label="gif" value="gif"></el-option>
                        </el-select>
                    </template>
                </el-input>
                <div class="tip">
                    <p>支持png、jpg、jpeg、gif格式</p>
                    <p>自动扫描文件夹所有图片 启动时随机取一张</p>
                </div>
            </el-form-item>
            <el-form-item label="自定义动画" prop="animationCustom">
                <el-switch v-model="form.animationCustom" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
            <el-form-item label="动画路径" v-if="form.animationCustom" prop="animationPath">
                <el-input readonly class="folderInput" style="padding-right: 0;" v-model="form.animationPath"
                    placeholder="请输入动画路径">
                    <template #append>
                        <div>
                            <el-button type="primary" @click="setFolder('')">选择路径</el-button>
                        </div>
                    </template>
                    <template #suffix>
                        <el-select style="width:100px" v-model="form.animationSuffix" placeholder="请选择后缀">
                            <el-option label="gif" value="gif"></el-option>
                            <el-option label="png" value="png"></el-option>
                        </el-select>
                    </template>
                </el-input>
                <div class="tip">
                    <p>支持gif、png格式</p>
                    <p>自动扫描文件夹所有图 加载到动图列表</p>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">保存设置</el-button>
            </el-form-item>
        </el-form>
        <div class="img">
            <img :src="Img" alt="">
        </div>
    </div>
</template>
<script setup>
import cache from '@/utils/cache';
import { chooseFolder, reStart } from '@/utils/index';
import { getCurrentInstance, onMounted, reactive, ref } from 'vue';
import Img from "@/../images/icon.png"
const { proxy } = getCurrentInstance();
const form = reactive({
    bgCustom: false,
    bgPath: "",
    bgSuffix: 'png',
    animationCustom: false,
    animationPath: "",
    animationSuffix: 'gif',
    nodePackageTools: "npm"
})
const rule = {
    bgPath: [
        { required: true, message: '请输入背景图片路径', trigger: 'blur' }
    ],
    animationPath: [
        { required: true, message: '请输入动画路径', trigger: 'blur' }
    ]
}
function setFolder (flag) {
    chooseFolder().then(res => {
        if (res[0]) {
            if (flag === 'bg') {
                form.bgPath = res[0]
            } else {
                form.animationPath = res[0]
            }
        }
    })
}
const nodePackageTools = [
    {
        label: "npm",
        value: "npm"
    },
    {
        label: "yarn",
        value: "yarn"
    },
    {
        label: "cnpm",
        value: "cnpm"
    },
    {
        label: "pnpm",
        value: "pnpm"
    },
]

function save () {
    proxy.$refs["settingsForm"].validate((va, e) => {
        console.log("ff", va, e);
        if (va) {
            cache.settings.set(JSON.stringify(form))
            reStart()
        }
    })

}
function get () {
    let temp = cache.settings.get()
    if (temp) {
        Object.assign(form, JSON.parse(temp))
    }
}
onMounted(() => {
    get()
})
</script>
<style lang="scss" scoped>
.tip {
    color: #909399;
    font-size: 12px;
    margin-top: 10px;
}

.folderInput {
    :deep .el-input__wrapper {
        padding-right: 0;
    }
}

.container {
    display: flex;
    height: 100%;
    gap:8px;
    img {
        width: 200px;
        height: 200px;
    }

    .img {
        background-color: rgb(255, 255, 255);
        margin-top: -53px;
        margin-right: -16px;
        margin-bottom: -25px;
        padding: 24px 45px;
        display: grid;
        place-items: center;
        box-shadow: -1px 0 40px 1px rgb(0 0 0 / 5%), 0 1px 0 0 rgb(0 0 0 / 5%);
    }
}
</style>
