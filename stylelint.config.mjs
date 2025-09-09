import { getExcludedCampaignDirectories } from "./webpack/excluded_campaigns.mjs";

export default {
	"ignoreFiles": [
		"coverage/*",
		...getExcludedCampaignDirectories( 'campaign_info.toml' )
	],
	"extends": [
		"stylelint-config-recommended",
		"@stylistic/stylelint-config",
		"stylelint-config-standard-scss",
		"stylelint-config-standard-vue/scss"
	],
	"rules": {
		"@stylistic/indentation": "tab",
		"@stylistic/function-whitespace-after": "always",
		"@stylistic/function-parentheses-space-inside": "always",
		"@stylistic/max-line-length": 180,
		"@stylistic/media-feature-parentheses-space-inside": "always",
		"@stylistic/selector-attribute-brackets-space-inside": "always",
		"@stylistic/selector-pseudo-class-parentheses-space-inside": "always",
		"@stylistic/string-quotes": "single",
		"selector-max-id": 2,
		"function-url-quotes": "always",
		"color-hex-length": "long",
		"rule-empty-line-before": null,
		"declaration-block-no-redundant-longhand-properties": null,
		"declaration-empty-line-before": null,
		"no-descending-specificity": null,
		"declaration-property-unit-disallowed-list": null,
		"declaration-property-value-disallowed-list": null,
		"color-function-notation": null,
		"alpha-value-notation": null,
		"function-no-unknown": [ true, { "ignoreFunctions" : [ "linear" ] } ],
		"media-feature-range-notation": "prefix",
		"function-disallowed-list": null,
		"font-family-name-quotes": "always-unless-keyword",
		"custom-property-empty-line-before": null,
		"at-rule-no-unknown": [
			true,
			{
				"ignoreAtRules": [
					"use",
					"forward",
					"mixin",
					"if",
					"include",
					"function",
					"extend",
					"error",
					"warn",
					"debug",
					"at-root",
					"each"
				]
			}
		],
		"annotation-no-unknown": [
			true,
			{
				"ignoreAnnotations": [
					"default"
				]
			}
		],
		"selector-class-pattern": [
			"^([a-z][a-z0-9]*)((-|--)[a-z0-9]+)*$",
			{
				"message": "Expected class selector to be kebab-case"
			}
		],

		"scss/function-no-unknown": true,
		"scss/dollar-variable-empty-line-before": null
	}
}
