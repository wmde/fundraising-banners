<template>
	<div
		:class="{
			[ fieldName ]: true,
			'wmde-banner-select-group-container': true,
			'wmde-banner-select-group-container--with-error': !isValid
		}"
	>

		<div class="wmde-banner-select-group">

			<div
				v-for="{ value, label, notice } in selectionItems"
				:key="value"
				:class="{
					'wmde-banner-select-group-option': true,
					[ `${ fieldName }-${value.replace( ' ', '-' )}` ]: true,
					'wmde-banner-disabled': disabledOptions.indexOf( value ) > -1
				}"
			>
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
					<span class="wmde-banner-select-group-label">{{ label || value }}</span>
				</label>
				<span v-if="notice" :class="{
					'wmde-banner-select-group-notice': true,
					selected: value === currentValue
					}">
					{{ notice }}
				</span>
			</div>
			<slot/>
		</div>

		<span v-if="errorMessage" class="wmde-banner-select-group-error-message">
			<span class="wmde-banner-error-icon">
				{{ errorMessage }}
			</span>
		</span>;

	</div>
</template>

<script setup lang="ts">
import { FormItem } from '@src/utils/FormItemsBuilder';

interface Props{
	fieldName: string;
	isValid: boolean;
	selectionItems: FormItem[];
	currentValue: string;
	disabledOptions: string[];
	errorMessage?: string;
}

defineProps<Props>();
</script>

<style lang="scss">

</style>
