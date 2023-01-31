const path = require( 'path' );
const fs = require( 'fs' );
const toml = require( 'toml' );
const webpack = require( 'webpack' );
const { VueLoaderPlugin } = require( 'vue-loader' );

const CampaignConfig = require( './webpack/campaign_config' );
const campaigns = new CampaignConfig( toml.parse( fs.readFileSync( 'campaign_info.toml', 'utf8' ) ) );

module.exports = {
	/*
	entry: campaigns.getEntryPoints(),
	output: {
		filename: '[name].js',
		path: path.resolve( __dirname, 'dist' ),
		publicPath: '/'
	},*/
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.ts$/,
				loader: 'ts-loader',
				options: {
					appendTsSuffixTo: [ /\.vue$/ ]
				}
			},
			{
				test: /\.html$/,
				use: 'html-loader'
			},
			{
				test: /\.(scss|css)$/,
				use: [ 'style-loader', 'css-loader', 'sass-loader' ]
			}
		]
	},
	externals: {
		jquery: 'jQuery'
	},
	resolve: {
		fallback: {
			// Don't import node.js 'path' polyfill in compiled code. it shouldn't be used.
			path: false
		}
	},
	plugins: [
		new VueLoaderPlugin(),
		new webpack.ProvidePlugin( {
			jQuery: 'jquery'
		} )
	]
};
