module.exports = {
  extends: [
	  'wikimedia',
	  'plugin:vue/vue3-essential',
	  'eslint:recommended',
	  '@vue/eslint-config-typescript'
  ],
  	parserOptions: {
		ecmaVersion: 'latest'
	},
  root: true,
	env: {
		browser: true,
		node: true,
		es6: true,
		mocha: true
	},
	globals: {
		mw: false
	},
 rules: {
		"dot-notation": [ "error", { "allowKeywords": true } ],
		"one-var": [ "off" ],
		"vars-on-top": [ "off" ],
		"camelcase": [ "error", { "properties": "never" } ],
		"no-use-before-define": [ "error", { "functions": false } ],
		"quote-props": [ "error", "consistent-as-needed", { "keywords": true } ],
		"max-len": [ "error", {
			"code": 180
		}],
		"max-statements-per-line": [ "error", { "max": 2 } ],
		"prefer-regex-literals": [ "off" ]

}
};
