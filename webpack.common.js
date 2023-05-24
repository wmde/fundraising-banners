const path = require( 'path' );
const fs = require( 'fs' );
const toml = require( 'toml' );
const webpack = require( 'webpack' );
const { VueLoaderPlugin } = require( 'vue-loader' );

const CampaignConfig = require( './webpack/campaign_config' );
const campaigns = new CampaignConfig( toml.parse( fs.readFileSync( 'campaign_info.toml', 'utf8' ) ) );

module.exports = {
	entry: campaigns.getEntryPoints(),
	output: {
		filename: '[name].js',
		path: path.resolve( __dirname, 'dist' ),
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'ts-loader',
				options: {
					appendTsSuffixTo: [ /\.vue$/ ]
				}
			},
			{
				test: /(wpde_desktop|wpde_mobile)\/banner(_ctrl|_var)\.ts/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							appendTsSuffixTo: [ /\.vue$/ ]
						}
					},
					{
						loader: 'string-replace-loader',
						options: {
							search: /!insert-(campaign|keyword)-here!/g,
							/**
							 * @param { string } match The whole matched placeholder
							 * @param { string } captureGroupMatch Either "campaign" or "keyword" from the regex match group
							 * @return { string }
							 */
							replace( match, captureGroupMatch ) {
								const tracking = campaigns.getCampaignTrackingForEntryPoint( this.resource );
								const placeholderToTrackingKeyMap = {
									campaign: 'campaignTracking',
									keyword: 'bannerTracking'
								};
								return tracking[ placeholderToTrackingKeyMap[ captureGroupMatch ] ];
							}
						}
					}
				]
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
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
	resolve: {
		extensions: [ '.ts', '.js', '.json' ],
		alias: {
			'@src': path.resolve( __dirname, 'src' )
		},
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
