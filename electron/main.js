// main.js

// electron 模块可以用来控制应用的生命周期和创建原生浏览窗口
import { app, BrowserWindow, ipcMain } from 'electron';
import { join, resolve } from 'path';
import { setting } from "./settings.js"

import "./ipc.js"
import { setMainWindow } from './process/index.js';
import { setMW } from './utils.js';
const isPackaged = app.isPackaged
const basePath = app.getAppPath()
const iconPath = resolve(basePath, "images", "icon.png")
const preloadPath = join(basePath, "deskdist", 'preload.cjs')
// const settingsPath = "./electron_settings_js.cjs"
const htmlPath = join(basePath, "dist", 'index.html')
const createWindow = () => {
    // 创建浏览窗口
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: preloadPath,
        },
        resizable: false,
        closable: true,
        titleBarStyle: 'hidden',
        icon: iconPath
    });
    setMainWindow(mainWindow)
    setMW(mainWindow)
    ipcMain.handle("view", async (e, { name, data }) => {
        switch (name) {
            case "close":
                app.exit()
                break
            case "minimize":
                mainWindow.minimize()
                break
            default:
                break
        }
    })
    // P.setMainWindow(mainWindow)
    // 加载 index.html
    if (!isPackaged) {
        mainWindow.loadURL('http://localhost:5173/')
        mainWindow.webContents.openDevTools()

    } else {
        mainWindow.loadFile(htmlPath)

    }
};

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
    createWindow();
    setting()
    app.on('activate', () => {
        // 在 macOS 系统内, 如果没有已开启的应用窗口
        // 点击托盘图标时通常会重新创建一个新窗口
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态,
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。
