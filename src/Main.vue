<template>
    <el-tabs v-model="editableTabsValue" type="card" closable class="demo-tabs" @edit="handleTabsClose">
        <el-tab-pane v-for="item in log" :key="item.pid" :label="item.name" :name="item.pid">
            <template #label>
                <span class="custom-tabs-label">
                    <el-icon>
                        <Loading v-if="item.status == 'runing'" class="rotate" />
                        <Check v-else-if="item.status == 'close'" />
                        <MoreFilled v-else />
                    </el-icon>
                    <span>{{ item.name }}</span>
                </span>
            </template>

            <div id="terminal" v-xtrem="{ log, pid: item.pid }">

            </div>
            <h1>详细信息</h1>
            <div>
                进程Id: <span>{{ item.pid }}</span>
            </div>
            <div>
                任务名称: <span>{{ item.name }}</span>
            </div>
        </el-tab-pane>

        <el-empty description="暂无任务" v-if="log.length == 0">

        </el-empty>
    </el-tabs>
</template>
<script>
import { onProcess } from '@/utils/process';
import { Calendar, Check, Loading, MoreFilled } from '@element-plus/icons-vue';
import { Terminal } from 'xterm/lib/xterm.js';
import 'xterm/css/xterm.css';
import { computed, getCurrentInstance, onMounted, ref, shallowRef, watch } from 'vue';
import { stopProcess } from '@/utils/process';
import { WebLinksAddon } from 'xterm-addon-web-links';
const ters = {}
const isWrite = {}
export default {
    components: { Calendar, Loading, Check, MoreFilled },
    directives: {
        xtrem: {
            mounted (el, binding, vnode, oldVnode) {
                let { pid } = binding.value
                let terminal = new Terminal()
                terminal.loadAddon(new WebLinksAddon())
                terminal.open(el)
                ters[pid] = terminal
            },
            updated (el, binding) {
                let { log, pid } = binding.value
                if (!isWrite[pid]) {
                    return
                }
                isWrite[pid] = false
                let single = log.findIndex(item => item.pid == pid)
                if (single == -1) {
                    return
                }
                ters[pid].clear()
                setTimeout(() => {
                    log[single].log.map(e => {
                        if (ters[pid]) {
                            ters[pid].writeln(e)
                        }
                    })
                }, 100);
            }
        }
    },
    setup () {
        let tabIndex = 2
        const log = shallowRef([
        ])
        const { proxy } = getCurrentInstance();
        const editableTabsValue = ref('2')
        const formatLog = computed(() => {
            let t = log.value.join("\n")
            return hljs.highlight("shell", t).value
        })
        onMounted(() => {
            onProcess((data) => {
                let da = (JSON.parse(JSON.stringify(data)))
                da.map(e => {
                    if (e.log) {
                        isWrite[e.pid] = true
                    }
                })
                log.value = da
            })
            watch(log, (val) => {
                if (val.length == 1) {
                    editableTabsValue.value = val[0].pid
                }
            })
        })
        function handleTabsClose (pid) {
            if (log.value.some(item => (item.pid == pid && item.status == 'close'))) {
                stopProcess(pid)
                delete ters[pid]

            } else if (log.value.some(item => (item.pid == pid))) {
                proxy.$confirm(`是否关闭?进程 ${pid} 将被Kill!`, {
                    type: "warning",
                    title: "系统通知"
                }).then(() => {
                    stopProcess(pid)
                })
            }
        }
        return {
            tabIndex, editableTabsValue, formatLog, handleTabsClose, log
        }
    }
}
</script>
<style>
.demo-tabs {
    height: 100%;
    /* overflow: hidden; */
}

.demo-tabs>.el-tabs__content {
    padding: 32px;
    /* color: #6b778c; */
    /* font-size: 32px; */
    font-weight: 600;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;

}

.demo-tabs>.el-tabs__content .el-tab-pane {
    height: 100%;
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

#terminal {
    /* height: 100%; */
}
</style>
