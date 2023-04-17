<template>
	<label :class="[
		'wmde-banner-select-custom-amount',
		{
			'value-entered': modelValue,
			'focused': focused
		}
	]">
		<input
			class="wmde-banner-select-custom-amount-radio"
			type="radio"
			:name="fieldName"
			value=""
			:checked="focused || modelValue !== '' "
			@click="onRadioClicked"
		/>

		<span class="wmde-banner-select-custom-amount-input-container">

			<span v-if="showEuro" class="wmde-banner-select-custom-amount-euro-symbol">&euro;</span>
			<input
				class="wmde-banner-select-custom-amount-input t-custom-amount"
				:value="modelValue"
				tabIndex="-1"
				type="text"
				size="3"
				maxLength="8"
				@focus="onFocus"
				@blur="onBlur"
				@input="onInput"
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
	placeholder: string;
	fieldName: string;
	modelValue: string;
}

const props = defineProps<Props>();
const emit = defineEmits( [ 'blur', 'update:modelValue', 'focus' ] );

const focused = ref<boolean>( false );
const inputRef = ref<HTMLInputElement>( null );
const showEuro = computed( () => props.modelValue !== '' || focused.value );

const onFocus = ( e: Event ): void => {
	focused.value = true;
	// Select the text in the input field
	if ( props.modelValue !== '' ) {
		( e.target as HTMLInputElement ).select();
	}
	emit( 'focus' );
};

const onBlur = (): void => {
	focused.value = false;
	emit( 'blur', props.modelValue );
};

const onRadioClicked = (): void => {
	inputRef.value?.focus();
};

const onInput = ( e: Event ): void => {
	emit( 'update:modelValue', ( e.target as HTMLInputElement ).value );
};

</script>
