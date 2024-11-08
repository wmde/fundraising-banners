<template>
	<div class="wmde-banner-mini">
		<div class="wmde-banner-mini-inner">
			<div class="wmde-banner-mini-close">
				<button class="wmde-banner-mini-close-button t-close-main-banner" @click.prevent="$emit( 'close' )">
					<CloseIconMobile/>
				</button>
			</div>

			<header class="wmde-banner-mini-headline">
				<div class="wmde-banner-mini-headline-background">
					<span class="wmde-banner-mini-headline-content">Ist Ihnen Wikipedia 10&nbsp;€ wert?</span>
				</div>
			</header>

			<div class="wmde-banner-mini-slideshow">
				<slot name="banner-slides"/>
			</div>

			<div class="wmde-banner-mini-button-group">
				<button class="wmde-banner-mini-button-preselect" @click="$emit( 'showFullPageBannerPreselected' )">
					Jetzt 10 &euro; spenden
				</button>
				<button class="wmde-banner-mini-button" @click="$emit( 'showFullPageBanner' )">
					Anderen Betrag
				</button>
			</div>
		</div>
		<div class="wmde-banner-mini-minimise">
			<div class="wmde-banner-mini-minimise-tab">
				<button class="wmde-banner-mini-minimise-button" @click="$emit( 'minimise' )">
					Banner verkleinern <MinimiseIcon/>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

import CloseIconMobile from '@src/components/Icons/CloseIconMobile.vue';
import MinimiseIcon from '@src/components/Icons/MinimiseIcon.vue';

defineEmits( [ 'showFullPageBanner', 'showFullPageBannerPreselected', 'close', 'minimise' ] );

</script>
