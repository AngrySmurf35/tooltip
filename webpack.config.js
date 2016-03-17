var path = require('path');

module.exports = {
    context: path.resolve(__dirname, "app/scripts"),
    entry: "./entry",
    output: {
        path: path.resolve(__dirname, "app/scripts"),
        file: "bundle.js"
    },

    resolve: {
        alias: {
            // define here dependencies to use in your project
            jquery: path.resolve(__dirname, "./bower_components/jquery/dist/jquery.js"),
            underscore: path.resolve(__dirname, "./bower_components/underscore/underscore.js"),
            backbone: path.resolve(__dirname, "./bower_components/backbone/backbone.js")
        }
    }
};