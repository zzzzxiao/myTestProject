const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const extractStyle = new ExtractTextPlugin("css/style.css");
const extractCommon = new ExtractTextPlugin("css/common.css");

module.exports = {
    //多入口问题 数组的模式并不是多入口，以下入口最终只生成一个js
    // entry: [path.resolve(__dirname, 'src', 'index.js'),path.resolve(__dirname, 'src', 'base.js')],
    entry: {
        main: ["babel-polyfill","./src/index"],
        vendor: ["babel-polyfill","react", "react-dom", "react-router", "lodash"]
    }, // string | object | array
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, "build"),
        filename: "js/[hash].[name].js"
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                include: path.resolve(__dirname, "src"),
                exclude: path.resolve(__dirname, "node_modules"),
                loader: "babel-loader"
            }, {
                test: /.(css|scss)$/,
                include: path.join(__dirname, "node_modules"),
                use: extractStyle.extract([
                    // "style-loader",//将 JS 字符串生成为 style 节点
                    "css-loader", //将 CSS 转化成 CommonJS 模块
                    {
                        loader: "postcss-loader", //Loader for webpack to process CSS with PostCSS
                        options: {
                            plugins: () => [require("autoprefixer")]
                        }
                    },
                    "sass-loader" // 将 Sass 编译成 CSS
                ])
            },
            {
                test: /.(css|scss)$/,
                include: path.join(__dirname, "src"),
                use: extractCommon.extract([
                    // "style-loader",//将 JS 字符串生成为 style 节点
                    "css-loader", //将 CSS 转化成 CommonJS 模块
                    {
                        loader: "postcss-loader", //Loader for webpack to process CSS with PostCSS
                        options: {
                            plugins: () => [require("autoprefixer")]
                        }
                    },
                    "sass-loader" // 将 Sass 编译成 CSS
                ])
            },
            {
                test: /\.html$/,
                use: [
                    "htmllint-loader",
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: "url-loader",
                include: path.join(__dirname, "./src"),
                exclude: /node_modules/
            }
        ]
    },

    resolve: {
        // modules: ["node_modules", path.resolve(__dirname, "src")],
        extensions: [".js", ".json", ".jsx", ".css"],
        // 使用的扩展名
        // 取全局别名
        alias: {
            myHistory: path.resolve(__dirname, 'src/routes/history.js'),
            components: path.resolve(__dirname, 'src/components'),
            utils: path.resolve(__dirname, 'src/utils'),
            myStateLessComponent: path.resolve(__dirname, 'src/components/common/stateLessComponent/index.js')
        }
    },

    devtool: "source-map", // 通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试

    context: __dirname, // string（绝对路径！） webpack 的主目录  entry 和 module.rules.loader 选项 相对于此目录解析
    devServer: {
        contentBase: path.join(__dirname, "build"), // boolean | string | array, static file location
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        inline: false,
        hot: false, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: true, // only errors & warns on hot reload
        clientLogLevel: "none"
        // ...
    },

    plugins: [
        new webpack.ProvidePlugin({
            _: "lodash",
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            options: {
                context: __dirname
            }
        }),
        new HtmlWebpackPlugin({
            // 主页面入口index.html
            filename: "index.html",
            template: "./src/index.html",
            chunks: ['main', 'vendor'],
        }),
        new webpack.NamedModulesPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        extractStyle,
        extractCommon
    ],
    stats: "errors-only"
    // 附加插件列表

    /* 高级配置（点击展示） */
};
