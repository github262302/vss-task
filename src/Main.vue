<template>
    <el-tabs v-model="editableTabsValue" type="card" closable class="demo-tabs" @edit="handleTabsClose">
        <el-tab-pane v-for="item in editableTabs" :key="item.pid" :label="item.title" :name="item.name">
            <template #label>
                <span class="custom-tabs-label">
                    <el-icon>
                        <Loading v-if="item.status == 'runing'" class="rotate" />
                        <Check v-else-if="item.status == 'close'" />
                        <MoreFilled v-else />
                    </el-icon>
                    <span>{{ item.title }}</span>
                </span>
            </template>
            <div>
                <div id="terminal" v-xtrem="{ log, pid: item.name }">

                </div>
            </div>

        </el-tab-pane>

        <el-empty description="暂无任务" v-if="editableTabs.length == 0">

        </el-empty>
    </el-tabs>
</template>
<script>
import { onProcess } from '@/utils/process';
import { Calendar, Check, Loading, MoreFilled } from '@element-plus/icons-vue';
import { Terminal } from 'xterm/lib/xterm.js';
import 'xterm/css/xterm.css';
// import plaintext from 'highlight.js/lib/languages/plaintext';
// import 'highlight.js/styles/default.css';
// import 'highlight.js/styles/github.css';
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import { stopProcess } from '@/utils/process';
// hljs.registerLanguage('plaintext', plaintext);
const ters = {}
export default {
    components: { Calendar, Loading, Check, MoreFilled },
    directives: {
        xtrem: {
            mounted (el, binding, vnode, oldVnode) {
                let { log, pid } = binding.value
                let terminal = new Terminal()
                terminal.open(el)
                ters[pid] = terminal
                let s = log.find(item => item.pid == pid)
                let t = s.log.join("\n")
                terminal.write(t)
            },
            updated (el, binding) {
                let { log, pid } = binding.value
                let s = log.find(item => item.pid == pid)
                let t = s.log.join("\n")
                if (ters[pid]) {
                    ters[pid].write(t)
                }
            }
        }
    },
    setup () {
        let tabIndex = 2
        const log = ref([
        ])
        const { proxy } = getCurrentInstance();
        const editableTabsValue = ref('2')
        const editableTabs = computed(() => {
            return log.value.map((item, index, arr) => {
                if (arr.length == 1) {
                    editableTabsValue.value = arr[0].pid
                }
                return {
                    title: item.name,
                    name: item.pid,
                    status: item.status,
                    pid: item.pid
                }
            })
        })

        const formatLog = computed(() => {
            let t = log.value.join("\n")
            return hljs.highlight("shell", t).value
        })
        onMounted(() => {
            onProcess((data) => {
                log.value = (data)
            })
        })
        function handleTabsClose (pid) {
            console.log("pid", log.value, pid);
            if (log.value.some(item => (item.pid == pid && item.status == 'close'))) {
                stopProcess(pid)
                delete ters[pid]

            } else if (log.value.some(item => (item.pid == pid))) {
                proxy.$confirm(`是否关闭?进程${pid}将被停止!`, {
                    type: "warning",
                    title: "系统通知"
                }).then(() => {
                    stopProcess(pid)
                    delete ters[pid]
                })
            }
        }

        return {
            tabIndex, editableTabsValue, editableTabs, formatLog, handleTabsClose, log
        }
    }
}
</script>
<!-- 
<script lang="ts" setup>

import { ref } from 'vue'
import type { TabPaneName } from 'element-plus'



const handleTabsEdit = (
    targetName: TabPaneName | undefined,
    action: 'remove' | 'add'
) => {
    if (action === 'add') {
        const newTabName = `${++tabIndex}`
        editableTabs.value.push({
            title: 'New Tab',
            name: newTabName,
            content: 'New Tab content',
        })
        editableTabsValue.value = newTabName
    } else if (action === 'remove') {
        const tabs = editableTabs.value
        let activeName = editableTabsValue.value
        if (activeName === targetName) {
            tabs.forEach((tab, index) => {
                if (tab.name === targetName) {
                    const nextTab = tabs[index + 1] || tabs[index - 1]
                    if (nextTab) {
                        activeName = nextTab.name
                    }
                }
            })
        }

        editableTabsValue.value = activeName
        editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
    }
}
</script> -->
<style>
.demo-tabs {
    height: 100%;
    /* overflow: hidden; */
}

.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
}

.rotate {
    animation: rotate 2s linear infinite;
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(359deg);
    }
}

.custom-tabs-label {
    display: flex;
    align-items: center;
    gap: 4px;
}
</style>
