<template>
	<div class="wmde-banner-footer">
		<div class="wmde-banner-footer-bank">
			<label class="wmde-banner-footer-bank-item account">{{ $translate('donation-account') }}:
				<SelectionInput :value="'Wikimedia'"/>
			</label>
			<label class="wmde-banner-footer-bank-item bic">BIC:
				<SelectionInput :value="'BFSWDE33BER'"/>
			</label>
			<label class="wmde-banner-footer-bank-item iban">IBAN:
				<SelectionInput
					:value="'DE33 1002 0500 0001 1947 00'"
					:focusedValue="'DE33100205000001194700'"
				/>
			</label>
		</div>

		<div class="wmde-banner-footer-usage">
			<div class="wmde-banner-footer-item">
				<a
					id="application-of-funds-link"
					class="wmde-banner-footer-usage-link t-use-of-funds-link"
					@click="$emit( 'showFundsModal' )"
				>
					{{ $translate( 'use-of-funds-link' ) }}
				</a>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import SelectionInput from '@src/components/Footer/SelectionInput.vue';
</script>

<style lang="scss">
.wmde-banner {
	&-footer {
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: flex-start;

		&-bank,
		&-usage {
			padding: 10px 0;
		}

		&-bank {
			flex: 1 1 auto;
			display: block;
			flex-wrap: nowrap;

			&-item {
				float: left;
			}
		}
	}
}
</style>
