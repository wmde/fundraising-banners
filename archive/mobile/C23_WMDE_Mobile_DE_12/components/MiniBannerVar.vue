<template>
	<div class="wmde-banner-mini">
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
			<slot name="progress"/>
		</div>

		<div class="wmde-banner-mini-button-group">
			<button class="wmde-banner-mini-button-preselect" @click="$emit( 'showFullPageBannerPreselected' )">
				Jetzt 10 &euro; spenden
			</button>
			<button class="wmde-banner-mini-button" @click="$emit( 'showFullPageBanner' )">
				Anderen Betrag
			</button>
		</div>

		<div class="wmde-banner-mini-payment-icons">
			<div><PayPalLogo/></div>
			<div><VisaLogo/></div>
			<div><MastercardLogo/></div>
			<div><SmsIcon/></div>
		</div>

	</div>
</template>

<script setup lang="ts">

import CloseIconMobile from '@src/components/Icons/CloseIconMobile.vue';
import PayPalLogo from '../../../archive/mobile/C23_WMDE_Mobile_DE_03/components/PaymentLogos/PayPalLogo.vue';
import VisaLogo from '../../../archive/mobile/C23_WMDE_Mobile_DE_03/components/PaymentLogos/VisaLogo.vue';
import MastercardLogo from '../../../archive/mobile/C23_WMDE_Mobile_DE_03/components/PaymentLogos/MastercardLogo.vue';
import SmsIcon from '@src/components/Icons/SmsIcon.vue';

defineEmits( [ 'showFullPageBanner', 'showFullPageBannerPreselected', 'close' ] );

</script>
