import indexVue from "./index.vue"
import { ElMessageBox } from "element-plus"
import { h } from "vue"

export function useSettings () {
    return {
        open () {
            ElMessageBox({
                title: '设置',
                message: h(indexVue),
                "showConfirmButton":false,
                "close-on-click-modal":false,
                draggable:true,
                customClass:"msg-box-700"
            })
        },
        save () { }
    }
}
