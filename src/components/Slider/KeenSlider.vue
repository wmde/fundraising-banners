<template>
	<div class="wmde-banner-slider-container">
		<div class="wmde-banner-navigation-wrapper">
			<div
				class="keen-slider wmde-banner-slider"
				@mousedown="stopAutoplay"
				@touchstart="stopAutoplay"
			>
				<template v-for="( slotName, idx ) in usedSlotNames" :key="slotName">
					<div class="keen-slider__slide wmde-banner-slide">
						<div :class="[
							'keen-slider__slide-content',
							'wmde-banner-slide-content',
							{ 'wmde-banner-slide--current': currentSlide === idx }
						]">
							<slot :name="slotName"/>
						</div>
					</div>
				</template>
			</div>

			<a v-if="previous" href="#" class="wmde-banner-slider-navigation-previous" @click="gotoPreviousSlide">
				{{ previous }}
			</a>

			<a v-if="next" href="#" class="wmde-banner-slider-navigation-next" @click="gotoNextSlide">
				{{ next }}
			</a>

			<div class="wmde-banner-slider-pagination">
				<button
					v-for="(slotName, idx) in usedSlotNames" :key="slotName"
					:class="[ 'wmde-banner-slider-pagination-dot', { 'is-active': currentSlide === idx } ]"
					@click="() => goToSlide( idx )"
				/>
			</div>
		</div>
	</div>

</template>

<script setup lang="ts">
import { ref, useSlots } from 'vue';
import { KeenSliderOptions } from 'keen-slider/vue';

interface Props {
	interval: number;
	sliderOptions?: KeenSliderOptions;
}

withDefaults( defineProps<Props>(), {
	sliderOptions: () => ( {} )
} );

const slots = useSlots();

// TODO connect this to KeenSlider
const currentSlide = ref<number>( 0 );

const usedSlotNames = Object.keys( slots );

const stopAutoplay = () => {
	clearInterval( timer );
	sliderPlayingState = SliderPlayingStates.STOPPED;
};
</script>
