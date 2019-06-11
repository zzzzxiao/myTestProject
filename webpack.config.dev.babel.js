const basicConfig = require("./webpack.config.base");
const path =  require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");

module.exports = webpackMerge(basicConfig, {
    mode: "development", // "production" | "development" | "none"
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        // host: '0.0.0.0',
        host: 'localhost',
        port: 8099,
        disableHostCheck: true,
        // hot:true,
        inline: true,// true: 代码更改，出发页面自动刷新
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'build')
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("development")
        })
    ]
});
