<template>
	<div class="wmde-banner-mini">
		<div class="wmde-banner-mini-content">
			<div class="wmde-banner-mini-close">
				<button class="wmde-banner-mini-close-button t-close-main-banner" @click.prevent="$emit( 'close' )">
					<CloseIconCircle/>
				</button>
			</div>

			<div class="wmde-banner-mini-banner-slideshow">
				<slot name="banner-slides"/>
			</div>

			<button class="wmde-banner-mini-button" @click="$emit( 'showFullPageBanner' )">
				Donate now
			</button>

			<div class="wmde-banner-mini-payment-icons">
				<div><PayPalLogo/></div>
				<div><VisaLogo/></div>
				<div><MastercardLogo/></div>
				<div><AmexLogo/></div>
				<div><SmsIcon/></div>
			</div>

		</div>
	</div>
</template>

<script setup lang="ts">

import PayPalLogo from '@src/components/PaymentLogos/PayPalLogo.vue';
import VisaLogo from '@src/components/PaymentLogos/VisaLogo.vue';
import MastercardLogo from '@src/components/PaymentLogos/MastercardLogo.vue';
import AmexLogo from '@src/components/PaymentLogos/AmexLogo.vue';
import SmsIcon from '@src/components/Icons/SmsIcon.vue';
import CloseIconCircle from '@src/components/Icons/CloseIconCircle.vue';

defineEmits( [ 'showFullPageBanner', 'close' ] );

</script>
