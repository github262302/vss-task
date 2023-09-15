<template>
    <div class="demo-collapse">
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item :key="item.id" v-for="item in  projects" :title="item.name" :name="item.id">
                <div class="sub-task">
                    <div class="sub-task-menu">
                        <el-button title="打开终端" link @click="openTerminal(item.path)">
                            <SvgIcon icon="shell" />
                        </el-button>
                        <el-button title="打开文件夹" link @click="openFolder(item.path)">
                            <SvgIcon icon="folder" />
                        </el-button>
                        <el-button title="打开vscode" link @click="openVscode(item.path)">
                            <SvgIcon icon="vscode" />
                        </el-button>
                        <el-button link type="danger" size="small" @click="Delete(item.name)">
                            <SvgIcon icon="shanchu" />
                        </el-button>
                    </div>
                    <div class="title" v-if="!!item.tasks.length">
                        <SvgIcon icon="vscode" class="vm" />
                        &nbsp;task
                    </div>

                    <div class="task" :key="item_m" v-for="item_m in  item.tasks" :title="item_m.command">
                        <div class="task-text">{{ item_m.label }}</div>
                        <div class="task-right hover">
                            <span v-if="!isRun(taskName(item_m, item))" class="hover task-start"
                                @click.stop="runTask(item_m, item)">
                                🚀
                            </span>
                            <span v-else-if="isClose(taskName(item_m, item))">
                                ✅
                            </span>
                            <span v-else class="rotate">
                                🌀
                            </span>
                        </div>
                    </div>
                </div>
                <div class="sub-task" title="script">
                    <div class="title" v-if="!!item.scripts.length">
                        <SvgIcon icon="npm" class="vm" />
                        &nbsp;scripts
                    </div>

                    <div class="task" :key="item_m" v-for="item_m in  item.scripts" :title="item_m.command">
                        <div class="task-text">{{ item_m.name }}</div>
                        <div class="task-right">

                            <span v-if="!isRun(scriptName(item_m, item))" class="hover task-start"
                                @click.stop="runScript(item_m, item)">
                                🚀
                            </span>
                            <span v-else-if="isClose(scriptName(item_m, item))">
                                ✅
                            </span>
                            <span v-else class="rotate">
                                🌀
                            </span>
                        </div>
                    </div>
                </div>
                <div class="sub-menu">
                </div>
            </el-collapse-item>
        </el-collapse>
        <el-empty v-if="!projects.length" description="暂未添加项目 请点击下方"></el-empty>
        <div class="menu">

            <div title="添加项目" class="menu-item hover">
                <ProjectAddVue @yes="upp.load">
                    <template #open>
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </template>
                </ProjectAddVue>
            </div>
            <div title="设置" class="menu-item hover" @click="handleSettings">
                <el-icon>
                    <Setting />
                </el-icon>
            </div>

        </div>

    </div>
</template>
<script setup>
import { getCurrentInstance, onMounted, ref } from 'vue'
import { Setting, Plus } from '@element-plus/icons-vue';
import { useProject } from '@/stores/project';
import ProjectAddVue from "@/components/Project/Add.vue"
import { openFolder, openTerminal, openVscode } from '@/utils/index';
import { startProcess } from '@/utils/process';
import { useSettings } from '@/components/Settings/index';
import { useProcess } from '@/stores/process';
import { storeToRefs } from 'pinia';
import { useProjectStorage } from '@/utils/project';
const upprocess = useProcess()
const up = new useProjectStorage()
const upp = useProject()
const { processValue: log } = storeToRefs(upprocess)
const { projectValue: projects } = storeToRefs(upp)
const { proxy } = getCurrentInstance();
const activeNames = ref(['1'])
const handleChange = (val) => {
    console.log(val)
}

function isRun (name) {
    return log.value.some(e => e.name === name)
}
function isClose (name) {
    return log.value.some(e => e.name === name && e.status === "close")
}
function taskName (data, all) {
    return [all.name, data.label].join("-")
}
function scriptName (data, all) {
    return [all.name, data.name].join("-")
}
function runTask (data, all) {
    let name = taskName(data, all)
    if (log.value.some(e => e.name == name)) {
        proxy.$message({ type: "error", message: "已启动" })
        return
    }
    let temp = {
        type: data.type,
        command: data.command,
        name: name,
        cwd: all.path
    }
    startProcess(temp)
}
function runScript (data, all) {
    let name = scriptName(data, all)
    if (log.value.some(e => e.name == name)) {
        proxy.$message({ type: "error", message: "已启动" })
        return
    }
    let temp = {
        type: "npm",
        command: data.command,
        name: name,
        cwd: all.path
    }
    startProcess(temp)
}
function projectReload () {
    upp.load()
}
function Delete (name) {
    proxy.$confirm("是否移除项目:" + name, { type: "warning", title: "系统通知" }).then(() => {
        up.remove(name)
    }).then(projectReload)
}
function handleSettings () {
    const us = useSettings()
    us.open()
}
onMounted(projectReload)
</script>
<style lang="scss" scoped>
.sub-task-menu {
    font-size: 12px;
    // border-bottom: 2px solid var(--current-color);
}

.demo-collapse {
    margin-left: 12px;
    display: flex;
    height: 100%;
    flex-direction: column;
    position: relative;

    .menu {
        margin-top: auto;
        background-color: white;
        box-shadow: 0 -1px 1px 0 rgba(0, 0, 0, 0.1);
        position: sticky;
        margin-right: 12px;

        bottom: 0;
        display: flex;
        gap: 24px;
        padding: 4px 0 12px 0;
        justify-content: center;

        .menu-item {
            // margin-bottom: 12px;
            // text-align: center;
            // transform: translateX(-12px);
        }
    }
}

.task {
    display: flex;
    align-items: center;
    padding-right: 12px;
    padding-left: 12px;
    border-bottom: 1px solid #ebeef5;

    .el-icon {
        font-size: 1.2em;
    }

    &:hover {
        background-color: #f5f7fa;
    }

    .task-icon {
        width: 24px;
        height: 24px;
        // background-color: #f5f7fa;
        border-radius: 4px;
        margin-right: 12px;
        display: grid;
        place-items: center;
    }

    .task-text {
        flex: 1;
        // display: flex;
        // flex-direction: column;
        // justify-content: center;
        line-height: 32px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .task-right {
        width: 24px;
        height: 24px;
        // background-color: #f5f7fa;
        border-radius: 4px;
        display: grid;
        place-items: center;
        margin-left: 12px;
    }
}

.sub-task {
    padding-left: 12px;

    .title {
        font-size: 14px;
        font-weight: 500;
        color: #606266;
        line-height: 40px;
    }

    // padding-right: 12px;
    .el-collapse-item__wrap {
        padding: 0;
    }
}

.vm {
    vertical-align: middle;
}

.sub-menu {
    text-align: center;
}

@keyframes skyRightTop {
    0% {
        transform: translate(0, 0);
        z-index: 100;
    }

    100% {
        transform: translate(100%, -100%);
        z-index: 100;

    }

}

// 底部成扇形左右摇摆动画
@keyframes swing {
    0% {
        transform: rotate(0deg);
    }

    50% {
        transform: rotate(10deg);
    }

    100% {
        transform: rotate(0deg);
    }

}

.task-start {
    // &:active {
    //     font-size: 5em;
    //     animation: skyRightTop 0.5s;
    // }

    &:hover {
        animation: swing 0.5s;
    }
}
</style>
