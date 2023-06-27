import { join, resolve } from "path"
import { readFileSync } from "fs"
import { BrowserWindow } from "electron";
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


const loadPackageJson = function (path) {
    try {
        const packageJsonPath = resolve(path, 'package.json')
        return JSON.parse(readFileSync(packageJsonPath))
    } catch (error) {
        return { scripts: {} }
    }
}
const loadTaskJson = function (path) {
    try {
        const packageJsonPath = resolve(path, ".vscode", 'tasks.json')
        return JSON.parse(readFileSync(packageJsonPath))
    } catch (error) {
        return { tasks: [] }
    }
}
const loadScripts = function (json) {
    const scripts = json.scripts
    const result = []
    for (const key in scripts) {
        result.push({
            name: key,
            command: scripts[key]
        })
    }
    return result
}
const loadTask = function (json) {
    const tasks = json.tasks
    const result = []
    for (const task of tasks) {
        if (task.type === "shell") {
            result.push(task)
        }
    }
    return result
}
export const loadProject = function (list) {
    const result = []
    for (const item of list) {
        const packageJson = loadPackageJson(item.path)
        const taskJson = loadTaskJson(item.path)
        const scripts = loadScripts(packageJson)
        const tasks = loadTask(taskJson)
        result.push({
            name: item.name,
            path: item.path,
            scripts,
            tasks
        })
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
