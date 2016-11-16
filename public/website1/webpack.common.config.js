var ProvidePlugin = require('webpack').ProvidePlugin;
var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
module.exports = {
    entry: [
        './app/routes.js'
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel'
        }, 
		{
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
        }, {
            test: /\.html$/,
            loader: 'file?name=[name].[ext]'
        }, {
            test: /\.(jpe?g|png|gif)$/,
            exclude: /(node_modules)/,
            loader: 'url-loader?limit=10000'
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }]
    },
    postcss: function() {
        return [autoprefixer];
    },
    plugins: [
	new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
	 new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    }),
        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            "window.jQuery": 'jquery',
            "windows.jQuery": 'jquery',
        })
    ],
    resolve: {
        extensions: ['', '.js', '.css'],
        alias: {
            "scrollTo": path.resolve(
                __dirname,
                "node_modules/jquery.scrollto/jquery.scrollTo.min"
            ),
            "waypoints": path.resolve(
                __dirname,
                "node_modules/waypoints/lib/jquery.waypoints.min"
            ),
        }
    }
};
