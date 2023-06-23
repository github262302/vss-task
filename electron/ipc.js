import { ipcMain, shell, Notification, dialog } from "electron"
import { loadProject } from "./utils.js"
import { startProcess } from "./process/index.js"


const utils = {
    openFolder (path) {
        shell.openPath(path)
    },
    openUrl (url) {
        shell.openExternal(url)
    },
    message (data) {
        new Notification({
            title: "系统通知！",
            body: data,
        }).show()
    },
    loadProject (list) {
        return loadProject(list)
    },
    chooseFolder () {
        return dialog.showOpenDialogSync({
            properties: ["openDirectory"],
        })
    },
    /**
     * @param {{command:string;name:string;path:string}} data
     */
    startProcess (data) {
        let temp = {
            common: "powershell",
            args: [data.type == 'shell' ? '' : 'pnpm', ...data.command.split(" ")],
            name: data.name,
            cwd: data.cwd,
        }
        startProcess(temp)
    }
}

ipcMain.handle("utils", async (e, { name, data }) => {
    return utils[name](data)
})
