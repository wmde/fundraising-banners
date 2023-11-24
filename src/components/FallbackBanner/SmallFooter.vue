<template>
	<div class="wmde-banner-fallback-small-footer">
		<KeenSliderNavigation
			:current-slide="slideIndex"
			:slide-count="slideCount"
		/>
		<div class="wmde-banner-fallback-small-footer-usage">
			<UseOfFundsLink @buttonClicked="$emit( 'use-of-funds-button-clicked' )"/>
		</div>
	</div>
</template>

<script setup lang="ts">

import UseOfFundsLink from '@src/components/FallbackBanner/UseOfFundsLink.vue';
import KeenSliderNavigation from '@src/components/Slider/KeenSliderNavigation.vue';

interface Props {
	slideIndex: number;
	slideCount: number;
}

defineProps<Props>();
defineEmits( [ 'use-of-funds-button-clicked' ] );

</script>
