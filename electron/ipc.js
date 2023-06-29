import { ipcMain, shell, Notification, dialog } from "electron"
import { startProcess } from "./process/index.js"
import { closeProcess } from "./process/state.js"
import { spawn, spawnSync } from 'child_process';
import treeKill from "tree-kill";
import { loadAllProject } from "./core/task.js";
import { mws } from "./core/mainWindow.js";
import { loadImgs } from "./utils.js";

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
        return loadAllProject(list)
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
    stopProcess (pid) {
        try {
            treeKill(pid, 'SIGKILL', err => {
                console.log("treeKill", err);
                if (err) {
                    this.sendToMessage("treeKill:error" + JSON.stringify(err));
                }
            })
        } catch (error) {
            this.sendToMessage("error:进程已被kill");
        }
        this.closeProcess(pid)
    },
    openTerminal (path) {
        let s = spawn('powershell', ["start-process", "powershell", "-WorkingDirectory", path], {

        })
        s.on("exit", (err, sig) => {
            console.log("exit", err, sig, s.pid);
        })
        s.unref()
    },
    openVscode (path) {
        spawn('code', [path], {
            detached: true,
            shell: true,
        })
    },
    loadImgs({path, suffix}) {
        return loadImgs(path, suffix)
    },
    openDev(){
        this.mainWindow.webContents.openDevTools()
    }
}

ipcMain.handle("utils", async (e, { name, data }) => {
    return utils[name].call(mws['main'], data)
})
