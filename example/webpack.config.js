var path = require('path');

module.exports = {
	entry: [
		'webpack/hot/dev-server',
		'webpack-dev-server/client?http://localhost:8081',
		path.resolve(__dirname, 'example.js')
	],

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
	output: {
		path: path.resolve(__dirname, '.'),
		filename: 'bundle.js'
	}
};
