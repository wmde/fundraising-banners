<template>
	<div class="wmde-banner-full">
		<button class="wmde-banner-full-close t-close-full-banner" @click.prevent="$emit( 'close' )">
			<CloseIconChunky/>
		</button>

		<div class="wmde-banner-full-content">
			<div class="wmde-banner-full-info">
				<a
					href="https://commons.wikimedia.org/wiki/File:Jimmy_Wales_-_August_2019.jpg"
					alt="Link to Jimmy Wales image on Wikimedia Commons"
					target="_blank"
				>
					<img
						class="wmde-banner-founder-image"
						src="https://upload.wikimedia.org/wikipedia/donate/f/f5/Jimmy-wales-cropped.jpg"
						alt="Portrait von Jimmy Wales – Wikipedia-Gründer (Foto: Zachary McCune / Wikimedia Foundation, CC BY-SA 4.0)"
					/>
				</a>

				<slot name="banner-text"/>

				<div>
					<slot name="progress"/>
				</div>
			</div>

			<div class="wmde-banner-full-call-to-action"></div>

			<slot name="donation-form"/>

			<a
				class="wmde-banner-founder-image-license-link"
				href="https://commons.wikimedia.org/wiki/File:Jimmy_Wales_-_August_2019.jpg"
				target="_blank"
			>
				Foto: Zachary McCune / Wikimedia Foundation, CC BY-SA 4.0↗
			</a>

			<slot name="footer"/>
		</div>
	</div>
</template>

<script setup lang="ts">

import CloseIconChunky from '@src/components/Icons/CloseIconChunky.vue';

defineEmits( [ 'close', 'showUseOfFunds' ] );

</script>
