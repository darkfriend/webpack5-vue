// webpack.config.js
const paths = require('./paths')

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const envMode = process.env.NODE_ENV
const isDev = envMode==='development'

module.exports = {
    mode: envMode,
    devtool: isDev ? '#cheap-source-map' : '#source-map',
    entry: {
        main: '../src/index.js',
        polyfill: '@babel/polyfill',
    },
    output: {
        path: paths.build,
        filename: "js/[name].bundle.js",
        chunkFilename: "js/[name].[contenthash].chunk.js",
        publicPath: './',
        assetModuleFilename: 'images/[name][ext]?[hash]',
    },

    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true, importLoaders: 1 },
                    },
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } },
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            filename: 'index.html',
        }),
    ],

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js',
            '@': paths.src,
        },
        extensions: ['*', '.js', '.vue', '.json'],
    },

    stats: {
        children: false,
        chunks: false,
        chunkModules: false,
        modules: false,
        reasons: false,
    },
}