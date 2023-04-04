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

<style lang="scss">
.wmde-banner {
	&-slider-container {
		width: 100%;
		height: 100%;
		position: relative;
	}
	&-navigation-wrapper {
		display: flex;
		align-items: center;
		overflow: hidden;
		width: 100%;
		height: 100%;
		position: relative;
	}
	&-slider {
		width: 100%;
		display: flex;
		overflow: hidden;
		position: relative;
	}
	&-slide {
		cursor: grab;
		width: 100%;
		min-height: 100%;
		min-width: 100%;
		max-width: 100%;
		transform: translate3d( 0, 0, 0 );

		&-content {
			display: flex;
			align-items: center;

			> div {
				width: 100%;
			}
		}
	}
	&-slider-navigation-next,
	&-slider-navigation-previous {
		position: absolute;
		display: block;
		height: 30px;
		width: 30px;
		padding: 5px 8px;
		line-height: 30px;
		top: 50%;
		margin-top: -15px;
	}

	&-slider-navigation-previous {
		left: 0;
		text-align: left;
	}
	&-slider-navigation-next {
		right: 0;
		text-align: right;
	}

	&-slider-pagination {
		position: absolute;
		bottom: 0;
		display: flex;
		justify-content: center;
		z-index: 999;
		width: 100%;
		height: 15px;
		padding: 0;
		margin: 0;
		text-align: center;
		line-height: 1;

		&-dot {
			display: inline-block;
			cursor: pointer;
			padding: 0;
		}
	}
}
</style>
