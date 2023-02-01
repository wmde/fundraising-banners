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
		'dot-notation': [ 'error', { allowKeywords: true } ],
		'one-var': [ 'off' ],
		'vars-on-top': [ 'off' ],
		'quote-props': [ 'error', 'consistent-as-needed', { keywords: true } ],
		'max-len': [ 'error', {
			code: 180
		} ],
		'max-statements-per-line': [ 'error', { max: 2 } ],
		'prefer-regex-literals': [ 'off' ],
		// jsdoc should use type infromation, doc comments should just inform about the purpose of a function/method
		'jsdoc/require-param': [ 'off' ],
		'jsdoc/require-returns': [ 'off' ]

	}
};
