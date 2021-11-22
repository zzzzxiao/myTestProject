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
        port: 9999,
        disableHostCheck: true,
        hot:true,
        open: true,
        inline: true,// true: 代码更改，出发页面自动刷新
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'build'),
        proxy: { //代理
            '/api': {
              target: 'http://172.31.15.104:30648',
              pathRewrite: { '/api': '' }
            }
          }
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("development")
        })
    ]
});
