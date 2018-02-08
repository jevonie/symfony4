var Encore = require('@symfony/webpack-encore');

Encore
    // the project directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // the public path used by the web server to access the previous directory
    .setPublicPath('/build')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    // uncomment to create hashed filenames (e.g. app.abc123.css)
    // .enableVersioning(Encore.isProduction())

    // uncomment to define the assets of the project
    // .addStyleEntry('datatable_style', './assets/DataTables/datatables.min.css')
    .addEntry('app', './assets/js/app.js')
    
    
    // uncomment if you use Sass/SCSS files
    .enableSassLoader(function(sassOptions) {}, {
         resolveUrlLoader: false
     })

    // uncomment for legacy applications that require $/jQuery as a global variable
    .autoProvidejQuery()

    // show OS notifications when builds finish/fail
    .enableBuildNotifications()

    // create hashed filenames (e.g. app.abc123.css)
    // .enableVersioning()

;
module.exports = Encore.getWebpackConfig();
