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
    icon: '/images/icon'
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin','x64'],
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
