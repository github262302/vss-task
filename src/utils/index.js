export * from "./process"
export function chooseFolder () {
    return window.electron_utils.chooseFolder()
}
export function loadProjectTask (data) {
    return window.electron_utils.loadProject(data)
}
export function winClose () {
    window.electron_view.close()
}
export function winMinimize () {
    window.electron_view.minimize()
}
export function openFolder (path) {
    window.electron_utils.openFolder(path)
}
export function openTerminal (path) {
    window.electron_utils.openTerminal(path)
}
export function openVscode () {
    window.electron_utils.openVscode()
}
export function handleProject (data) {
    if (data) {
        return JSON.parse(data)
    } else {
        []
    }
}
