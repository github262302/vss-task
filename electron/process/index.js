import { exec, spawn } from "child_process";
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
        this.sendToMessage({ type: "error", content: "进程已经运行!", title: "进程消息" })
        return
    }
    const child = spawn(common, args, {
        cwd: cwd || process.cwd(),
        shell: true,
        killSignal: "SIGKILL",
        stdio: "pipe"
    })
    const pid = child.pid
    this.sendToProcess({
        type: "start", data: {
            name: name,
        }
    }, pid)
    child.stdout.on('data', (data) => {
        /** @type {string} */
        let str = data.toString()
        let strs = str.split('\n')
        strs.forEach(item => {
            let s = item.trim()
            if (!!s) {
                this.sendToProcess({ type: "stdout", data: s }, pid)
            }

        })
        // this.sendToProcess({ type: "stdout", data: data.toString()}, pid)
    })
    child.stderr.on('data', (data) => {

        this.sendToProcess({ type: "stderr", data: data.toString().trim() }, pid)
    })
    child.on('close', (code, signal) => {
        if (code === 0) {
            this.sendToProcess({ type: "close", data: "进程退出!" + signal }, pid)
        } else {
            this.sendToProcess({ type: "close", data: "进程异常!" + signal }, pid)
        }
    })
    child.on('exit', (code, signal) => {
        // child.stdout.destroy()
        this.sendToProcess({ type: "stdout", data: `进程exit!code:${code};singal:${signal}` }, pid)
    })
    child.on('error', (err) => {
        this.sendToProcess({ type: "error", data: "error:" + err.message }, pid)
    })
}
/**
 * 
 * common yarn args start 
 */
export function startProcessOutSide ({ common, args, cwd }) {
    const argsStr = args.join(" ")
    let s = spawn('powershell', ["start-process", "powershell", "-WorkingDirectory", cwd ,"-ArgumentList",`"-NoExit","-Command","${common} ${argsStr}"`], {

    })
    s.on("exit", (err, sig) => {
        console.log("exit", err, sig, s.pid);
    })
    s.unref()
}
export function setMainWindow (mw) {
    if (mw && mw.webContents) {
        mainWindow = mw
    } else {
        console.error('Attempted to set an invalid mainWindow')
    }
}

