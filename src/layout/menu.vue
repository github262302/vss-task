<template>
    <div class="demo-collapse">
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item :key="item.id" v-for="item in  projects" :title="item.name" :name="item.id">
                <div class="sub-task" title="vscode-task">
                    <div class="sub-task-menu">
                        <el-button link size="small" @click="openTerminal(item.path)">终端</el-button>
                        <el-button link size="small" @click="openFolder(item.path)">文件夹</el-button>
                        <el-button link size="small" @click="openVscode(item.path)">
                            <!-- <template #icon>
                                <svg class="icon" aria-hidden="false" viewBox="0 0 24 24">
                                    <use xlink:href="icon-npm"></use>
                                </svg>
                            </template> -->
                        vscode
                        </el-button>
                        <el-button link type="danger" size="small" @click="Delete(item.name)">
                            删除
                        </el-button>
                    </div>
                    <div class="title" v-if="!!item.tasks.length"> <el-icon class="vm">
                            <Van />
                        </el-icon>&nbsp;vscode任务</div>

                    <div class="task" :key="item_m" v-for="item_m in  item.tasks" :title="item_m.label">
                        <div class="task-text">{{ item_m.label }}</div>
                        <div class="task-right hover">
                            <span v-if="!isRun(taskName(item_m, item))" class="hover task-start"
                                @click.stop="runTask(item_m, item)">
                                <!-- <VideoPlay /> -->
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
                    <div class="title"> <el-icon class="vm">
                            <Van />
                        </el-icon>&nbsp;npm script</div>

                    <div class="task" :key="item_m" v-for="item_m in  item.scripts" :title="item_m.name">
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
        <div class="menu">

            <div title="添加项目" class="menu-item hover" @click="addOpen"> <el-icon>
                    <Plus />
                </el-icon></div>
            <div title="打开vscode" class="menu-item hover" @click="openVscode"> <el-icon>
                    <svg t="1687705979009" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="1433" width="48" height="48">
                        <path
                            d="M746.222933 102.239573l-359.799466 330.820267L185.347413 281.4976 102.2464 329.864533l198.20544 182.132054-198.20544 182.132053 83.101013 48.510293 201.076054-151.558826 359.799466 330.676906 175.527254-85.251413V187.4944z m0 217.57952v384.341334l-255.040853-192.177494z"
                            fill="#2196F3" p-id="1434"></path>
                    </svg>
                </el-icon></div>
            <div title="设置" class="menu-item hover" @click="handleSettings">
                <el-icon>
                    <Setting />
                </el-icon>
            </div>

        </div>
        <ProjectAddVue @register="addRegister" @yes="reload" />
    </div>
</template>
<script setup>
import { getCurrentInstance, onMounted, ref, shallowRef } from 'vue'
import { Setting, Plus, VideoPlay, Van, Loading, CopyDocument } from '@element-plus/icons-vue';
import { useProject } from '@/stores/counter';
import ProjectAddVue from "@/components/Project/Add.vue"
import cache from '@/utils/cache';
import { handleProject, loadProjectTask, openFolder, openTerminal, openVscode } from '@/utils/index';
import { onProcess, startProcess } from '@/utils/process';
import { useSettings } from '@/components/Settings/index';

const { proxy } = getCurrentInstance();
const addInstance = ref(null)

const log = shallowRef([
])
const activeNames = ref(['1'])
const projects = ref([])
const handleChange = (val) => {
    console.log(val)
}
const up = useProject()
function addRegister (instance) {
    addInstance.value = instance
}
function addOpen () {
    console.log("addInstance.value", addInstance.value);
    addInstance.value.open()
}
function isRun (name) {
    return log.value.some(e => e.name === name)
}
function isClose (name) {
    console.log(name, log.value)
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
function reload () {
    loadProjectTask(handleProject(cache.project.get())).then(res => {
        projects.value = res
    })
}
function Delete (name) {
    proxy.$confirm("是否移除项目:" + name, { type: "warning", title: "系统通知" }).then(() => {
        up.remove(name)
        reload()
    })

}
onMounted(() => {
    reload()
    onProcess((data) => {
        log.value = (JSON.parse(JSON.stringify(data)))
    })
})
function handleSettings () {
    const us = useSettings()
    us.open()
}
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
        padding: 4px;
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
