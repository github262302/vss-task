import { ipcMain, shell, Notification, dialog, BrowserWindow, app } from "electron"
import { startProcess } from "vss/process/index"
import { spawn } from 'child_process';
import treeKill from "tree-kill";
import { loadAllProject } from "vss/core/task";
import { getMainWindow, mws , MainWindow } from "vss/core/mainWindow";
import { loadImgs } from "vss/utils";
import { join, resolve } from "path";
import { get } from "./process/state";
/**
 * @type {Record<string, any>}
 
 */
const utils = {
    /** 
     * @this {MainWindow}
     */
    openFolder(path) {
        shell.openPath(path)
    },
    /** 
     * @this {MainWindow}
     */
    openUrl(url) {
        shell.openExternal(url)
    },
    /** 
     * @this {MainWindow}
     */
    message(data) {
        new Notification({
            title: "系统通知！",
            body: data,
        }).show()
    },
    /** 
     * @this {MainWindow}
     */
    loadProject(list) {
        return loadAllProject(list)
    },
    /** 
     * @this {MainWindow}
     */
    chooseFolder() {
        return dialog.showOpenDialogSync({
            properties: ["openDirectory"],
        })
    },
    /**
     * @param {{command:string;name:string;path:string}} data
     * @this {MainWindow}
     */
    startProcess(data) {
        let common, args;
        if (data.type == 'shell') {
            let com = data.command.split(" ")
            let arg = data.command.split(" ")
            common = com[0]
            args = arg.slice(1)
        } else {
            common = "pnpm"
            args = data.command.split(" ")
        }
        let temp = {
            common: common,
            args: args,
            name: data.name,
            cwd: data.cwd,
        }
        startProcess.call(this, temp)
    },
    /** 
     * @this {MainWindow}
     */
    stopProcess(pid) {
        try {
            treeKill(pid, 'SIGKILL', err => {
                console.log("treeKill", err);
                if (err) {
                    this.sendToMessage({ content: "treeKill:" + JSON.stringify(err), title: "进程消息", type: "error" });
                }
            })
        } catch (error) {
            this.sendToMessage({ content: "进程已被kill", title: "进程消息", type: "error" });
        }
        this.closeProcess(pid)
    },
    /** 
     * @this {MainWindow}
     */
    openTerminal(path) {
        let s = spawn('powershell', ["start-process", "powershell", "-WorkingDirectory", path], {

        })
        s.on("exit", (err, sig) => {
            console.log("exit", err, sig, s.pid);
        })
        s.unref()
    },
    /** 
     * @this {MainWindow}
     */
    openVscode(path) {
        spawn('code', [path], {
            detached: true,
            shell: true,
        })
    },
    /** 
     * @this {MainWindow}
     */
    loadImgs({ path, suffix }) {
        return loadImgs(path, suffix)
    },
    /** 
     * @this {MainWindow}
     */
    openDev() {
        this.mainWindow.webContents.openDevTools()
    },
    /** 
     * @this {MainWindow}
     */
    addProject() {

    }
}

ipcMain.handle("utils", async (e, { name, data }) => {
    const main = getMainWindow()
    return utils[name].call(main, data)
})
ipcMain.handle("view", async (e, { name, data }) => {
    const main = getMainWindow()
    switch (name) {
        case "close":
            app.exit()
            break
        case "minimize":
            main.mainWindow.minimize()
            break
        case "reStart":
            main.mainWindow.reload()
            break
        default:
            break
    }
})
ipcMain.handle("getProcessData", async () => {
    return get()
})
