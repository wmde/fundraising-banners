module.exports = {
	'extends': [
		'wikimedia',
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/eslint-config-typescript'
	],
	'parserOptions': {
		ecmaVersion: 'latest'
	},
	'root': true,
	'env': {
		browser: true,
		node: true,
		es6: true,
		mocha: true
	},
	'globals': {
		mw: false
	},
	'rules': {
		// We want to use const and let wherever we like. TypeScript will inform us about use-before-declation situations
		'vars-on-top': [ 'off' ],

		// use as few quotes as possible
		'quote-props': [ 'error', 'consistent-as-needed', { keywords: true } ],

		// Allow template literals
		'quotes': [ 'error', 'single', { allowTemplateLiterals: true } ],

		// We have big monitors
		'max-len': [ 'error', {
			code: 180
		} ],

		// jsdoc should use TypeScript type information, most doc comments may just inform about the purpose of a function/method
		'jsdoc/require-param': [ 'off' ],
		'jsdoc/require-returns': [ 'off' ],

		// This forces script and style lang in Vue single file components
		'vue/block-lang': [ 'error', {
			script: { lang: 'ts' },
			style: { lang: 'scss' }
		} ],

		'@typescript-eslint/type-annotation-spacing': 'error',
		'@typescript-eslint/explicit-function-return-type': 'off',

		// Workaround for Typescript enums, see https://github.com/typescript-eslint/typescript-eslint/issues/2483
		'no-shadow': 'off',
		'@typescript-eslint/no-shadow': [ 'error' ]
	},
	'overrides': [
		{
			// enable the rule specifically for TypeScript files
			files: [ '*.ts', '*.mts', '*.cts', '*.tsx', '*.vue' ],
			rules: {
				'@typescript-eslint/explicit-function-return-type': 'error'
			}
		}
	]
};
