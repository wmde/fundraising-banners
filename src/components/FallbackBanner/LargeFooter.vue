<template>
	<div class="wmde-fbb-large-footer">
		<div class="wmde-fbb-large-footer-left">
			<FallbackBank/>
			<button class="wmde-fbb-usage-link" @click="$emit( 'use-of-funds-button-clicked' )">{{ $translate( 'use-of-funds-link' ) }}</button>
		</div>
		<div class="wmde-fbb-large-footer-right">
			<FallbackButton @buttonClicked="$emit( 'submit-button-clicked' )"/>
		</div>
	</div>
</template>

<script setup lang="ts">

import FallbackBank from '@src/components/FallbackBanner/FallbackBank.vue';
import FallbackButton from '@src/components/FallbackBanner/FallbackButton.vue';

defineEmits( [ 'use-of-funds-button-clicked', 'submit-button-clicked' ] );

</script>
