import { computed, onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { clone } from 'ramda';
import { loadSettings } from '@/utils/settings';
import { loadImgs } from '@/utils/index';
import { animationToBody, bgToBody, uint8ToFile } from '@/utils/bg';
export const useSettings = defineStore('settings', () => {
    const settings = ref(clone(loadSettings()))
    const bgData = ref([])
    const animationData = ref([])
    function load () {
        settings.value = loadSettings()
    }
    function loadAnimation () {
        console.log("defineStore:settings:loadAnimation");
        if (!settings.value.animationCustom || !settings.value.animationPath) {
            return
        }
        loadImgs({
            path: settings.value.animationPath,
            suffix: settings.value.animationSuffix
        }).then(res => {
            if (res.length > 0) {
                animationData.value = res.map(e => uint8ToFile(e)).map(e => `url('${e}')`)
                animationToBody(bgData.value)
            }
        })
    }
    function loadBg () {
        console.log("defineStore:settings:loadBg");
        if (!settings.value.bgCustom || !settings.value.bgPath) {
            return
        }
        loadImgs({
            path: settings.value.bgPath,
            suffix: settings.value.bgSuffix
        }).then(res => {
            if (res.length > 0) {
                bgData.value = res.map(e => uint8ToFile(e))
                bgToBody(animationData.value)
            }
        })
    }
    const settingsValue = computed(() => settings.value)
    const animationDataValue = computed(() => animationData.value)
    const bgDataValue = computed(() => bgData.value)
    onMounted(loadBg)
    onMounted(loadAnimation)
    return {
        load,
        settings,
        settingsValue,
        animationDataValue,
        bgDataValue
    }
})
