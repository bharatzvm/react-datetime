var webpack = require('webpack');

var plugins = [
    new webpack.DefinePlugin({
            'process.env': { NODE_ENV: '"production"'}
    })
    ];

    module.exports = {

        entry: ['./DateTime.js'],

        output: {
            path: __dirname + '/dist/',
            library: 'Datetime',
            libraryTarget: 'umd'
        },

        resolve: {
            extensions: ['', '.js']
        },

        externals: {
            'react': 'React',
            'react-dom': 'ReactDOM',
            'moment': 'moment'
        },

        module: {
            loaders: [{
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015', 'react', 'stage-2'],
                        plugins: [
                            'add-module-exports'
                ]
                    }
            }]
        },

        plugins: plugins
    };
