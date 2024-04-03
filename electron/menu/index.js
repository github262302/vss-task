import { BrowserWindow, Menu, app, shell } from 'electron';
import { join, resolve } from 'path';
import { getMainWindow } from 'vss/core/mainWindow';
import { openAddProject } from 'vss/utils';
function buildViewMenu() {
    return {
        label: 'View',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click: (item, focusedWindow) => {
                    if (focusedWindow) focusedWindow.reload();
                }
            },
            {
                label: 'Toggle Developer Tools',
                accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                click: (item, focusedWindow) => {
                    if (focusedWindow) focusedWindow.webContents.toggleDevTools();
                }
            }
        ]
    };
}
function buildFileMenu() {
    return {
        label: 'File',
        submenu: [
            { label: "add project", click: openAddProject},
        ]
    };
}
function buildHelpMenu() {
    return {
        label: 'Help',
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click: async () => {
                    await shell.openExternal('https://github.com/github262302')
                }
            }
        ]
    };
}
function buildWindowMenu() {
    return {
        label: 'Window',
        role: 'window',
        submenu: [
            { role: 'minimize' },
            { role: 'close' }
        ]
    };
}

export function createMenuTemplate() {
    return [
        buildFileMenu(),
        buildViewMenu(),
        buildWindowMenu(),
        buildHelpMenu()
    ]
} 