<template>
	<div class="wmde-banner-full">
		<button class="wmde-banner-full-close t-close-full-banner" @click.prevent="$emit( 'close' )">
			<CloseIconChunky/>
		</button>

		<div class="wmde-banner-full-content">

			<header class="wmde-banner-headline">
				Is Wikipedia worth €10 to you?
			</header>

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

defineEmits( [ 'close' ] );

</script>
