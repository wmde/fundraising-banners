<template>
	<KeenSliderSlide :is-current="currentSlide === 0">
		<p>
			Lorem ipsum dolor:
		</p>
		<ProgressBar amount-to-show-on-right="TARGET"/>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 1">
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores eos est eum expedita incidunt.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 2">
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores eos est eum expedita incidunt.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 3">
		<FallbackBank/>
	</KeenSliderSlide>
</template>

<script setup lang="ts">
import KeenSliderSlide from '@src/components/Slider/KeenSliderSlide.vue';
import ProgressBar from '@src/components/ProgressBar/ProgressBar.vue';
import FallbackBank from '@src/components/FallbackBanner/FallbackBank.vue';

interface Props {
	currentSlide: number
}

defineProps<Props>();

</script>
