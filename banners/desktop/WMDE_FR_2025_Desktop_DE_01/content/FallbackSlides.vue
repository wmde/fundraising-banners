<template>
	<KeenSliderSlide :is-current="currentSlide === 0">
		<p>
			Hat Wikipedia Ihnen Wissen im Wert einer Tasse Kaffee geschenkt?
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 1">
		<p>
			Dann entscheiden Sie sich, etwas zurückzugeben. Danke!
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 2">
		<FallbackBank/>
	</KeenSliderSlide>
</template>

<script setup lang="ts">
import KeenSliderSlide from '@src/components/Slider/KeenSliderSlide.vue';
import FallbackBank from '@src/components/FallbackBanner/FallbackBank.vue';

interface Props {
	currentSlide: number
}

defineProps<Props>();

</script>
