<template>
	<label :class="[ 'wmde-banner-select-custom-amount',
	{
	'value-entered': value,
	'focused': state.focused
	}
	]">
		<input
			class="wmde-banner-select-custom-amount-radio"
			type="radio"
			:name="fieldName"
			value=""
			:checked="focused || anyAmountWasSelected"
			@click="onRadioClicked"
		/>

		<div class="wmde-banner-select-custom-amount-input-container">

			<span v-if="showEuro" class="wmde-banner-select-custom-amount-euro-symbol">&euro;</span>
			<input
				class="wmde-banner-select-custom-amount-input t-custom-amount"
				tabIndex="-1"
				type="text"
				:value="value || ''"
				@input="$emit( 'customAmountInput' )"
				size="3"
				maxLength="8"
				@focus="onFocus"
				@blur="onBlur"
				autoComplete="off"
				:placeholder="focused ? '' : placeholder"
				ref="inputRef"
			/>
		</div>
	</label>
</template>

<script setup lang="ts">

interface Props {
	value?: string,
	placeholder: string,
	fieldName: string
}

defineProps<Props>();

</script>

<style lang="scss">

</style>
