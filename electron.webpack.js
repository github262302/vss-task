// Generated using webpack-cli https://github.com/webpack/webpack-cli

import { resolve as _resolve } from "path";
import webpack from "webpack";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const isProduction = process.env.NODE_ENV == "production";
/**
 *@type {webpack.Configuration}
 */
const config = {
    entry: {
        main: "./electron/main.js",
        preload: "./electron/preload.js",
    },
    output: {
        path: _resolve(__dirname, "deskdist"),
        clean: true,
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
    },
    target: "electron-main",
};

export default () => {
    if (isProduction) {
        config.mode = "production";
    } else {
        config.mode = "development";
    }
    return config;
};
