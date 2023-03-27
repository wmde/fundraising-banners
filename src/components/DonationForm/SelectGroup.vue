<template>
	<div
		:class="{
			[ fieldName ]: true,
			'wmde-banner-select-group-container': true,
			'wmde-banner-select-group-container--with-error': !isValid
		}"
	>

	<div class="wmde-banner-select-group">
		{ props.selectionItems.map( ( { value, label, notice } ) => (
		<div key={ value } class={ classs(
		'wmde-banner-select-group-option',
		`${ props.fieldname }-${value.replace( ' ', '-' )}`,
		{ 'wmde-banner-disabled': props.disabledOptions.indexOf( value ) > -1 }
		) }>
		<label>
			<input
				type="radio"
				onClick={ props.onSelected }
				checked={ value === props.currentValue }
				name={ props.fieldname }
				value={ value }
				disabled={ props.disabledOptions.indexOf( value ) > -1 }
			class="wmde-banner-select-group-input"/>
			<span class="wmde-banner-select-group-label">{ label || value }</span>
		</label>
		{ notice ? <span class={ classs(
		'wmde-banner-select-group-notice',
		{
		selected: value === props.currentValue
		}
		) }>{ notice }</span> : null }
	</div>
	) ) }
	{ props.children }
	</div>

	{ errorPosition === ErrorPosition.BOTTOM ? error : null }

	</div>
</template>

<script setup lang="ts">
interface Props{
	fieldName: string;
	isValid: boolean;
}

defineProps<Props>();
</script>

<style scoped>

</style>
