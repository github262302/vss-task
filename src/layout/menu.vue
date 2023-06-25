<template>
    <div class="demo-collapse">
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item :key="item.id" v-for="item in  projects" :title="item.name" :name="item.id">
                <div class="sub-task" title="vscode-task">
                    <div>
                        <el-button link size="small" @click="openTerminal(item.path)">终端</el-button>
                        <el-button link size="small" @click="openFolder(item.path)">文件夹</el-button>
                        <el-button link size="small" @click="openVscode">vscode</el-button>
                    </div>
                    <div class="title"> <el-icon class="vm">
                            <Van />
                        </el-icon>&nbsp;vscode任务</div>

                    <div class="task" :key="item_m" v-for="item_m in  item.tasks" :title="item_m.label">
                        <div class="task-text">{{ item_m.label }}</div>
                        <div class="task-right hover">
                            <el-icon v-if="!isRun(taskName(item_m, item))" class="hover" @click="runTask(item_m, item)">
                                <VideoPlay />
                            </el-icon>
                            <el-icon v-else class="rotate">
                                <Loading />
                            </el-icon>
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

                            <el-icon v-if="!isRun(scriptName(item_m, item))" class="hover" @click="runScript(item_m, item)">
                                <VideoPlay />
                            </el-icon>
                            <el-icon v-else class="rotate">
                                <Loading />
                            </el-icon>
                        </div>
                    </div>
                </div>
                <div class="sub-menu">
                    <el-icon class="hover">
                        <Close />
                    </el-icon>
                </div>
            </el-collapse-item>

        </el-collapse>
        <div class="menu">

            <div class="menu-item hover" @click="addOpen"> <el-icon>
                    <Plus />
                </el-icon></div>
            <div class="menu-item hover">
                <el-icon>
                    <Setting />
                </el-icon>
            </div>
        </div>
        <ProjectAddVue @register="addRegister" />
    </div>
</template>
<script setup>
import { getCurrentInstance, onMounted, ref } from 'vue'
import { Setting, Plus, VideoPlay, Van, Loading, Close } from '@element-plus/icons-vue';
import { useProject } from '@/stores/counter';
import ProjectAddVue from "@/components/Project/Add.vue"
import cache from '@/utils/cache';
import { handleProject, loadProjectTask, openFolder, openTerminal, openVscode } from '@/utils/index';
import { onProcess, startProcess } from '@/utils/process';

const { proxy } = getCurrentInstance();
const addInstance = ref(null)

const log = ref([
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
onMounted(() => {
    console.log('mounted', up.data)
    loadProjectTask(handleProject(cache.project.get())).then(res => {
        console.log("loadProject", res)
        projects.value = res
    })
    onProcess((data) => {
        log.value = (data)
    })
})
</script>
<style lang="scss" scoped>
.demo-collapse {
    padding-left: 12px;
    display: flex;
    height: 100%;
    flex-direction: column;
    position: relative;

    .menu {
        margin-top: auto;
        background-color: white;
        box-shadow: 0 -1px 1px 0 rgba(0, 0, 0, 0.1);
        position: sticky;
        bottom: 0;

        .menu-item {
            margin-bottom: 12px;
            text-align: center;
            transform: translateX(-12px);
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
        font-size: 1.4em;
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
.sub-menu{
    text-align: center;
}
</style>
