import globals from "globals";
import js from "@eslint/js";

import stylisticTs from "@stylistic/eslint-plugin-ts";
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import pluginSecurity from 'eslint-plugin-security';
import wikimedia from './src/eslint/wikimedia.mjs';
import wikimediaVue from './src/eslint/wikimedia_vue.mjs';

export default [
	js.configs.recommended,
	pluginSecurity.configs.recommended,
	...tseslint.configs.recommended,
	...pluginVue.configs['flat/recommended'],
	 ...vueTsEslintConfig(),
	wikimedia,
	wikimediaVue,

	{
		ignores: [
			"dist/*.js",
			// TODO exclude only banners not in campaign_config.toml, similar to how we do the vitest setup
			"banners/**/*.+(vue|js)",
			// TODO remove exclusion, format the files when we have finalized the rules
			"dashboard/**/*.+(vue|js)",
			// TODO add different ruleset instead
			"webpack/**/*.+(mjs|js)",
			"webpack.*.js",
			// TODO format the files, remove exclusion
			"src/eslint/*.mjs",
			// TODO exclude only banner tests not in campaign_config.toml, see vitest setup
		]
	},
	{
    plugins: {
		// TODO find out if the "plugins" section is necessary
        "@stylistic/ts": stylisticTs,
		vue: pluginVue
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
            ...globals.mocha,
            mw: false,
        },

        ecmaVersion: "latest",
        sourceType: "commonjs",

        parserOptions: {
            parser: "@typescript-eslint/parser",
        },
    },

    rules: {
        "vue/no-setup-props-destructure": ["off"],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "vars-on-top": ["off"],

        "quote-props": ["error", "consistent-as-needed", {
            keywords: true,
        }],

        quotes: ["error", "single", {
            allowTemplateLiterals: true,
        }],

        "max-len": ["error", {
            code: 180,
        }],

        "jsdoc/require-param": ["off"],
        "jsdoc/require-returns": ["off"],

        "vue/block-lang": ["error", {
            script: {
                lang: "ts",
            },

            style: {
                lang: "scss",
            },
        }],

        "no-shadow": "off",
        "@typescript-eslint/no-shadow": ["error"],
        "@stylistic/ts/type-annotation-spacing": "error",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-member-accessibility": "off",
		"@typescript-eslint/no-explicit-any": "off",

        "no-underscore-dangle": ["error", {
            allowAfterThis: true,
        }],

        "@typescript-eslint/naming-convention": ["error", {
            selector: "classProperty",
            modifiers: ["private"],
            format: ["camelCase"],
            leadingUnderscore: "require",
        }, {
            selector: "classProperty",
            modifiers: ["public", "static", "readonly"],
            format: ["UPPER_CASE"],
            leadingUnderscore: "forbid",
        }, {
            selector: "classProperty",
            modifiers: ["public"],
            format: ["camelCase"],
            leadingUnderscore: "forbid",
        }, {
            selector: "parameterProperty",
            format: ["camelCase"],
            leadingUnderscore: "forbid",
        }, {
            selector: "parameter",
            format: ["camelCase"],
            leadingUnderscore: "forbid",
        }],
    },
}, {
    files: ["**/*.ts", "**/*.mts", "**/*.cts", "**/*.tsx", "**/*.vue"],

    rules: {
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/explicit-member-accessibility": "error",
    },
},
	{
		"files": ["*.ts"],
		rules: {
			// "export function" gives false positives on this
			"no-explicit-globals": "off",
		}
	}
];
