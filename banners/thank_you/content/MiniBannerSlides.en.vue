<template>
	<KeenSliderSlide :is-current="currentSlide === 0">
		<p><strong>Lesen Sie unsere Dankesbotschaft</strong></p>
		<slot name="progress"/>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 1">
		<p><strong>345.123 Menschen</strong> haben gespendet und Wikipedia ihre Wertschätzung erwiesen.</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 2">
		<HeartIcon/>
		<p>Ihnen danken wir von ganzem Herzen!</p>
	</KeenSliderSlide>
</template>

<script setup lang="ts">
import KeenSliderSlide from '@src/components/Slider/KeenSliderSlide.vue';
import HeartIcon from '../components/icons/HeartIcon.vue';

interface Props {
	currentSlide: number
}

defineProps<Props>();

</script>
