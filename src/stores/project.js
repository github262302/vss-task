import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { loadProjectTask } from '@/utils/index'
import { useProjectStorage } from '@/utils/project'
const ups = new useProjectStorage()

export const useProject = defineStore('project', () => {

  const project = ref([])


  const projectValue = computed(() => project.value)
  const load = function () {
    loadProjectTask(ups.load()).then(res => {
      project.value = res
    })
  }
  return { projectValue, project, load }
})
