const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var path = require('path');

module.exports = {
	entry: {
		index: './src/js/index.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader', //使用 babel-loader 來編譯 .js
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.vue'],
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				common: {
					test: /[\\/]node_modules[\\/]/,
					name: 'common',
					chunks: 'initial',
					priority: 2,
					minChunks: 2,
				},
			},
		},
	},
	plugins: [
		// make sure to include the plugin!
		new BundleAnalyzerPlugin({
			analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
			generateStatsFile: true, // 是否生成stats.json文件
		}),
	],
	// externals: {
	//     jquery: "jQuery"
	// }
};
