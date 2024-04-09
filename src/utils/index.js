export * from "./process"
export function chooseFolder() {
    return window.electron_utils.chooseFolder()
}
export function loadProjectTask(data) {
    return window.electron_utils.loadProject(data)
}
export function winClose() {
    window.electron_view.close()
}
export function winMinimize() {
    window.electron_view.minimize()
}
export function openFolder(path) {
    window.electron_utils.openFolder(path)
}
export function openTerminal(path) {
    window.electron_utils.openTerminal(path)
}
export function openVscode(path) {
    window.electron_utils.openVscode(path || null)
}
export function onMessage(fn) {
    window.electron_utils.onMessage(fn)
}
export function reStart() {
    window.electron_view.reStart()
}
export function openAddProject() {
    window.electron_utils.openAddProject()
}
export function openDevTools() {
    window.electron_utils.openDevTools()
}
export function closeAddProject() {
    window.electron_utils.closeAddProject()
}
export function reloadMainWindow() {
    window.electron_utils.reloadMainWindow()
}
/**
 * 
 * @param {startProcessOutSideParams} data 
 */
export function startProcessOutSide(data) {
    console.log("electron_utils before", data);
    window.electron_utils.startProcessOutSide(data)
}
/**
 * @type {Electron_Utils}
 */
export const utils = {
    chooseFolder,
    loadProject: loadProjectTask,
    openFolder,
    openTerminal,
    openVscode,
    onMessage,
    openAddProject,
    loadImgs,
    openDev,
    openDevTools,
    closeAddProject,
    reloadMainWindow,
    startProcessOutSide
}

/** 
 * @param {{path:string;suffix:string}} data
*/
export function loadImgs(data) {
    return window.electron_utils.loadImgs(data)
}
export function handleProject(data) {
    if (data) {
        return JSON.parse(data)
    } else {
        []
    }
}
export function openDev() {
    window.electron_utils.openDev()
}
