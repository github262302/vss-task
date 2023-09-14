// 启动 vite renderer
// 启动 vite main
const vite = require("vite")
const webpack = require("webpack")
const { say } = require('cfonts')
const { spawn } = require("child_process")
const webpackConfig = require("../electron.webpack.cjs")
// console.log(process.env)
// console.log("first",process.cwd())
async function runRenderer () {
    const server = await vite.createServer({
    })
    await server.listen(5173)
    server.printUrls()
}
// 启动 webpack main
async function runMain () {
    // webpack
    const compiler = webpack(webpackConfig, (err, stats) => { // [Stats Object](#stats-object)
        if (err || stats.hasErrors()) {
            // [在这里处理错误](#error-handling)
        }
        const watching = compiler.watch({
            // [watchOptions](/configuration/watch/#watchoptions) 示例
            aggregateTimeout: 500,
            poll: undefined
        }, (err, stats) => { // [Stats Object](#stats-object)
            if (err || stats.hasErrors()) {
                // [在这里处理错误](#error-handling)
                console.error(stats.toString({
                    // 增加控制台颜色开关
                    colors: true,
                }))
            } else {

                console.log(stats.toString({
                    // 增加控制台颜色开关
                    colors: true,
                }))
            }
        });
        // 处理完成
    });
}
// 启动 electron-forge start
async function runElectron () {
    // spawn electron-forge start
    const child = spawn("powershell", ["pnpm","electron-forge", "start"])
}
async function runInit () {
    say("VSS-Task", {
        colors: ['yellow'],
        font: 'simple3d',
        space: false
      })
    Promise.all([
        runRenderer(), runMain(), runElectron()
    ])
}
runInit()
