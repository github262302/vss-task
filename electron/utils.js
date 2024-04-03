import { join, resolve } from "path"
import { readFileSync, readdirSync } from "fs"
import { app, BrowserWindow, Menu } from "electron";
import { getMainWindow } from "./core/mainWindow";
/** 
 * @type {BrowserWindow}
 */
let mainWindow;
export function setMW (mw) {
    if (mw && mw.webContents) {
        mainWindow = mw
    } else {
        console.error('Attempted to set an invalid mainWindow')
    }
}
export const loadScripts = function (json) {
    const scripts = json.scripts || {}
    const result = []
    for (const key in scripts) {
        result.push({
            name: key,
            command: scripts[key]
        })
    }
    return result
}
export const loadTask = function (json) {
    const tasks = json.tasks || []
    const result = []
    for (const task of tasks) {
        if (task.type === "shell") {
            result.push(task)
        }
    }
    return result
}
export function deferPromise () {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    return { promise, resolve, reject };
}

export function setProgressBar (value = 2) {
    if (mainWindow) {
        mainWindow.setProgressBar(value)
    }

}
/** 
 * @param {string} path
 * @param {string} filePath
 */
export function loadFile (path, filePath) {
    try {
        const file = resolve(path, ...filePath.split("/"))
        return JSON.parse(readFileSync(file).toString())
    } catch (error) {
        return {}
    }
}
export function loadImgs (path, suffix) {
    const files = readdirSync(path);
    const result = []
    for (const file of files) {
        if (file.endsWith(suffix)) {
            // 读取文件
            let f = readFileSync(resolve(path, file))
            // push文件
            result.push(f)
        }
    }
    return result
}
export function openAddProject(){
    const basePath = app.getAppPath()
    const iconPath = resolve(basePath, "images", "icon.png")
    const preloadPath = join(basePath, "dist", "main", 'preload.cjs')
    const main = getMainWindow()
    const children = new BrowserWindow({
        width: 345,
        height: 310,
        icon: iconPath,
        title: "add new project",
        titleBarStyle: 'hiddenInset',
        resizable: false,
        webPreferences: {
            preload: preloadPath,
        },
        parent: main.mainWindow,

    });
    children.loadURL('http://localhost:5173/addproject/')
    children.once('ready-to-show', () => {
        children.setMenu(Menu.buildFromTemplate([]))
        children.show()
    })
}