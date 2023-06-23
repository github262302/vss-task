<template>
    <el-tabs v-model="editableTabsValue" type="card" editable class="demo-tabs" @edit="handleTabsEdit">
        <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
            <div>
                <pre><code v-html="formatLog"></code></pre>
            </div>

        </el-tab-pane>
        <el-empty description="暂无任务" v-if="editableTabs.length == 0">

        </el-empty>
    </el-tabs>
</template>
<script>
import cache from '@/utils/cache';
import { onProcess } from '@/utils/process';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/shell';
import 'highlight.js/styles/default.css';
import { computed, onMounted, ref } from 'vue';
hljs.registerLanguage('shell', javascript);
export default {
    // directives: {
    //     highlightjs: {
    //         mounted (el) {
    //             hljs.highlightBlock(el);
    //         }
    //     }
    // },
    setup () {
        let tabIndex = 2
        const log = ref(new Array(50).fill("1"))
        const editableTabsValue = ref('2')
        const editableTabs = ref([
            {
                title: 'Tab 1',
                name: '1',
                content: 'Tab 1 content',
            },
            {
                title: 'Tab 2',
                name: '2',
                content: 'Tab 2 content',
            },
        ])
        const formatLog = computed(() => {
            let t = log.value.join("\n")
            return hljs.highlight("shell", t).value
        })
        onMounted(() => {
            onProcess(({ type, data }) => {
                log.value.push(data)
            })
        })
        return {
            tabIndex, editableTabsValue, editableTabs, formatLog
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
</style>
