<template>
	<div
		class="wmde-banner-slider-container"
		@mousedown="stopAutoplay"
		@touchstart="stopAutoplay"
	>
		<div class="wmde-banner-navigation-wrapper">

			<div ref="container" class="keen-slider wmde-banner-slider" :class="sliderPlayingState">
				<slot name="slides" :currentSlide="currentSlide"/>
			</div>

			<a v-if="withNavigation" href="#" class="wmde-banner-slider-navigation-previous" @click.prevent="goToPreviousSlide">
				<slot name="left-icon" class="wmde-banner-slider-icon-left">
					<ChevronLeftIcon/>
				</slot>
			</a>

			<a v-if="withNavigation" href="#" class="wmde-banner-slider-navigation-next" @click.prevent="goToNextSlide">
				<slot name="right-icon" class="wmde-banner-slider-icon-left">
					<ChevronRightIcon/>
				</slot>
			</a>
		</div>

		<div class="wmde-banner-slider-pagination">
			<button
				v-for="idx in slider?.slides.length" :key="idx"
				:class="[ 'wmde-banner-slider-pagination-dot', { 'is-active': currentSlide === idx - 1 } ]"
				@click="() => goToSlide( idx - 1 )"
			/>
		</div>
	</div>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { KeenSliderOptions, useKeenSlider } from 'keen-slider/vue';
import ChevronLeftIcon from '@src/components/Icons/ChevronLeftIcon.vue';
import ChevronRightIcon from '@src/components/Icons/ChevronRightIcon.vue';

enum SliderPlayingStates {
	PENDING = 'wmde-banner-slider--pending',
	PLAYING = 'wmde-banner-slider--playing',
	STOPPED = 'wmde-banner-slider--stopped'
}

interface Props {
	interval?: number;
	withNavigation: boolean;
	sliderOptions?: KeenSliderOptions;
	play?: boolean;
}

const props = withDefaults( defineProps<Props>(), {
	sliderOptions: () => ( {} ),
	interval: 5000,
	play: false
} );

const sliderPlayingState = ref<SliderPlayingStates>( SliderPlayingStates.PENDING );
const timer = ref<number>( 0 );

const currentSlide = ref<number>( 0 );

const [ container, slider ] = useKeenSlider( {
	...props.sliderOptions,
	initial: 0,
	loop: false,
	slideChanged: ( s ) => {
		currentSlide.value = s.track.details.rel;
	}
} );

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

watch( () => props.play, ( newValue: boolean, oldValue: boolean ) => {
	if ( oldValue === false && newValue === true ) {
		startAutoplay();
	} else if ( oldValue === true && newValue === false ) {
		stopAutoplay();
	}
} );

const goToPreviousSlide = (): void => {
	stopAutoplay();
	slider.value.prev();
};

const goToNextSlide = (): void => {
	stopAutoplay();
	slider.value.next();
};

const goToSlide = ( idx: number ): void => {
	stopAutoplay();
	slider.value.moveToIdx( idx );
};

</script>
