### Instalacion Webpack

 -  https://webpack.js.org/guides/getting-started/
 -  En terminal >npm init -y
                >npm install webpack webpack-cli --save-dev 
 -  El --save-dev: lo ponga como una dependencia de desarrollo, 
    porque el webpack no va a ir a produccion, no va a ir al servidor
 -  Webpack instala lodash -> muy parecido al _underscore.js

 -  En package.json -> "scripts": { "build": "webpack"} 
    Cuando lanzo el comando build, dispara webpack en mi proyecto.
    En terminal >npm run build -> crea la carpeta 'dist' y archivo 'main.js' con mi codigo ofuscado 

 -  Enlazo en mi html: <script src="../dist/main.js"></script>

 -  Cada vez que hago un cambio en un archivo js -> >npm run build
    cada vez que ejecuto esto genera o actualiza la carpeta 'dist' y archivo 'main.js'

    ####

 -  Creo en la raiz un archivo webpack.config.js (se ejecuta cuando lanzo >npm run build)

 -  Instalar paquetes desde terminal >npm install --save-dev html-loader html-webpack-plugin
    para poder mover el archivo index.html en carpeta dist
    Defino mi archivo webpack.config.js

 -  Ejecuto >npm run build
    Voy a mi index.html y borro mi enlace <script src="../dist/main.js"></script>
    Ya lo ha creado el en dist/index.html

 -  Abrir en el navegador archivo dist/index.html

 -  En archivo webpack.config.js: options: {minimize: true,}
    Me va a minimizar mi codigo, sin tabulaciones, enters o comentarios -> mas rapido para subir mi archivo a produccion
    Por ahora lo dejo {minimize: false,} Para seguir trabajando en desarrollo
    
    Ejecuto >npm run build

    ####

 -  En terminal >npm install -D webpack-dev-server
    Paquete que simula un servidor de desarrollo
    Cambios automaticamente compilados y actualizados!

 -  En package.json -> "start": "webpack serve"
    ### En terminal >npm start (tambien se puede >npm run start).
    ### En navegador ir a http://localhost:8080/ 
    Puedo especificarle otro puerto -> "start": "webpack serve --port=4200"

    [Si da ERROR en terminal => Ejecuto >npm run build y actualizo navegador!]

    #### css

 -  creo carpeta css y archivo componentes.css
 -  Para aplicar y mover mi archivo css a dist
-  Borrar carpeta dist y Ejecuto >npm run build
    En archivo componentes.js -> import '../css/componentes.css'
    Configuracion de los archivos css -> rules: [{ test: /\.css$/, use: [ 'style-loader','css-loader' ] },

 -  Borrar carpeta dist y Ejecuto >npm run build
 -  En terminal >npm start
 -  Las modificaciones en css las carga y aplica instantaneamente

     #### 

 -  creo archivo styles.css (estilos generales)
 -  importo en index.js -> import './styles.css';
 -  Borrar carpeta dist y Ejecuto >npm run build
 -  Instalo >npm install -D mini-css-extract-plugin 
 -  En archivo webpack.config.js configuracion-> 
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    {test: /styles\.css$/, use: [ MiniCssExtractPlugin.loader, 'css-loader' ] },
    exclude: /styles\.css$/, 
    new MiniCssExtractPlugin({ filename: '[name].css', ignoreOrder: false })
    # en 'produccion' para prevenir el cache. Este Hash me va a ayudar a prevenir que el navegador mantenga estos archivos en el cache y solo los va a cambiar cuando sea necesario. En 'desarrollo' no lo voy a activar por ahora -> filename: '[name].[contentHash].css', OR '[name].[contenthash].css' OR '[name].[content].css',

 -  Borrar carpeta dist y Ejecuto >npm run build
    crea archivo main.css
 -  En terminal >npm start

      ####

 -  El css deberia estar minimizado si lo paso a 'produccion'
    webpack.config.js -> mode: 'production'
 -  Borrar carpeta dist y Ejecuto >npm run build
 -  En terminal >npm install -D optimize-css-assets-webpack-plugin
 -  En archivo webpack.config.js configuracion-> 
    const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin()]
    },

 -  Borrar carpeta dist y Ejecuto >npm run build
    main.css  esta minimizado   

      ####

 -  Volver a ponernos en modo 'desarrollo': webpack.config.js -> mode: 'development',

 -  Borrar carpeta dist y Ejecuto >npm run build
 -  En terminal >npm start

     #### Imagen

 -  creo carpeta assets, guardo imagen y creo img en html     
 -  En terminal >npm install -D file-loader
 -  En archivo webpack.config.js configuracion-> 

 -  En terminal >npm install copy-webpack-plugin --save-dev
 -  En archivo webpack.config.js configuracion-> 
    const CopyPlugin = require('copy-webpack-plugin');
    new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/' },
            ],
        }),

 -  Borrar carpeta dist y Ejecuto >npm run build
 -  En terminal >npm start
    
      #### Production mode

 -  Dos archivos separados uno para desarrollo y otro produccion -> 
    webpack.config.js y webpack.prod.js
 -  En archivo package.json -> 
    "build": "webpack --config webpack.prod.js", 
    "build:dev": "webpack --config webpack.config.js",
 -  En archivo webpack.prod.js ->
    filename: 'main.[contentHash].js', OR 'main.[contenthash].js' OR 'main.[content].js'
    filename: '[name].[contentHash].css', OR '[name].[contenthash].css' OR '[name].[content].css'

 -  En produccion >npm run build (crea carpeta dist)
 -  En caso de ir a desarrollo >npm run build:dev (crea nueva carpeta dist)

      #### Babel (version compatible para todos navegadores)

 -  Instalar >npm install --save-dev babel-loader @babel/core
 -  En archivo webpack.prod.js ->
     rules: {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
       ## minimizado     
 -  Creo archivo .babelrc
 -  En terminal instalar >npm install babel-preset-minify --save-dev
 -  En archivo .babelrc 
            { "presets": [ "minify" ] }
       ##### babel-minify-webpack-plugin = [Deprecated]!!
 -  En terminal instalar >npm install babel-minify-webpack-plugin --save-dev
 -  En archivo webpack.prod.js ->
    const MinifyPlugin = require("babel-minify-webpack-plugin");
    plugins: new MinifyPlugin()
       ##### ha sido cambiado por "terser-webpack-plugin"
 -  En terminal >npm uninstall -S -D babel-minify-webpack-plugin
 -  En archivo webpack.prod.js -> ELIMINAR
    const MinifyPlugin = require("babel-minify-webpack-plugin");
    plugins: new MinifyPlugin()

 -  En terminal instalar >npm install terser-webpack-plugin --save-dev
 -  En archivo webpack.prod.js ->
    const TerserPlugin = require('terser-webpack-plugin');

    module.exports = {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin({
            test: /\.js(\?.*)?$/i,
        })],
    },

       ## amplia la compatibilidad de mi aplicacion con todos los navegadores
 -  En terminal instalar >npm install --save-dev @babel/preset-env
 -  En archivo .babelrc
            {
            "presets": ["@babel/preset-env", "minify"]
         }

 -  En produccion >npm run build (crea nueva carpeta dist)
 -  En caso de ir a desarrollo >npm run build:dev (crea nueva carpeta dist)
 -  En terminal >npm start
 -  navegador = http://localhost:8080/

     #### Limpiando carpeta dist automaticamente
 -  En terminal instalar >npm install --save-dev clean-webpack-plugin
 -  En archivo webpack.config.js -> (Opcional)
 -  En archivo webpack.prod.js ->
    const { CleanWebpackPlugin } = require('clean-webpack-plugin');
    plugins: 
    new CleanWebpackPlugin(),

 -  En produccion >npm run build (crea nueva carpeta dist)
 -  En caso de ir a desarrollo >npm run build:dev (crea nueva carpeta dist)
 -  En terminal >npm start
 -  navegador = http://localhost:8080/

       #### GIT

 -  Crear archivo .gitignore
 -  En terminal >git init  (inicializa proyecto git)
 -  En terminal >git add . (crea punto de recuperacion)
 -  En terminal >git commit -m "Inicializacion Proyecto" (primer commit) 
 -  En terminal >git checkout -- . (recupero mi proyecto) 

      #### GitHub

 -  Crear repositorio en GitHub
 -  En terminal >git remote add origin https://github.com/MS2020-ms/webpack-starter.git
 -  En terminal >git branch -M main
 -  En terminal >git push -u origin main

 -  Creo archivo README.md
 -  Subirlo a GitHub:
    En terminal >git add . 
    En terminal >git commit -m "Redame creado " 
    En terminal >git push 

      #### GitHub Pages

-  Borrar carpeta dist y Ejecuto >npm run build (produccion)
-  https://github.com/MS2020-ms/webpack-starter/settings -> GitHub Pages 
