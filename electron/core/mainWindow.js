import { post, get, runing } from "../process/state.js"

export const mws = {}
export class MainWindow {
    constructor(name, mainWindow) {
        this.name = name
        this.mainWindow = mainWindow
        mws[name] = this
    }
    sendToProcess (data, pid) {
        post({ data, pid })
        this.mainWindow.webContents.send("process", get())
    }
    sendToMessage (data) {
        this.mainWindow.webContents.send("message", data)
    }
    closeProcess (pid) {
        let index = runing.findIndex(item => (item.pid === pid && item.status === 'close'))
        if (index > -1) {
            runing.splice(index, 1)
        }
        this._updateProcess()
    }
    _updateProcess(){
        this.mainWindow.webContents.send("process", get())
    }
}
