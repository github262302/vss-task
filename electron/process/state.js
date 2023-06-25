import { ipcMain } from "electron"
import { sendToUpdate } from "./index.js"

export const runing = []
export function post ({ pid, data }) {
    const type = data.type
    if (type === 'start') {
        runing.push({
            name: data.data.name,
            pid: pid,
            log: ["启动成功: " + data.data.name + "。pid:" + pid + "!"],
            status: "runing"
        })
    } else if (
        type == "close"
    ) {
        let index = runing.findIndex(item => item.pid === pid)
        if (index > -1) {
            runing[index].status = "close"
        }
    } else {
        let index = runing.findIndex(item => item.pid === pid)
        if (index > -1) {
            runing[index].log.push(data.data)
        }
    }
}
export function closeProcess (pid) {
    let index = runing.findIndex(item => item.pid === pid)
    if (index > -1) {
        runing.splice(index, 1)
    }
    sendToUpdate()
}
export function get () {
    return runing
}
ipcMain.handle("getProcessData", async () => {
    return get()
})
