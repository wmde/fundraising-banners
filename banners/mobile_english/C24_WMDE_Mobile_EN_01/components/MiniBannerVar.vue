<template>
	<div class="wmde-banner-mini">
		<div class="wmde-banner-mini-content">
			<div class="wmde-banner-mini-close">
				<button class="wmde-banner-mini-close-button t-close-main-banner" @click.prevent="$emit( 'close' )">
					<CloseIconCircle/>
				</button>
			</div>

			<button @click="$emit( 'showUseOfFunds' )" class="wmde-banner-mini-headline">
				<span class="wmde-banner-mini-headline-link">Why</span> even &euro;10 makes a difference
			</button>

			<div class="wmde-banner-mini-slideshow">
				<slot name="banner-slides"/>
			</div>

			<div class="wmde-banner-mini-button-group">
				<button class="wmde-banner-mini-button-preselect" @click="$emit( 'showFullPageBannerPreselectedAmount' )">
					Donate €10
				</button>
				<button class="wmde-banner-mini-button" @click="$emit( 'showFullPageBanner' )">
					Different Amount
				</button>
			</div>

			<div class="wmde-banner-mini-payment-icons">
				<div><PayPalLogo/></div>
				<div><VisaLogo/></div>
				<div><MastercardLogo/></div>
				<div><SmsIcon/></div>
			</div>

		</div>
	</div>
</template>

<script setup lang="ts">

import PayPalLogo from '@src/components/PaymentLogos/PayPalLogo.vue';
import VisaLogo from '@src/components/PaymentLogos/VisaLogo.vue';
import MastercardLogo from '@src/components/PaymentLogos/MastercardLogo.vue';
import SmsIcon from '@src/components/Icons/SmsIcon.vue';
import CloseIconCircle from '@src/components/Icons/CloseIconCircle.vue';

defineEmits( [ 'showFullPageBanner', 'showFullPageBannerPreselectedAmount', 'close', 'showUseOfFunds' ] );

</script>
