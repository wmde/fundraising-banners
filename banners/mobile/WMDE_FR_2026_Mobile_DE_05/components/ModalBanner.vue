<template>
	<div class="wmde-b-modal-banner wmde-b-modal" :class="{ 'wmde-b-modal--visible' : isVisible }">
		<header role="none" class="wmde-c-cluster">
			<div>
				<button class="wmde-b-nav-button" @click.prevent="$emit( 'close' )">
					<span class="visually-hidden">{{ $translate( 'close' ) }}</span>
					<CloseIconMobile/>
				</button>
			</div>
		</header>

		<div class="wmde-b-modal-banner__content wmde-c-flow">
			<div class="wmde-b-modal-banner__form-message">
				<slot name="banner-text"/>
			</div>

			<div class="wmde-b-modal-banner__separator">
				Jetzt sind Sie gefragt.
			</div>

			<div class="wmde-b-modal-banner__form">
				<slot name="donation-form"/>
				<slot name="footer"/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

import CloseIconMobile from '@src/components/Icons/CloseIconMobile.vue';

interface Props {
	isVisible: boolean;
}

defineProps<Props>();
defineEmits( [ 'close', 'showFundsModal' ] );

</script>
