const paths = require('./paths')
const { merge } = require('webpack-merge')
const common = require('./webpack.config.common.js')
const webpack = require('webpack')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    output: {
        path: paths.build,
        filename: "js/[name].bundle.js",
        chunkFilename: "js/[name].[contenthash].chunk.js",
        publicPath: './',
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: false,
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    optimization: {
        // chunkIds: 'named',
        minimize: true,
        minimizer: [
            new OptimizeCssAssetsPlugin({}),
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    ecma: 6,
                    ie8: false,
                    compress: {
                        passes: 2,
                        drop_console: true,
                        warnings: false,
                    },
                    output: {
                        comments: false,
                    },
                },
                extractComments: false,
            })
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/styles.css',
            chunkFilename: 'styles/[name].[contenthash].css',
        }),

        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
})