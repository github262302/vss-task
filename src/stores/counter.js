import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import cache from '@/utils/cache'

export const useProject = defineStore('project', () => {
  let d = cache.project.get()
  let tempData = []
  if (!d) {
    tempData = []
  } else {
    tempData = JSON.parse(d)
  }
  const data = ref(tempData)
  function update (singleData) {
    data.value = singleData
    storage()
  }
  function add (d) {
    data.value.push(d)
    storage()
  }
  function remove (d) {
    data.value.splice(data.value.indexOf(d), 1)
    storage()
  }
  function storage () {
    localStorage.setItem('project', JSON.stringify(data.value))
  }
  // watch(data, update)
  // watch(() => data, storage)
  return { data, update, add, remove }
})
