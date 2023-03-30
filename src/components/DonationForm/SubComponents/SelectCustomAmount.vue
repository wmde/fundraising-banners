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
const emit = defineEmits( [ 'blur', 'update:modelValue' ] );

const focused = ref<boolean>( false );
const inputRef = ref<HTMLInputElement>( null );
const showEuro = computed( () => props.modelValue !== '' || focused.value );

const onFocus = ( e: Event ): void => {
	focused.value = true;
	// Select the text in the input field
	if ( props.modelValue !== '' ) {
		( e.target as HTMLInputElement ).select();
	}
};

const onBlur = (): void => {
	focused.value = false;
	emit( 'blur', props.modelValue );
};

const onRadioClicked = (): void => {
	console.log( 'radio clicked' );
	inputRef.value?.focus();
};

const onInput = ( e: Event ): void => {
	emit( 'update:modelValue', ( e.target as HTMLInputElement ).value );
};

</script>

<style lang="scss">
/*
The layout settings of this element should be similar to wmde-banner-select-group-option
because the custom amount is presented as an "option" inside the amount select group
In the future, we might use tools of the CSS framework (e.g. SCSS mixins)
to keep the styles in sync
 */
.wmde-banner-select-custom-amount {
	flex: 1 1 auto;
	margin: 0;
	box-sizing: border-box;
	display: flex;
	position: relative;
	cursor: pointer;

	&-radio {
		display: none;
	}

	&-input-container {
		position: relative;
		box-sizing: border-box;
		width: 100%;

		/* This positions the "radio button" shape */
		&::before {
			top: 45%;
			left: -25px;
			margin-top: -6px;
			box-sizing: border-box;
			content: '';
			position: absolute;
		}
	}

	&-euro-symbol {
		display: block;
		position: absolute;
		box-sizing: border-box;
		text-align: center;
		top: 50%;
		right: 0;
	}

	&-input {
		display: inline-block;
		width: 100%;
		margin: 0;
		border: 0 none;
		box-sizing: border-box;
	}
}
</style>
