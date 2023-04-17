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
import { ref, useSlots, watch } from 'vue';
import { KeenSliderOptions, useKeenSlider } from 'keen-slider/vue';
import ChevronLeftIcon from '@src/components/Icons/ChevronLeftIcon.vue';
import ChevronRightIcon from '@src/components/Icons/ChevronRightIcon.vue';

enum SliderPlayingStates {
	PENDING = 'PENDING',
	PLAYING = 'PLAYING',
	STOPPED = 'STOPPED'
}

interface Props {
	interval?: number;
	withNavigation: boolean;
	sliderOptions?: KeenSliderOptions;
	start?: boolean;
}

const props = withDefaults( defineProps<Props>(), {
	sliderOptions: () => ( {} ),
	interval: 5000,
	start: false
} );

const slots = useSlots();
const sliderPlayingState = ref<SliderPlayingStates>( SliderPlayingStates.PENDING );
const timer = ref<number>( 0 );

const currentSlide = ref<number>( 0 );

const [ container, slider ] = useKeenSlider( {
	...props.sliderOptions,
	initial: 0,
	loop: true,
	slideChanged: ( s ) => {
		currentSlide.value = s.track.details.rel;
	}
} );

const usedSlotNames = Object.keys( slots );

const startAutoplay = (): void => {
	if ( sliderPlayingState.value === SliderPlayingStates.PLAYING ) {
		return;
	}
	timer.value = window.setInterval( slider.value.next, props.interval );
	sliderPlayingState.value = SliderPlayingStates.PLAYING;
};

const stopAutoplay = (): void => {
	clearInterval( timer.value );
	sliderPlayingState.value = SliderPlayingStates.STOPPED;
};

watch( () => props.start, ( newValue: boolean, oldValue: boolean ) => {
	if ( oldValue === false && newValue === true ) {
		startAutoplay();
	} else if ( oldValue === true && newValue === false ) {
		stopAutoplay();
	}
} );

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
