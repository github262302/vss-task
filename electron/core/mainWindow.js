import { post, get, runing } from "vss/process/state"

/** 
 * @type {Record<string, MainWindow>}
 */
export const mws = {}
export class MainWindow {
    /** @type {import("electron").BrowserWindow} */
    mainWindow;
    /**
     * 
     * @param {string} name 
     * @param {import("electron").BrowserWindow} mainWindow 
     */
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
export function getMainWindow(name) {
    const _name = name || "main"
    return mws[_name]
}