import { Tray, nativeImage, Menu, app } from "electron";
import { resolve } from 'path';
export function setting () {
    const basePath = app.getAppPath()
    let tray = new Tray(nativeImage.createFromPath(resolve(basePath, "images", "icon.png")))
    const contextMenu = Menu.buildFromTemplate([
        { label: 'quit', type: 'normal',click:()=>{app.quit()} },
    ])

    tray.setContextMenu(contextMenu)
    tray.setToolTip('Vss-Task')
    tray.setTitle('Vss-Task')
}
