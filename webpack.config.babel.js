import webpack from 'webpack'
import path from 'path'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const getConfig = env => {
	env = env || {};

	const config = {
		entry: './src/js/index.js',
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: 'bundle.js',
		},
		devtool: 'source-map',
		watch: !env.production,
		module: {
			rules: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					options: {
						sourceMap: true,
					},
				},
				{
					test: /\.scss$/,
					loader: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: 'css-loader!sass-loader'
					})
				}
			]
		},
		plugins: [
			new ExtractTextPlugin('style.css', {
				allChunks: true,
			}),
		],
	};

	if (env.production) {
		config.plugins.push(
			new OptimizeCssAssetsPlugin(),
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: true,
			}),
		);
	}

	return config;
}

export default getConfig;
