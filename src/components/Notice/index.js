import { reactive } from "vue";

export function useNotice () {
    const actions = reactive({
        open: null
    })
    function register (instanse) {
        actions.open = instanse.open
    }

    return [register, actions]
}
