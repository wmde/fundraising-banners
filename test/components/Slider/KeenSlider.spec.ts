import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import KeenSlider from '@src/components/Slider/KeenSlider.vue';
import { nextTick } from 'vue';

describe( 'KeenSlider', () => {

	beforeEach( () => {
		vi.useFakeTimers();
	} );

	afterEach( () => {
		vi.restoreAllMocks();
		vi.useRealTimers();
	} );

	const getWrapper = (): VueWrapper<any> => {
		return mount( KeenSlider, {
			props: {
				withNavigation: true,
				play: false,
				interval: 200
			},
			slots: {
				slides: `<template #slides="{ currentSlide }">
					<div class="wmde-banner-slide keen-slider__slide">
						<div class="wmde-banner-slide-content keen-slider__slide-content" :class="{ 'wmde-banner-slide--current': currentSlide === 0 }">First Slide</div>
					</div>
					<div class="wmde-banner-slide keen-slider__slide">
						<div class="wmde-banner-slide-content keen-slider__slide-content" :class="{ 'wmde-banner-slide--current': currentSlide === 1 }">Second Slide</div>
					</div>
				</template>`
			}
		} );
	};

	it( 'should mark the first slide as the current slide on initialization', () => {
		const wrapper = getWrapper();

		const firstSlideContent = wrapper.find( '.wmde-banner-slide-content' );

		expect( firstSlideContent.attributes().class ).toContain( 'wmde-banner-slide--current' );
	} );

	// Keen seems to be slow in transitioning between slides so while the slider has started to move
	// it takes a long time until the transition ends. That means this test is pretty brittle
	it.todo( 'should advance the slides after the interval when the slider has started', async () => {
		const wrapper = getWrapper();

		await wrapper.setProps( { play: true } );

		await vi.advanceTimersByTimeAsync( 199 );
		expect( wrapper.find( '.wmde-banner-slide:nth-child(1) .wmde-banner-slide--current' ).exists() ).toBeTruthy();

		await vi.advanceTimersByTimeAsync( 2 );
		expect( wrapper.find( '.wmde-banner-slide:nth-child(2) .wmde-banner-slide--current' ).exists() ).toBeTruthy();
	} );

	it.todo( 'should emit when the slide changes', async () => {
		const wrapper = getWrapper();
		await wrapper.setProps( { play: true } );

		await wrapper.find( '.wmde-banner-slider-navigation-next' ).trigger( 'click' );
		await vi.advanceTimersByTimeAsync( 200 );

		expect( wrapper.emitted( 'slide-changed' ).length ).toBe( 1 );
		expect( wrapper.emitted( 'slide-changed' )[ 0 ][ 0 ] ).toBe( 1 );
	} );

	it( 'should start after a delay if one is passed', async () => {
		const wrapper = getWrapper();

		await wrapper.setProps( { startDelay: 100 } );
		await wrapper.setProps( { play: true } );

		await vi.advanceTimersByTimeAsync( 99 );
		expect( wrapper.find( '.wmde-banner-slider--pending' ).exists() ).toBeTruthy();

		await vi.advanceTimersByTimeAsync( 2 );
		expect( wrapper.find( '.wmde-banner-slider--playing' ).exists() ).toBeTruthy();
	} );

	it( 'should show a pagination dot for each exising slide', async () => {
		const wrapper = getWrapper();

		await nextTick();
		const paginationElements = wrapper.findAll( '.wmde-banner-slider-pagination-dot' );

		expect( paginationElements.length ).toBe( 2 );
		expect( paginationElements[ 0 ].attributes().class ).toContain( 'is-active' );
	} );

	it( 'should render navigation', async function () {
		const wrapper = getWrapper();

		await wrapper.setProps( { withNavigation: false } );

		expect( wrapper.find( '.wmde-banner-slider-navigation-previous' ).exists() ).toBe( false );
		expect( wrapper.find( '.wmde-banner-slider-navigation-next' ).exists() ).toBe( false );

		await wrapper.setProps( { withNavigation: true } );

		expect( wrapper.find( '.wmde-banner-slider-navigation-previous' ).exists() ).toBe( true );
		expect( wrapper.find( '.wmde-banner-slider-navigation-next' ).exists() ).toBe( true );
	} );

	it( 'should render pagination', async function () {
		const wrapper = getWrapper();

		await wrapper.setProps( { withPagination: false } );

		expect( wrapper.find( '.wmde-banner-slider-pagination' ).exists() ).toBeFalsy();

		await wrapper.setProps( { withPagination: true } );

		expect( wrapper.find( '.wmde-banner-slider-pagination' ).exists() ).toBeTruthy();
	} );

	it( 'should stop the auto play when the slider is clicked', async () => {
		const wrapper = getWrapper();

		await wrapper.find( '.wmde-banner-slider-container' ).trigger( 'mousedown' );

		expect( wrapper.find( '.wmde-banner-slider--stopped' ).exists() ).toBeTruthy();
	} );

	it( 'should stop the auto play when the slider is touched', async () => {
		const wrapper = getWrapper();
		await wrapper.setProps( { play: true } );

		await wrapper.find( '.wmde-banner-slider-container' ).trigger( 'touchstart' );

		expect( wrapper.find( '.wmde-banner-slider--stopped' ).exists() ).toBeTruthy();
	} );

	it( 'should stop the auto play when a pagination dot is clicked', async () => {
		const wrapper = getWrapper();
		await wrapper.setProps( { play: true } );

		await wrapper.find( '.wmde-banner-slider-pagination button:nth-child(2)' ).trigger( 'click' );

		expect( wrapper.find( '.wmde-banner-slider--stopped' ).exists() ).toBeTruthy();
	} );

	it( 'should stop the auto play when previous is clicked', async () => {
		const wrapper = getWrapper();
		await wrapper.setProps( { play: true } );

		await wrapper.find( '.wmde-banner-slider-navigation-previous' ).trigger( 'click' );

		expect( wrapper.find( '.wmde-banner-slider--stopped' ).exists() ).toBeTruthy();
	} );

	it( 'should stop the auto play when next is clicked', async () => {
		const wrapper = getWrapper();
		await wrapper.setProps( { play: true } );

		await wrapper.find( '.wmde-banner-slider-navigation-next' ).trigger( 'click' );

		expect( wrapper.find( '.wmde-banner-slider--stopped' ).exists() ).toBeTruthy();
	} );
} );
