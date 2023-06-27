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
  const data = ref(JSON.parse(JSON.stringify(tempData)))
  function update (singleData) {
    data.value = singleData
    storage()
  }
  function add (d) {
    data.value.push(d)
    storage()
  }
  function remove (name) {
    let index = data.value.findIndex(item => item.name == name)
    if (index != -1) {
      data.value.splice(index, 1)
    }
    storage()
  }
  function storage () {
    cache.project.set(JSON.stringify(data.value))
  }
  return { data, update, add, remove }
})
