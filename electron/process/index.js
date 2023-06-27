import { spawn } from "child_process";
import { post, get, runing } from "./state.js";
const EVENT_NAME_PROCESS = "process"

/** 
 * @type {BrowserWindow}
 */
let mainWindow;
/** @type {import("child_process").ChildProcessWithoutNullStreams} */
let count = 0
function sendToRenderer (data, pid) {
    console.log(count++);
    if (mainWindow) {
        post({ pid, data })
    }
}
export function sendToUpdate () {
    mainWindow.webContents.send(EVENT_NAME_PROCESS, get())
}
export function sendMsg (data) {
    if (mainWindow) {
        const EVENT_NAME_PROCESS = "message"
        mainWindow.webContents.send(EVENT_NAME_PROCESS, data)
    }
}
export function startProcess ({ common, args, cwd, name }) {
    if (runing.some(item => item.name === name)) {
        sendMsg({ type: "error", message: "进程已经运行!" })
        return
    }
    const child = spawn(common, args, {
        cwd: cwd || process.cwd(),
        shell: true,
        killSignal: "SIGKILL"
    })
    const pid = child.pid
    sendToRenderer({
        type: "start", data: {
            name: name,
        }
    }, pid)
    child.stdout.on('data', (data) => {
        sendToRenderer({ type: "stdout", data: Buffer.from(data).toString("utf8") }, pid)
    })
    child.stderr.on('data', (data) => {
        sendToRenderer({ type: "stderr", data: Buffer.from(data).toString("utf8") }, pid)
    })
    child.on('close', (code, signal) => {
        if (code === 0) {
            sendToRenderer({ type: "close", data: "进程退出!" + signal }, pid)
        } else {
            sendToRenderer({ type: "close", data: "进程异常!" + signal }, pid)
        }
    })
    child.on('exit', (code, signal) => {
        // child.stdout.destroy()
        sendToRenderer({ type: "stdout", data: `进程exit!code:${code};singal:${signal}` }, pid)
    })
    child.on('error', (err) => {
        sendToRenderer({ type: "error", data: "error:" + err.message }, pid)
    })
}
export function setMainWindow (mw) {
    if (mw && mw.webContents) {
        mainWindow = mw
    } else {
        console.error('Attempted to set an invalid mainWindow')
    }
}

