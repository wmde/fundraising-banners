<template>
	<div class="wmde-banner-full">
		<button class="wmde-banner-full-close t-close-full-banner" @click.prevent="$emit( 'close' )">
			<CloseIconMobile/>
		</button>
		<div class="wmde-banner-full-content">
			<div class="wmde-banner-full-info">
				<slot name="banner-text"/>
				<slot name="progress"/>
			</div>
			<div class="wmde-banner-full-call-to-action">
				Jetzt sind Sie <span class="wmde-banner-full-call-to-action-optional-text">in Deutschland</span> gefragt.
			</div>

			<slot name="donation-form"/>

			<slot name="footer"/>
		</div>
	</div>
</template>

<script setup lang="ts">

import CloseIconMobile from '@src/components/Icons/CloseIconMobile.vue';

defineEmits( [ 'close', 'showFundsModal' ] );

</script>
