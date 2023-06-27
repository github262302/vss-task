import { Tray, nativeImage, Menu, app } from "electron";
import { resolve } from 'path';
export function setting () {
    const basePath = app.getAppPath()
    let tray = new Tray(nativeImage.createFromPath(resolve(basePath, "images", "icon.png")))
    const contextMenu = Menu.buildFromTemplate([
        { label: '最小化', type: 'radio' },
        { label: 'Item2', type: 'radio' },
        { label: 'Item3', type: 'radio', checked: true },
        { label: '退出', type: 'radio' }
    ])

    tray.setContextMenu(contextMenu)
    tray.setToolTip('This is my application')
    tray.setTitle('This is my title')
}
