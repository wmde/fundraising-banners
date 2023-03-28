<template>
	<label :class="[
		'wmde-banner-select-custom-amount',
		{
			'value-entered': value,
			'focused': focused
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

		<span class="wmde-banner-select-custom-amount-input-container">

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
		</span>
	</label>
</template>

<script setup lang="ts">

import { computed, ref } from 'vue';

interface Props {
	value?: string,
	placeholder: string,
	fieldName: string,
	selectedAmount?: string
}

const props = defineProps<Props>();
const emit = defineEmits( [ 'customAmountBlurred', 'customAmountInput' ] );

const anyAmountWasSelected = computed( () => props.selectedAmount === null && props.value !== null );

const focused = ref<boolean>( false );
const inputRef = ref<HTMLInputElement>( null );

const onFocus = ( e: Event ): void => {
	focused.value = true;
	if ( props.value !== '' ) {
		( e.target as HTMLInputElement ).select();
	}
};

const onBlur = (): void => {
	focused.value = false;
	emit( 'customAmountBlurred' );
};

const onRadioClicked = (): void => {
	inputRef.value?.focus();
};

const showEuro = computed( () => ( props.value !== null && props.value !== '' ) || focused.value );

</script>

<style lang="scss">

</style>
