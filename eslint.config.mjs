import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import parser from 'vue-eslint-parser';
import commonStyle from './src/fun-coding-style/common.mjs';
import typescriptStyle from './src/fun-coding-style/typescript.mjs';

export default [
	commonStyle,
	{
		files: [ '**/*.vue', '**/*.ts' ],
		plugins: {
			...typescriptStyle.plugins,
		},
		languageOptions: {
			globals: {
				...globals.node,
				...globals.browser,
			},
			parser: parser,
			ecmaVersion: 7,
			sourceType: 'module',
			parserOptions: {
				parser: '@typescript-eslint/parser',
				ecmaFeatures: {
					modules: true,
				},
			},
		},
		rules: {
			...typescriptStyle.rules,

			// The following rules should be turned on again in the future (using the settings from typescriptStyle)
			// We placed them here to avoid huge changes in our legacy codebase and to allow for slow migration
			// See https://phabricator.wikimedia.org/T383409
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-wrapper-object-types': 'off',

			// temporarily disable formatting checks until we do a code-wide, automated fix
			// TODO enable and auto-fix
			'@stylistic/comma-dangle': 'off',
			'@stylistic/space-infix-ops': 'off',
			'@stylistic/indent': 'off',
			'@stylistic/member-delimiter-style': 'off',
			'@stylistic/block-spacing': 'off',
			'@stylistic/curly-spacing': 'off',
			'@stylistic/object-curly-spacing': 'off',
			'@stylistic/space-before-blocks': 'off',
			'@stylistic/semi': 'off',

			// We do have some classes that use an underscore for private methods/properties
			'no-underscore-dangle': 'off',

			// Custom rules to prevent shipping debug code to prod
			'no-console': 'error',
			'no-debugger': 'error',
		},
	},
	// more lenient rules for test files
	{
		files: [ 'test/**/*.ts', 'test/**/*.vue', 'test/**/*.mjs' ],
		languageOptions: {
			globals: {
				...globals.node,
				...globals.browser,
			},
			parser: parser,
			ecmaVersion: 7,
			sourceType: 'module',
			parserOptions: {
				parser: '@typescript-eslint/parser',
				ecmaFeatures: {
					modules: true,
				},
			},
		},
		rules: {
			'no-console': 'off',
			'no-debugger': 'off',
			'@typescript-eslint/no-empty-function': 'off',
		},
	},
	{
		files: [ '**/*.vue' ],
		plugins: {
			vue: pluginVue,
		},
		languageOptions: {
			parser: parser,
			parserOptions: {
				parser: '@typescript-eslint/parser',
				ecmaVersion: 2020,
				sourceType: 'module',
			},
		},
		rules: {
			...pluginVue.configs.essential.rules,

			// Vue 3 allows for multiple template roots, we should not have this rule
			// TODO investigate why we have to manually disable this
			'vue/no-multiple-template-root': 'off',

			// This is related to a "temporary" fix we made that never got investigated and might be a fixed bug in Vue
			// See commit a0e422a5c860f2bb305079e0f36de4847ada0283 ("Fix reactivity in compiled banner")
			'vue/no-v-model-argument': 'off',

			// Allow for long SVG components by having a ridiculous max-len for the template section of Vue files
			'@stylistic/max-len': 'off',
			'vue/max-len': [ 'warn', {
				code: 170,
				template: 100_000,
				tabWidth: 4,
				ignorePattern: '^[\\s]*(//|<!--) (es|style)lint-.+',
				ignoreUrls: true,
				ignoreComments: false,
				ignoreRegExpLiterals: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
			} ],

			'vue/no-unused-components': [ 'error', {
				ignoreWhenBindingPresent: false,
			} ],

			// This forces script and style lang in Vue single file components
			'vue/block-lang': [ 'error', {
				script: { lang: 'ts' },
				style: { lang: 'scss' },
			} ],
		},
	},
];