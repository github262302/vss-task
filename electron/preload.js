import { contextBridge, ipcRenderer } from 'electron';
const obs = []
const msgObs = []
let temp = "[]"
const utils = {
    openFolder(path) {
        return ipcRenderer.invoke("utils", { name: "openFolder", data: path })
    },
    openUrl(url) {

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
    onMessage: (fn) => {
        msgObs.push(fn)
    },
    stopProcess(pid) {
        return ipcRenderer.invoke("utils", {
            name: "stopProcess",
            data: pid
        })
    },
    openTerminal(path) {
        return ipcRenderer.invoke("utils", {
            name: "openTerminal",
            data: path
        })
    },
    openVscode(path) {
        return ipcRenderer.invoke("utils", {
            name: "openVscode",
            data: path || null
        })
    },
    loadImgs(data) {
        return ipcRenderer.invoke("utils", {
            name: "loadImgs",
            data: data
        })
    },
    openDev() {
        return ipcRenderer.invoke("utils", {
            name: "openDev",
            data: null
        })
    },
    openAddProject() {
        return ipcRenderer.invoke("utils", {
            name: "openAddProject",
            data: null
        })
    },
    closeAddProject() {
        return ipcRenderer.invoke("utils", {
            name: "closeAddProject",
            data: null
        })
    },
    reloadMainWindow() {
        return ipcRenderer.invoke("utils", {
            name: "reloadMainWindow",
            data: null
        })
    },
    startProcessOutSide(data) {
        return ipcRenderer.invoke("utils", {
            name: "startProcessOutSide",
            data: data
        })
    }
}
contextBridge.exposeInMainWorld('electron_utils', utils);
contextBridge.exposeInMainWorld('electron_view', {
    close() {
        ipcRenderer.invoke("view", { name: "close", data: null })
    },
    minimize() {
        ipcRenderer.invoke("view", { name: "minimize", data: null })
    },
    reStart() {
        ipcRenderer.invoke("view", { name: "reStart", data: null })
    }
});

window.addEventListener('DOMContentLoaded', function () {
    ipcRenderer.on("process", (e, data) => {
        console.log("process", data);
        temp = JSON.stringify(data)
        obs.forEach(fn => fn(data))
    })
    ipcRenderer.on("message", (e, data) => {
        console.log("message", data);
        msgObs.forEach(fn => fn(data))
    })
});
