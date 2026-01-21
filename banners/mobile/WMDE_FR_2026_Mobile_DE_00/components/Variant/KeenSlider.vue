<template>
	<div class="wmde-b-slider" :class="sliderPlayingState" @mousedown="stopAutoplay" @touchstart="stopAutoplay">
		<div ref="container" class="keen-slider wmde-b-slider__slides">
			<slot name="slides" :current-slide="currentSlide"/>
		</div>

		<button v-if="withNavigation" type="button" class="wmde-b-slider__previous-slide" @click.prevent="goToPreviousSlide">
			<span class="visually-hidden">{{ $translate( 'previous-slide' ) }}</span>
			<slot name="previous-slide-icon">
				<ChevronLeftIcon/>
			</slot>
		</button>
		<button v-if="withNavigation" type="button" class="wmde-b-slider__next-slide" @click.prevent="goToNextSlide">
			<span class="visually-hidden">{{ $translate( 'next-slide' ) }}</span>
			<slot name="next-slide-icon">
				<ChevronRightIcon/>
			</slot>
		</button>

		<ul role="tablist" class="wmde-b-slider__pagination" v-if="withPagination">
			<li role="presentation" v-for="index in slider?.slides.length" :key="index">
				<button
					role="tab"
					class="wmde-b-slider__pagination-item"
					:class="{ 'wmde-b-slider__pagination-item--active' : currentSlide === index - 1 }"
					@click="() => goToSlide( index - 1 )"
					:aria-selected="currentSlide === index - 1"
					:aria-controls="`wmde-banner-slide-${ index - 1 }`"
				>
					<span class="visually-hidden">{{ $translate( 'slide-page', { page: index, total: slider?.slides.length } ) }}</span>
				</button>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref, watch } from 'vue';
import { KeenSliderOptions, useKeenSlider } from 'keen-slider/vue';
import { Timer } from '@src/utils/Timer';
import ChevronLeftIcon from '@src/components/Icons/ChevronLeftIcon.vue';
import ChevronRightIcon from '@src/components/Icons/ChevronRightIcon.vue';

enum SliderPlayingStates {
	PENDING = 'wmde-b-slider--pending',
	PLAYING = 'wmde-b-slider--playing',
	STOPPED = 'wmde-b-slider--stopped'
}

interface Props {
	interval?: number;
	startDelay?: number;
	withNavigation?: boolean;
	withPagination?: boolean;
	sliderOptions?: KeenSliderOptions;
	play?: boolean;
}

const props = withDefaults( defineProps<Props>(), {
	sliderOptions: () => ( {} ),
	interval: 5000,
	startDelay: 0,
	withPagination: true,
	withNavigation: true,
	play: false,
} );

const emit = defineEmits( [ 'slide-changed' ] );
const sliderPlayingState = ref<SliderPlayingStates>( SliderPlayingStates.PENDING );
const startAnimationTimeout = ref<number>( 0 );
const timer = inject<Timer>( 'timer' );
const timerId = ref<number>( 0 );

const currentSlide = ref<number>( 0 );

const [ container, slider ] = useKeenSlider( {
	...props.sliderOptions,
	initial: 0,
	loop: false,
	slideChanged: ( s ) => {
		currentSlide.value = s.track.details.rel;
		emit( 'slide-changed', currentSlide.value, s.slides.length );
	}
} );

const startAutoplay = (): void => {
	if ( sliderPlayingState.value === SliderPlayingStates.PLAYING ) {
		return;
	}
	startAnimationTimeout.value = timer.setTimeout( () => {
		timerId.value = timer.setInterval( slider.value.next, props.interval );
		sliderPlayingState.value = SliderPlayingStates.PLAYING;
	}, props.startDelay );
};

const stopAutoplay = (): void => {
	timer.clearInterval( timerId.value );
	timer.clearTimeout( startAnimationTimeout.value );
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

onMounted( () => {
	emit( 'slide-changed', currentSlide.value, slider.value.slides.length );
} );

onUnmounted( stopAutoplay );

</script>
