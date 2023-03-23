import path from 'path';
import { defineConfig } from 'vitest/config';
import Vue from '@vitejs/plugin-vue';

export default defineConfig( {
	plugins: [ Vue() ],

	test: {
		globals: false,
		environmentMatchGlobs: [
			[ 'test/unit/**', 'node' ],
			[ 'test/integration/**', 'jsdom' ],
			[ 'test/components/**', 'jsdom' ]
		]
	},
	resolve: {
		alias: {
			'@src': path.resolve( __dirname, './src' ),
			'@environment': path.resolve( __dirname, './src/environment/prod' ),
			'@test': path.resolve( __dirname, './test' )
		}
	}
} );
