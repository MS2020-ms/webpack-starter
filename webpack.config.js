//Toda la configuracion de desarrollo

const HtmlWebpack = require('html-webpack-plugin')
const MiniCssExtract = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

// mode:'development' para poder guardar comentarios y no ofuscar codigo.

module.exports = {

    mode: "development",

    output: {
        clean: true
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.css$/,
                exclude: /styles.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtract.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader'
            }
        ]
    },

    optimization: {},

    plugins: [
        new HtmlWebpack({
            title: 'Mi Webpack App',
            // filename: 'index.html',
            template: './src/index.html'
        }),

        new MiniCssExtract({
            //para en 'produccion' prevenir el cache. Este Hash me va a ayudar a prevenir que el navegador mantenga estos archivos en el cache y solo los va a cambiar cuando sea necesario. En 'desarrollo' no lo voy a activar por ahora
            //filename: '[name].[contentHash}.css',
            filename: '[name].css',
            //para que no nos sigan los warnings
            ignoreOrder: false
        }),

        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' }
            ]
        })
    ]
}

