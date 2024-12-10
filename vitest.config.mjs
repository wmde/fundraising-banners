import { configDefaults, defineConfig } from 'vitest/config';
import Vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig( {
	plugins: [ Vue() ],

	test: {
		globals: false,
		environmentMatchGlobs: [
			[ 'test/unit/**', 'node' ],
			[ 'test/integration/**', 'jsdom' ],
			[ 'test/components/**', 'jsdom' ],
			[ 'test/banners/**', 'jsdom' ]
		],
		coverage: {
			exclude: [
				...configDefaults.coverage.exclude,

				// Ignore entry points, form items, event mappings and translations in each banner.
				// The entry points are just factories, the other files are configurations written in TypeScript
				'banners/*/*/{banner_ctrl,banner_var,form_items,form_items_var,event_map,event_map_var,messages,messages_var}.ts',
				
				// Ignore translation files and Locale Factories
				'src/**/messages/*',
				'src/utils/LocaleFactory/*',
				
				// Ignore environment-specific setup files
				'src/environment/*',
				
				// Additional non-banner files that are not relevant for coverage
				'dashboard/*',
				'dist/*',
				'check-content-version.ts',
				'stylelint.config.mjs',
				'vitest.campaign.config.mjs',
				'webpack/*',
				'webpack.common.js',
				'webpack.production.js',
				'webpack.config.js',
			]
		}
	},
	resolve: {
		alias: {
			'@banners': path.resolve( __dirname, './banners' ),
			'@src': path.resolve( __dirname, './src' ),
			'@environment': path.resolve( __dirname, './src/environment/prod' ),
			'@test': path.resolve( __dirname, './test' )
		}
	}
} );
