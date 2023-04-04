<template>
	<div class="wmde-banner-slider-container">
		<div class="wmde-banner-navigation-wrapper">
			<div
				ref="container"
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

			<a v-if="withNavigation" href="#" class="wmde-banner-slider-navigation-previous" @click="goToPreviousSlide">
				<ChevronLeftIcon/>
			</a>

			<a v-if="withNavigation" href="#" class="wmde-banner-slider-navigation-next" @click="goToNextSlide">
				<ChevronRightIcon/>
			</a>

			<div class="wmde-banner-slider-pagination">
				<button
					v-for="( slotName, idx ) in usedSlotNames" :key="slotName"
					:class="[ 'wmde-banner-slider-pagination-dot', { 'is-active': currentSlide === idx } ]"
					@click="() => goToSlide( idx )"
				/>
			</div>
		</div>
	</div>

</template>

<script setup lang="ts">
import { ref, useSlots } from 'vue';
import { KeenSliderOptions, useKeenSlider } from 'keen-slider/vue';
import ChevronLeftIcon from '@src/components/Icons/ChevronLeftIcon.vue';
import ChevronRightIcon from '@src/components/Icons/ChevronRightIcon.vue';

enum SliderPlayingStates {
	PENDING = 'PENDING',
	PLAYING = 'PLAYING',
	STOPPED = 'STOPPED'
}

interface Props {
	interval: number;
	withNavigation: boolean;
	sliderOptions?: KeenSliderOptions;
}

const props = withDefaults( defineProps<Props>(), {
	sliderOptions: () => ( {} )
} );

const slots = useSlots();
const sliderPlayingState = ref<SliderPlayingStates>( SliderPlayingStates.PENDING );
const timer = ref<number>( 0 );
const [ container, slider ] = useKeenSlider( props.sliderOptions );

// TODO connect this to KeenSlider
const currentSlide = ref<number>( 0 );

const usedSlotNames = Object.keys( slots );

const stopAutoplay = (): void => {
	clearInterval( timer.value );
	sliderPlayingState.value = SliderPlayingStates.STOPPED;
};

const goToPreviousSlide = (): void => {
	slider.value.prev();
};

const goToNextSlide = (): void => {
	slider.value.next();
};

const goToSlide = ( idx: number ): void => {
	slider.value.moveToIdx( idx );
};

</script>
