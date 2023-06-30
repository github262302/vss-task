import { loadScripts, loadTask, loadFile } from "vss/utils";

const Task = [
    { name: "vscode任务", path: "./.vscode/tasks.json", load: loadTask, key: "tasks" },
    { name: "npm 任务", path: "./package.json", load: loadScripts, key: "scripts" }
]

export function extendTask (obj) {
    let newObj = Object.assign({}, obj)
    Task.push(newObj)
}
export function loadProject (project) {
    const result = {
        name: project.name,
        path: project.path,
    }
    for (const item of Task) {
        const json = loadFile(project.path, item.path)
        const list = item.load(json)
        result[item.key] = list
    }
    return result
}
export function loadAllProject (list) {
    const result = []
    for (const item of list) {
        result.push(loadProject(item))
    }
    return result
}
