import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
export const useMessage = defineStore('message', () => {
    const message = ref([])
    const messageValue = computed(() => message.value)
    const add = function (data) {
        console.log("data:add", data);
        message.value.push(data)
    }
    const clean = function () {
        message.value = []
    }
    return { messageValue, message, add, clean }
})

