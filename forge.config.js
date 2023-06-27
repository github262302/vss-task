const path = require("path")
module.exports = {
  packagerConfig: {
    asar: {},
    ignore: [
      "node_modules",
      "out",
      ".vscode",
      "src",
      "public",
      "electron"
    ],
    icon: path.resolve(__dirname, 'images', 'icon')
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {
      },
    },
  ],
};
