export function startProcess (data) {
    window.electron_utils.startProcess(data)
}
export function stopProcess (pid) {
    window.electron_utils.stopProcess(pid)
}

export function onProcess (fn) {
    window.electron_utils.onProcess(fn)
}
