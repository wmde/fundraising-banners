<template>
	<div class="wmde-banner-footer">
		<div class="wmde-banner-footer-bank">
			<label class="wmde-banner-footer-bank-item account">{{ $translate( 'donation-account' ) }}:
				<SelectionInput :value="'Wikimedia e. V.'"/>
			</label>
			<label class="wmde-banner-footer-bank-item bic">BIC:
				<SelectionInput :value="'BFSWDE33XXX'"/>
			</label>
			<label class="wmde-banner-footer-bank-item iban">IBAN:
				<SelectionInput :value="'DE09 3702 0500 0003 2873 00'" :focusedValue="'DE09370205000003287300'"/>
			</label>
			<a
				href="#"
				class="wmde-banner-footer-already-donated"
				@click.prevent="onClickAlreadyDonated"
				:title="$translate( 'already-donated-description' )"
			>
				<TickIcon/> {{ $translate( 'already-donated-link' ) }}
			</a>
		</div>
	</div>
</template>

<script setup lang="ts">
/**
 * This footer contains a link (button behavior) (#wmde-banner-footer-already-donated) that closes the banner
 */

import SelectionInput from '@src/components/Footer/SelectionInput.vue';
import TickIcon from '@src/components/Icons/TickIcon.vue';

const emit = defineEmits( [ 'clickedAlreadyDonatedLink' ] );

const onClickAlreadyDonated = (): void => {
	emit( 'clickedAlreadyDonatedLink' );
};
</script>
