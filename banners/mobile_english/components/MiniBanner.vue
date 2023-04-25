<template>
	<div class="wmde-banner-mini">
		<div class="wmde-banner-mini-content">
			<div class="wmde-banner-mini-close">
				<button class="wmde-banner-mini-close-button t-close-main-banner" @click.prevent="$emit( 'close' )">
					<CloseIconChunky/>
				</button>
			</div>

			<div class="wmde-banner-mini-banner-slideshow">
				<slot name="banner-slides"/>
			</div>
		</div>
		<div class="wmde-banner-mini-button-wrapper">
			<button class="wmde-banner-mini-button" @click="$emit( 'showFullPageBanner' )">
				Donate now
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">

import CloseIconChunky from '@src/components/Icons/CloseIconChunky.vue';

defineEmits( [ 'showFullPageBanner', 'close' ] );

</script>
