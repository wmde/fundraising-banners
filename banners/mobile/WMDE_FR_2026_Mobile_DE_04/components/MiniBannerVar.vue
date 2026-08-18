<template>
	<div class="wmde-b-mini-banner">

		<header class="wmde-c-repel wmde-b-nav">
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

		<div class="wmde-b-mini-banner__content">
			<slot name="banner-slides"/>
		</div>

		<footer>
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
