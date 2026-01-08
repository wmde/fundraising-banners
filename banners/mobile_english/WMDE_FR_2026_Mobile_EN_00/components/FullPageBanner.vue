<template>
	<div class="wmde-banner-full">
		<button class="wmde-banner-full-close t-close-full-banner" @click.prevent="$emit( 'close' )">
			<CloseIconChunky/>
		</button>

		<div class="wmde-banner-full-content">

			<button @click="$emit( 'showUseOfFunds' )" class="wmde-banner-headline">
				<span class="wmde-banner-headline-icon"><SimpleInfoIcon/></span> <span class="wmde-banner-headline-link">Why</span> even &euro;10 makes a difference
			</button>

			<div class="wmde-banner-full-info">
				<slot name="banner-text"/>

				<div>
					<slot name="progress"/>
				</div>
			</div>

			<div class="wmde-banner-full-call-to-action"></div>

			<slot name="donation-form"/>

			<slot name="footer"/>
		</div>
	</div>
</template>

<script setup lang="ts">

import CloseIconChunky from '@src/components/Icons/CloseIconChunky.vue';
import SimpleInfoIcon from './SimpleInfoIcon.vue';

defineEmits( [ 'close', 'showUseOfFunds' ] );

</script>
