import { ipcMain, shell, Notification, dialog } from "electron"
import { loadProject } from "./utils.js"
import { startProcess } from "./process/index.js"
import { closeProcess } from "./process/state.js"
import { spawn, spawnSync } from 'child_process';
import treeKill from "tree-kill";


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
        startProcess(temp)
    },
    stopProcess (pid) {
        try {
            treeKill(pid, 'SIGKILL', err => {
                console.log("treeKill", err);
            })
        } catch (error) {
            console.log("error:进程已被kill");
        }
        closeProcess(pid)
    },
    openTerminal (path) {
        let s=spawn('powershell', ["start-process","powershell", "-WorkingDirectory", path], {
        
        })
        s.on("exit",(err,sig)=>{
            console.log("exit",err,sig,s.pid);
        })
        s.unref()
    },
    openVscode () {
        spawn('code', [], {
            detached: true,
            shell: true,
        })
    }
}

ipcMain.handle("utils", async (e, { name, data }) => {
    return utils[name](data)
})
