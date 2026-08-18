<template>
	<div
		class="keen-slider__slide wmde-b-slider__slide"
		:id="`wmde-banner-slide-${index}`"
		:aria-current="currentSlide === index ? true : null"
		:aria-hidden="currentSlide !== index ? true : null"
	>
		<slot/>
	</div>
</template>

<script setup lang="ts">
interface Props {
	currentSlide: number;
	index: number;
}

defineProps<Props>();
</script>
