<template>
	<div class="wmde-banner-full">
		<div class="wmde-banner-full-content">
			<button class="wmde-banner-full-close" @click.prevent="$emit( 'close' )">
				<CloseIconMobile/>
			</button>
			<div class="wmde-banner-full-info">
				<slot name="banner-text"/>
				<slot name="progress"/>
			</div>
			<div class="wmde-banner-full-call-to-action">
				Jetzt sind Sie <span class="wmde-banner-full-call-to-action-optional-text">in Deutschland</span> gefragt.
			</div>

			<slot name="donation-form"/>

			<div class="wmde-banner-full-small-print">
				<span>
					<a
						id="application-of-funds-link"
						class="wmde-banner-footer-usage-link t-use-of-funds-link"
						@click="$emit( 'showFundsModal' )"
					>
						{{ $translate( 'use-of-funds-link' ) }}
					</a>
				</span>
			</div>

			<slot name="footer"/>
		</div>
	</div>
</template>

<script setup lang="ts">

import CloseIconMobile from '@src/components/Icons/CloseIconMobile.vue';

defineEmits( [ 'close', 'showFundsModal' ] );

</script>
