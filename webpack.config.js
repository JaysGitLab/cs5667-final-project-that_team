const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: {
    polyfills: './public/polyfills.ts',
    vendor: './public/vendor.ts',
    bootstrap: './public/bootstrap.ts'
	},
  resolve: {
    extensions: ['.ts', '.js', '.json', '.html']
  },
	output: {
		path: '/home/gurnben/Projects/cs5667-final-project-that_team/public/build',
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: ['ts-loader']
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.html$/,
				include: [
					path.resolve(__dirname, "public/app/home/home.template.html"),
					path.resolve(__dirname, "public/app/header/header.template.html"),
					path.resolve(__dirname, "public/app/footer/footer.template.html")
				],
				use: [ 'html-loader' ]
			}
		]
	},
	plugins: [],
  mode: 'development'
};
