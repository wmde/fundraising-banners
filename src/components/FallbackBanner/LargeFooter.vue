<template>
	<div class="wmde-banner-fallback-large-footer">
		<div class="wmde-banner-fallback-large-footer-left">
			<FallbackBank/>
			<UseOfFundsLink @buttonClicked="$emit( 'use-of-funds-button-clicked' )"/>
		</div>
		<div class="wmde-banner-fallback-large-footer-right">
			<FallbackButton @buttonClicked="$emit( 'submit-button-clicked' )"/>
		</div>
	</div>
</template>

<script setup lang="ts">

import UseOfFundsLink from '@src/components/FallbackBanner/UseOfFundsLink.vue';
import FallbackBank from '@src/components/FallbackBanner/FallbackBank.vue';
import FallbackButton from '@src/components/FallbackBanner/FallbackButton.vue';

defineEmits( [ 'use-of-funds-button-clicked', 'submit-button-clicked' ] );

</script>
