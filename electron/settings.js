import { Tray, nativeImage, Menu } from "electron";
import { join, dirname ,resolve} from 'path';
const __dirname = dirname(new URL(import.meta.url).pathname);
console.log("__dirname", join(__dirname,"img","icon.png"));
let tray = new Tray(nativeImage.createFromPath(resolve(__dirname,"img","icon.png")))
const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
])

tray.setContextMenu(contextMenu)
tray.setToolTip('This is my application')
tray.setTitle('This is my title')
