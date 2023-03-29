<template>
	<div :class="[
		'wmde-banner-select-group-container',
		fieldName,
		{ 'wmde-banner-select-group-container-with-error': !isValid }
	]">
		<div class="wmde-banner-select-group">
			<div v-for="{ value, label, className, notice } in selectionItems" :key="value" :class="[
				'wmde-banner-select-group-option',
				className,
				{ 'wmde-banner-disabled': disabledOptions.indexOf( value ) > -1 }
			]">
				<label>
					<input
						type="radio"
						@click="$emit('valueSelected')"
						:checked="value === currentValue"
						:name="fieldName"
						:value="value"
						:disabled="disabledOptions.indexOf( value ) > -1"
						class="wmde-banner-select-group-input"
					/>
					<span class="wmde-banner-select-group-label">{{ label }}</span>
				</label>
				<span v-if="notice" class="wmde-banner-select-group-notice" :class="{ selected: value === currentValue }">
					{{ notice }}
				</span>
			</div>
			<slot/>
		</div>

		<span v-if="errorMessage" class="wmde-banner-select-group-error-message">
			<span class="wmde-banner-error-icon">{{ errorMessage }}</span>
		</span>

	</div>
</template>

<script setup lang="ts">
import { FormItem } from '@src/utils/FormItemsBuilder/FormItem';

interface Props{
	fieldName: string;
	isValid: boolean;
	selectionItems: FormItem[];
	currentValue: string;
	disabledOptions?: string[];
	errorMessage?: string;
}

withDefaults( defineProps<Props>(),
	{
		disabledOptions: (): string[] => []
	}
);

</script>

<style lang="scss">
.wmde-banner {
	&-select-group {
		border: 0;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex: 0 1 auto;
		width: 100%;
		flex-wrap: wrap;

		&-container {
			display: flex;
			flex: 1 1 auto;
			flex-direction: column;
			margin-bottom: 0;
			margin-top: 0;
			border: 0;
			padding: 0;
		}

		&-error-message {
			display: none;
			width: 100%;
		}

		&-container-with-error {
			.wmde-banner-error-icon {
				position: relative;
				display: block;

				&::before {
					position: absolute;
					top: 0;
					left: 0;
				}
			}

			.wmde-banner-select-group-error-message {
				display: block;
			}
		}

		&-option {
			label {
				flex: 1 1 auto;
				margin: 0;
				box-sizing: border-box;
				display: flex;
				position: relative;
				cursor: pointer;
			}
		}

		&-label {
			box-sizing: border-box;
			display: inline-block;
			white-space: nowrap;

			/* This positions the "radio button" shape */
			&::before {
				box-sizing: border-box;
				top: 50%;
				left: 0;
				content: '';
				position: absolute;
			}
		}

		&-input {
			display: none;
		}

		/* The optional span element for giving hints for specific items (e.g. payment type requiring address) */
		&-notice {
			display: block;
		}
	}
}
</style>
