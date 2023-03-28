<template>
	<label :class="[
		'wmde-banner-select-custom-amount',
		{
			'value-entered': customAmount,
			'focused': focused
		}
	]">
		<input
			class="wmde-banner-select-custom-amount-radio"
			type="radio"
			:name="fieldName"
			value=""
			:checked="focused || customAmount !== '' "
			@click="onRadioClicked"
		/>

		<span class="wmde-banner-select-custom-amount-input-container">

			<span v-if="showEuro" class="wmde-banner-select-custom-amount-euro-symbol">&euro;</span>
			<input
				class="wmde-banner-select-custom-amount-input t-custom-amount"
				tabIndex="-1"
				type="text"
				size="3"
				maxLength="8"
				@focus="onFocus"
				@blur="onBlur"
				@input="$emit( 'customAmountInput', customAmount )"
				autoComplete="off"
				:placeholder="focused ? '' : placeholder"
				v-model="customAmount"
				ref="inputRef"
			/>
		</span>
	</label>
</template>

<script setup lang="ts">

import { computed, ref, watch } from 'vue';

interface Props {
	placeholder: string,
	fieldName: string,
	selectedAmount?: string
}

const props = defineProps<Props>();
const emit = defineEmits( [ 'customAmountBlurred', 'customAmountInput' ] );

const customAmount = ref<string>( '' );
const focused = ref<boolean>( false );
const inputRef = ref<HTMLInputElement>( null );

watch( () => props.selectedAmount, ( newValue ) => {
	if ( newValue === null ) {
		return;
	}
	customAmount.value = '';
} );

const onFocus = ( e: Event ): void => {
	focused.value = true;
	// Select the text in the input field
	if ( customAmount.value !== '' ) {
		( e.target as HTMLInputElement ).select();
	}
};

const onBlur = (): void => {
	focused.value = false;
	emit( 'customAmountBlurred', customAmount.value );
};

const onRadioClicked = (): void => {
	inputRef.value?.focus();
};

const showEuro = computed( () => customAmount.value !== '' || focused.value );

</script>

<style lang="scss">

</style>
