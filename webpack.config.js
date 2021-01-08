//Toda la configuracion de desarrollo

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// mode:'development' para poder guardar comentarios y no ofuscar codigo. 

module.exports = {
    mode: 'development',
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin()]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    minimize: false,
                    attributes: false,
                },
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            //para en 'produccion' prevenir el cache. Este Hash me va a ayudar a prevenir que el navegador mantenga estos archivos en el cache y solo los va a cambiar cuando sea necesario. En 'desarrollo' no lo voy a activar por ahora
            //filename: '[name].[contentHash}.css',
            filename: '[name].css',
            //para que no nos sigan los guarnings
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/' },
            ],
        }),
        new CleanWebpackPlugin(),
    ]
};