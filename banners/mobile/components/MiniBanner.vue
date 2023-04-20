<template>
	<div class="wmde-banner-mini">
		<div class="wmde-banner-mini-close">
			<button class="wmde-banner-mini-close-button t-close-main-banner" @click.prevent="$emit( 'close' )">
				<CloseIconMobile/>
			</button>
		</div>

		<header class="wmde-banner-mini-headline">
			<div class="wmde-banner-mini-headline-background">
				<span class="wmde-banner-mini-headline-content">Ist Ihnen Wikipedia 5&nbsp;€ wert?</span>
			</div>
		</header>

		<div class="wmde-banner-mini-banner-slideshow">
			<BannerSlides :play="playSlideshow"/>
		</div>

		<button class="wmde-banner-mini-button" @click="$emit( 'showFullPageBanner' )">
			Jetzt spenden
		</button>

	</div>
</template>

<script setup lang="ts">

import CloseIconMobile from '@src/components/Icons/CloseIconMobile.vue';
import BannerSlides from '../content/BannerSlides.vue';

defineEmits( [ 'showFullPageBanner', 'close' ] );

interface Props {
	playSlideshow: boolean;
}

defineProps<Props>();

</script>
