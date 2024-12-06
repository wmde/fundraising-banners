<template>
	<div class="wmde-banner-full">
		<div class="wmde-banner-full-scroll">
			<div class="wmde-banner-full-inner">
				<ButtonClose @close="$emit( 'close' )">
					{{ $translate( 'close-modal' ) }} <CloseIcon/>
				</ButtonClose>
				<slot name="text"/>
				<div class="wmde-banner-full-cta">
					<slot name="cta-title"/>
					<div class="wmde-banner-full-cta-columns">
						<div class="wmde-banner-full-cta-benefits">
							<slot name="benefits"/>
						</div>
						<div class="wmde-banner-full-cta-buttons">
							<slot name="membership-buttons"/>
							<p class="wmde-banner-full-subscribe">
								<slot name="subscribe"/>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

import ButtonClose from '@src/components/ButtonClose/ButtonClose.vue';
import CloseIcon from './icons/CloseIcon.vue';

defineEmits( [ 'close' ] );

</script>
