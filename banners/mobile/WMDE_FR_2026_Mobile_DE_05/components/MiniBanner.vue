<template>
	<div class="wmde-b-step-container wmde-b-mini-banner">

		<header class="wmde-c-repel wmde-b-nav" role="none" data-nowrap>
			<div class="wmde-c-cluster">
				<button @click.prevent="$emit( 'showFundsModal' )" :title="$translate( 'use-of-funds-link-description' )">
					<InfoIconStraight/> Warum spenden?
				</button>

				<button @click.prevent="$emit( 'alreadyDonatedClicked' )">
					<TickIcon/> {{ $translate( 'mini-banner-already-donated-button' ) }}
				</button>
			</div>

			<div>
				<button @click.prevent="$emit( 'close' )">
					<span class="visually-hidden">{{ $translate( 'close' ) }}</span>
					<CloseIconMobile/>
				</button>
			</div>
		</header>

		<div class="wmde-b-step-container__content">
			<h2 class="wmde-b-heading">Wikipedia ist unverkäuflich</h2>
			<slot name="banner-slider"/>
		</div>

		<footer role="none">
			<div>
				<button class="wmde-b-button" data-theme="secondary" data-fill @click="$emit( 'showFullPageBannerPreselected' )">
					Jetzt 10 &euro; spenden
				</button>
			</div>
			<div>
				<button class="wmde-b-button" data-fill @click="$emit( 'showFullPageBanner' )">
					Anderen Betrag
				</button>
			</div>
		</footer>

	</div>
</template>

<script setup lang="ts">

import CloseIconMobile from '@src/components/Icons/CloseIconMobile.vue';
import InfoIconStraight from '@src/components/Icons/InfoIconStraight.vue';
import TickIcon from '@src/components/Icons/TickIcon.vue';

defineEmits( [ 'showFullPageBanner', 'showFullPageBannerPreselected', 'close', 'showFundsModal', 'alreadyDonatedClicked' ] );

</script>
