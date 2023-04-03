<template>
	<template v-for="(slotName, idx) in usedSlotNames" :key="slotName">
		<div class="keen-slider__slide wmde-banner-slide">
			<div :class="[
				'keen-slider__slide-content',
				'wmde-banner-slide-content',
				{'wmde-banner-slide--current': currentSlide === idx}
				]">
				<slot :name="slotName" />
			</div>
		</div>
	</template>

</template>

<script setup lang="ts">
import { useSlots, ref } from 'vue';

const slots = useSlots();

// TODO connect this to KeenSlider
const currentSlide = ref<number>( 0 );

const usedSlotNames = Object.keys( slots );

</script>
