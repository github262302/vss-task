import { computed, reactive, ref, shallowRef } from 'vue'
import { defineStore } from 'pinia'
import cache from '@/utils/cache'
import { clone } from 'ramda';
export const useSettings = defineStore('process', () => {
    const settings = ref({})
    function update (all) {
        settings.value = all
    }
    function get () {
        return clone(settings.value)
    }
    const settingsValue = computed(() => clone(settings.value))
    return {
        update,
        get,
        settings,
        settingsValue
    }
})
