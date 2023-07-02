import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { clone } from 'ramda';
export const useProcess = defineStore('process', () => {
    const process = ref([])
    function update (allData) {
        process.value = allData
    }
    function get () {
        return clone(process.value)
    }
    const processValue = computed(() => clone(process.value))
    return {
        update,
        get,
        process,
        processValue
    }
})
export function updateProcess (allData) {
    console.log("pinia:updateProcess", allData);
    useProcess().update(clone(allData))
}
