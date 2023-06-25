import { contextBridge, ipcRenderer } from 'electron';
const obs = []
let temp = "[]"
const utils = {
    openFolder (path) {
        return ipcRenderer.invoke("utils", { name: "openFolder", data: path })
    },
    openUrl (url) {

        return ipcRenderer.invoke("utils", { name: "openUrl", data: url })
    },
    message: (args) => {
        return ipcRenderer.invoke("utils", {
            name: "message",
            data: args
        })
    },
    loadProject: (list) => {
        return ipcRenderer.invoke("utils", {
            name: "loadProject",
            data: list
        })
    },
    chooseFolder: () => {
        return ipcRenderer.invoke("utils", {
            name: "chooseFolder",
            data: null
        })
    },
    startProcess: (data) => {
        return ipcRenderer.invoke("utils", {
            name: "startProcess",
            data: data
        })
    },
    onProcess: (fn) => {
        obs.push(fn)
        ipcRenderer.invoke("getProcessData").then(res => {
            console.log("getProcessData", res);
            fn(res)
        })
    },
    stopProcess (pid) {
        return ipcRenderer.invoke("utils", {
            name: "stopProcess",
            data: pid
        })
    },
    openTerminal (path) {
        return ipcRenderer.invoke("utils", {
            name: "openTerminal",
            data: path
        })
    },
    openVscode () {
        return ipcRenderer.invoke("utils", {
            name: "openVscode",
            data: null
        })
    }
}
contextBridge.exposeInMainWorld('electron_utils', utils);
contextBridge.exposeInMainWorld('electron_view', {
    close () {
        ipcRenderer.invoke("view", { name: "close", data: null })
    },
    minimize () {
        ipcRenderer.invoke("view", { name: "minimize", data: null })
    }
});

window.addEventListener('DOMContentLoaded', function () {
    ipcRenderer.on("process", (e, data) => {
        temp = JSON.stringify(data)
        obs.forEach(fn => fn(data))
    })
    ipcRenderer.on("message", (e, data) => {
        // this.VueApp.$message(data)
        console.log("message", this);

    })
});
