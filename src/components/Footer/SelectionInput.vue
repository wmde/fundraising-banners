<template>
	<div class="wmde-banner-selection-input"
		:class="{ focused: focused }">
	<span class="wmde-banner-selection-input-text">{{ value }}</span>
	<input
		class="wmde-banner-selection-input-input"
		type="text"
		readonly
		:value="focusedValue || value"
		@focus="handleFocus"
		@blur="handleBlur"
		ref="inputRef"
	/>
	</div>
</template>

<script setup lang="ts">

import { ref } from 'vue';

interface Props { value: string, focusedValue?: string }

defineProps<Props>();

const inputRef = ref<HTMLInputElement>( null );
const focused = ref<boolean>( false );

const handleFocus = (): void => {
	setTimeout( () => inputRef.value.setSelectionRange( 0, 9999 ), 1 );
	focused.value = true;
};

const handleBlur = (): void => {
	focused.value = false;
};

</script>

<style lang="scss">
.wmde-banner {
	&-selection-input {
		display: inline-block;
		position: relative;

		&-input {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			padding: 0;
			border: 0;
			outline: 0;
			z-index: 2;
		}
	}
}
</style>
