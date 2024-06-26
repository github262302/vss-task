// main

// electron 模块可以用来控制应用的生命周期和创建原生浏览窗口
import { app, BrowserView, BrowserWindow, Menu } from 'electron';
import { join, resolve } from 'path';
import { setting } from "vss/settings"

import "vss/ipc"
import { setMainWindow } from 'vss/process/index';
import { setMW } from 'vss/utils';
import { MainWindow } from 'vss/core/mainWindow';
import { createMenuTemplate } from './menu';
import { mainPath } from './renderPath';
import ese from 'electron-squirrel-startup';

const isPackaged = app.isPackaged
const basePath = app.getAppPath()
const iconPath = resolve(basePath, "images", "icon.png")
const preloadPath = join(basePath, "dist", "main", 'preload.cjs')
const createWindow = () => {
    // 创建浏览窗口
    const mainWindow = new BrowserWindow({
        width: 345,
        height: 485,
        webPreferences: {
            preload: preloadPath,
        },
        resizable: false,
        closable: true,
        icon: iconPath
    });

    const mw = new MainWindow("main", mainWindow)
    const menu = Menu.buildFromTemplate(createMenuTemplate())
    Menu.setApplicationMenu(menu);

    setMainWindow(mainWindow)
    setMW(mainWindow)

    // mw.mainWindow.minimize()
    // P.setMainWindow(mainWindow)
    // 加载 index.html
    if (!isPackaged) {
        mainWindow.webContents.openDevTools()
        mainWindow.loadURL(mainPath)
    }else{
        mainWindow.loadFile(mainPath)
    }
};


// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态,
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
function Main(){
    if(ese){
        app.quit();
        return;
    }
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
}
Main()
// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。
