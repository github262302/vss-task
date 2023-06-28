
const mw = {}
export function setMW (name, window) {
    mw[name] = window
}
export function getMW (name) {
    return mw[name]
}
export function sendToUpdate (name) {
    if (mw[name]) {
        mw[name].webContents.send("update")
    }
}
