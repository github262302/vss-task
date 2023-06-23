import { spawn } from "child_process";

let execStatus = false;
/** 
 * @type {BrowserWindow}
 */
let mainWindow;
/** @type {import("child_process").ChildProcessWithoutNullStreams} */
let runingProcess;
function sendToRenderer (data) {
    if (mainWindow) {
        const EVENT_NAME_PROCESS = "process"
        mainWindow.webContents.send(EVENT_NAME_PROCESS, data)
    }
}
export function stopProcess () {
    if (!execStatus) {
        sendToRenderer({ type: "stdout", data: "进程未运行!\n" })
        return
    }
    if (runingProcess.kill("SIGKILL")) {
        sendToRenderer({ type: "stdout", data: "进程手动停止成功!" })
    } else {
        sendToRenderer({ type: "stdout", data: "进程手动停止失败!" })

    }
}
export function startProcess ({ common, args, cwd }) {
    console.log(common, args, cwd,"zz");
    if (execStatus) {
        sendToRenderer({ type: "stderr", data: "进程运行中!" })
        return
    }
    execStatus = true
    const child = spawn(common, args, {
        cwd: cwd || process.cwd(), killSignal: "SIGKILL"
    })
    runingProcess = child;
    sendToRenderer({ type: "start", data: `任务启动:${common}` })
    child.stdout.on('data', (data) => {
        sendToRenderer({ type: "stdout", data: Buffer.from(data).toString() })
    })
    child.stderr.on('data', (data) => {
        sendToRenderer({ type: "stderr", data: Buffer.from(data).toString() })
    })
    child.on('close', (code, signal) => {
        execStatus = false
        if (code === 0) {
            sendToRenderer({ type: "close", data: "进程退出!" + signal })
        } else {
            sendToRenderer({ type: "error", data: "进程异常!" + signal })
        }
    })
    child.on('exit', (code, signal) => {
        child.stdout.destroy()
        execStatus = false
        sendToRenderer({ type: "close", data: `进程退出!code:${code};singal:${signal}` })
    })
    child.on('error', (err) => {
        execStatus = false
        sendToRenderer({ type: "error", data: "error:" + err.message })
    })
}
export function setMainWindow (mw) {
    if (mw && mw.webContents) {
        mainWindow = mw
    } else {
        console.error('Attempted to set an invalid mainWindow')
    }
}

