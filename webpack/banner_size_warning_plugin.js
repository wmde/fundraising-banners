const chalk = require( 'chalk' ).default;

class BannerSizeWarningPlugin {
	constructor( maxBannerSize ) {
		this.bannerSize = maxBannerSize.limit; // limit in bytes
	}

	apply( compiler ) {
		compiler.hooks.done.tap(
			{ name: 'BannerSizeWarningPlugin', stage: Infinity },
			( stats ) => {
				const banners = [];

				for ( const bannerName in stats.compilation.assets ) {
					const banner = stats.compilation.assets[ bannerName ];
					const size = banner.size();
					if ( size > this.bannerSize ) {
						banners.push( { name: bannerName, size } );
					}
				}

				if ( banners.length > 0 ) {
					setTimeout( () => {
						console.warn(
							chalk.yellowBright( `\nWarning - The following banners exceed the size limit of ` ) +
							chalk.green( `${ this.bannerSize / 1024 }KB` ) +
							chalk.yellowBright( `:\n` )
						);

						banners.forEach( banner =>
							console.warn( `- ${ banner.name }:`,
								chalk.red( `${ ( banner.size / 1024 ).toFixed( 2 ) }KB` ) )
						);

						console.warn(
							chalk.yellowBright( `\nPlease do following two things:\n\n`,
								`1. Notify the FUN team and consider removing or optimizing features.\n`,
								`2. Increase the max banner size limit by 20KB (in 'webpack.production.js' file)`
						) );

						console.warn(
							chalk.greenBright( `\n\nExample Email format:` ),
							`\n\nDear FUN team, \nThe following banners exceed the banner size limit`,
							`(${ this.bannerSize / 1024 }KB) after compilation:\n` );

						banners.forEach( banner =>
							console.warn( `- ${ banner.name }:`,
								chalk.red( `${ ( banner.size / 1024 ).toFixed( 2 ) }KB` ) )
						);

						console.warn( `\nFollowing features make it happen:\n---Features list---`,
						`\n\nPlease consider scraping older banner features or reducing the scope of the new feature.` );
					}, 0 );
				}
			}
		);
	}
}

module.exports = BannerSizeWarningPlugin;
