import { ipcMain } from "electron"
import { setProgressBar } from "vss/utils"

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
    } else if (type === "close") {
        let index = runing.findIndex(item => item.pid === pid)
        if (index > -1) {
            runing[index].log.push(data.data)
            runing[index].status = "close"
        }
    } else {
        let index = runing.findIndex(item => item.pid === pid)
        if (index > -1) {
            runing[index].log.push(data.data)
        }
    }
    if (runing.some(e => e.status === "runing")) {
        setProgressBar(2)
    } else {
        setProgressBar(-1)

    }
}
export function closeProcess (pid) {
    let index = runing.findIndex(item => (item.pid === pid && item.status === 'close'))
    if (index > -1) {
        runing.splice(index, 1)
    }
}
export function get () {
    return JSON.parse(JSON.stringify(runing))
}
ipcMain.handle("getProcessData", async () => {
    return get()
})
