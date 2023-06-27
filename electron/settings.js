import { Tray, nativeImage, Menu, app } from "electron";
import { join, dirname, resolve } from 'path';
const basePath=app.getAppPath()
console.log("__dirname", join(basePath, "images", "icon.png"));
let tray = new Tray(nativeImage.createFromPath(resolve(basePath, "images", "icon.png")))
const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
])

tray.setContextMenu(contextMenu)
tray.setToolTip('This is my application')
tray.setTitle('This is my title')
