<template>
	<div class="wmde-banner-footer">
		<div class="wmde-banner-footer-bank">
			<ContentCopier :label="$translate( 'donation-account' )" value="Wikimedia e. V."/>
			<ContentCopier label="BIC" value="BFSWDE33XXX"/>
			<ContentCopier label="IBAN" value="DE09 3702 0500 0003 2873 00" copy-value="DE09370205000003287300"/>
		</div>

		<div v-if="showFundsLink" class="wmde-banner-footer-usage">
			<div class="wmde-banner-footer-item">
				<a
					id="application-of-funds-link"
					class="wmde-banner-footer-usage-link t-use-of-funds-link"
					@click.prevent="$emit( 'showFundsModal' )"
					:title="$translate( 'use-of-funds-link-description' )"
				>
					{{ $translate( 'use-of-funds-link' ) }}
				</a>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import ContentCopier from '@src/components/ContentCopier/ContentCopier.vue';

interface Props {
	showFundsLink?: boolean
}

withDefaults( defineProps<Props>(), {
	showFundsLink: true
} );

defineEmits( [ 'showFundsModal' ] );
</script>
