const basicConfig = require("./webpack.config.base");
const path = require("path");
const webpackMerge = require("webpack-merge");
const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
module.exports = webpackMerge(basicConfig, {
    mode: "production", // "production" | "development" | "none"
    plugins: [
        new UglifyJSPlugin({
            cache: true
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        })
    ]
});
