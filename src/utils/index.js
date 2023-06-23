export function chooseFolder () {
    return window.electron_utils.chooseFolder()
}
export function loadProjectTask (data) {
    return window.electron_utils.loadProject(data)
}
export function handleProject (data) {
    if (data) {
        return JSON.parse(data)
    } else {
        []
    }
}
