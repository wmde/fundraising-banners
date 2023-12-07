<template>
	<div class="wmde-banner-full">
		<div class="wmde-banner-full-scroll">
			<div class="wmde-banner-full-inner">
				<ButtonClose @close="$emit( 'close' )">
					{{ $translate( 'close-modal' ) }} <CloseIconDefault/>
				</ButtonClose>
				<slot name="text"/>
				<div class="wmde-banner-full-cta">
					<div class="wmde-banner-full-cta-columns">
						<div class="wmde-banner-full-cta-benefits">
							<slot name="benefits"/>
							<p class="wmde-banner-full-subscribe">
								<slot name="subscribe"/>
							</p>
						</div>
						<div class="wmde-banner-full-cta-buttons">
							<slot name="membership-buttons"/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

import ButtonClose from '@src/components/ButtonClose/ButtonClose.vue';
import CloseIconDefault from '@src/components/Icons/CloseIconDefault.vue';

defineEmits( [ 'close' ] );

</script>
