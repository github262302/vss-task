import { contextBridge, ipcRenderer } from 'electron';
const obs = []
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
        console.log("onProcess", obs.length);
    }
}
contextBridge.exposeInMainWorld('electron_utils', utils);

window.addEventListener('DOMContentLoaded', () => {
    utils.message("启动成功")
    ipcRenderer.on("process", (e, { type, data }) => {
        console.log("process", type, data);
        obs.forEach(fn => fn({ type, data }))
    })
});
