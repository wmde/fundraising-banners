<template>
	<KeenSlider :interval="1" :with-navigation="true">
		<template #slides-1><div>First slide</div></template>
		<template #slides-2><div>Second slide</div></template>
	</KeenSlider>
</template>

<script setup lang="ts">
import KeenSlider from '@src/components/Slider/KeenSlider.vue';
</script>
