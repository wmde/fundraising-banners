<template>
	<div class="wmde-banner-mini">

		<div class="wmde-banner-mini-info-section">
			<button
				class="wmde-banner-mini-uof-link wmde-banner-footer-usage-link"
				@click.prevent="$emit( 'showFundsModal' )"
				:title="$translate( 'use-of-funds-link-description' )"
			>
				<InfoIconStraight/> Warum spenden?
			</button>

			<button
				class="wmde-banner-mini-already-donated-button"
				@click.prevent="$emit( 'alreadyDonatedClicked' )"
			>
				<TickIcon/> {{ $translate( 'mini-banner-already-donated-button' ) }}
			</button>
		</div>

		<div class="wmde-banner-mini-info">
			<button class="wmde-banner-mini-close wmde-banner-mini-close-button t-close-main-banner" @click.prevent="$emit( 'close' )">
				<CloseIconMobile/>
			</button>

			<header class="wmde-banner-mini-headline">
				<div class="wmde-banner-mini-headline-background">
					<span class="wmde-banner-mini-headline-content">Wikipedia ist unverkäuflich</span>
				</div>
			</header>

			<div class="wmde-banner-mini-slideshow">
				<slot name="banner-slides"/>
			</div>
		</div>
		<div class="wmde-banner-mini-button-group">
			<button class="wmde-banner-mini-button-preselect" @click="$emit( 'showFullPageBannerPreselected' )">
				Jetzt 10 &euro; spenden
			</button>
			<button class="wmde-banner-mini-button" @click="$emit( 'showFullPageBanner' )">
				Anderen Betrag
			</button>
		</div>

		<div class="wmde-banner-mini-more-stuff">
			<h3>More stuff here</h3>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium atque, autem corporis deleniti dignissimos eaque earum esse id, in laboriosam laudantium nobis numquam officiis optio porro quae quaerat reiciendis tempore.</p>

			<p>Ad adipisci alias aperiam blanditiis culpa cupiditate deserunt et eveniet exercitationem expedita fuga incidunt, iste iure labore laboriosam minus molestias obcaecati officia perspiciatis, quam quasi quibusdam quod recusandae, tempore ut?</p>

			<p>Ab accusamus amet assumenda, aut debitis deserunt ea et expedita fuga hic illo laborum magni minima molestiae nam necessitatibus officia perspiciatis placeat quisquam rem repellat sapiente, sint soluta tenetur voluptatem!</p>
		</div>

	</div>
</template>

<script setup lang="ts">

import CloseIconMobile from '@src/components/Icons/CloseIconMobile.vue';
import InfoIconStraight from '@src/components/Icons/InfoIconStraight.vue';
import TickIcon from '@src/components/Icons/TickIcon.vue';

defineEmits( [ 'showFullPageBanner', 'showFullPageBannerPreselected', 'close', 'showFundsModal', 'alreadyDonatedClicked' ] );

</script>
