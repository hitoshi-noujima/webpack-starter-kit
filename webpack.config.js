const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const MODE = process.env.NODE_ENV;
const enabledSourceMap = MODE === 'development';

const DIST_PATH = `${__dirname}/dist`;
const RESOURCES_PATH = `${__dirname}/src`;

module.exports = {
    mode: MODE,

    devtool: enabledSourceMap ? 'inline-source-map' : false,

    entry: {
        'index': `${RESOURCES_PATH}/js/index.js`,
    },

    output: {
        path: DIST_PATH,
        filename: 'js/[name].js',
    },

    module: {
        rules: [
            // Vue
            {
                test: /\.vue$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'vue-loader',
                    },
                    {
                        loader: 'eslint-loader',
                        options: {
                            fix: true,
                        },
                    },
                ]
            },
            // JavaScript
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns: 'usage',
                                        corejs: 3,
                                        modules: false
                                    }
                                ]
                            ]
                        }
                    },
                    {
                        loader: 'eslint-loader',
                        options: {
                            fix: true,
                        },
                    },
                ]
            },
            // Sass & SCSS & CSS
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            sourceMap: enabledSourceMap,
                            importLoaders: 2,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: enabledSourceMap,
                            postcssOptions: {
                                plugins: [
                                    ['autoprefixer', { grid: true }],
                                    // プロパティをソート
                                    ['css-declaration-sorter', { order: 'smacss' }],
                                    // メディアクエリをまとめる
                                    ['postcss-sort-media-queries', { sort: 'mobile-firstl' }],
                                ],
                            },
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: enabledSourceMap,
                            // Dart Sassの設定
                            implementation: require('sass'),
                            sassOptions: {
                                fiber: require('fibers'),
                            },
                        }
                    },
                ]
            },
            // image
            {
                test: /\.(gif|png|jpe?g)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './image',
                            publicPath: '../image',
                        }
                    }
                ]
            },
            // fonts
            {
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './fonts',
                            publicPath: '../fonts',
                        }
                    }
                ]
            },
        ],
    },

    watchOptions: {
        ignored: /(node_modules)/
    },

    resolve: {
        alias: {
            '@': RESOURCES_PATH,
            vue$: 'vue/dist/vue.esm.js',
        },
        extensions: [
            '*',
            '.js',
            '.vue',
            '.json',
            '.css',
            '.scss',
            '.sass'
        ],
    },

    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin({
            // watch モードを実行した際file-loaderで画像がコピーされないための対策で、画像は削除しないようにします。
            cleanStaleWebpackAssets: false,
            cleanOnceBeforeBuildPatterns: [
                '！*',
            ],
            cleanAfterEveryBuildPatterns: [
                'js/*',
                '!js/*.LICENSE.txt',
                'css/*',
                'fonts/*',
                'image/*',
            ],
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: `${RESOURCES_PATH}/image`,
                    to: 'image',
                    globOptions: {
                        ignore: ['.DS_Store'],
                    },
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
        })
    ],

    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: 'initial',
        },
    },

    target: ['web', 'es5'],
};