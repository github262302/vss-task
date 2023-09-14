// Generated using webpack-cli https://github.com/webpack/webpack-cli

const { resolve: _resolve } = require('path')
const webpack = require("webpack")
const { fileURLToPath } = require("url")
const { dirname } = require("path")

const isProduction = process.env.NODE_ENV == "production";
/**
 *@type {webpack.Configuration}
 */
const config = {
    entry: {
        main: _resolve("electron", "main.js"),
        preload: _resolve("electron", "preload.js"),
    },
    output: {
        path: _resolve(__dirname, "dist", "main"),
        filename: "[name].cjs"
    },
    plugins: [
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],

    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [".js", ".mjs"],
        alias: {
            vss: _resolve(__dirname, "electron"),
        },
    },
    target: "electron-main",
};
if (isProduction) {
    config.mode = "production";
} else {
    config.mode = "development";
}
module.exports = config
