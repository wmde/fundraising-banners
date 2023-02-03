import path from 'path';

export default {
	test: {
		globals: false,
		environment: 'node'
	},
	resolve: {
		alias: {
			'@src': path.resolve( __dirname, './src' )
		}
	}
};
