import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { VueWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import KeenSlider from '@src/components/Slider2026/KeenSlider.vue';
import { nextTick } from 'vue';
import { TimerStub } from '@test/fixtures/TimerStub';
import type { Timer } from '@src/utils/Timer';
import { TimerSpy } from '@test/fixtures/TimerSpy';

describe( 'KeenSlider', () => {

	beforeEach( () => {
		vi.useFakeTimers();
	} );

	afterEach( () => {
		vi.restoreAllMocks();
		vi.useRealTimers();
	} );

	const getWrapper = ( timer: Timer = null ): VueWrapper<any> => {
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
			},
			global: {
				mocks: {
					$translate: ( key: string ) => key
				},
				provide: {
					timer: timer ?? new TimerStub()
				}
			}
		} );
	};

	it( 'should mark the first slide as the current slide on initialization', () => {
		const wrapper = getWrapper();

		const firstSlideContent = wrapper.find( '.wmde-banner-slide-content' );

		expect( firstSlideContent.attributes().class ).toContain( 'wmde-banner-slide--current' );
	} );

	it( 'should advance the slides after the interval when the slider has started', async () => {
		const timerSpy = new TimerSpy();
		timerSpy.setTimeout = ( fn: () => void ): number => {
			fn();
			return 0;
		};

		const wrapper = getWrapper( timerSpy );
		await wrapper.setProps( { play: true } );

		expect( timerSpy.setIntervalCalls.length ).toStrictEqual( 1 );
		expect( timerSpy.setIntervalCalls[ 0 ] ).toStrictEqual( 200 );
	} );

	/**
	 * We can't test this as it requires an internal function in Keen that waits for the slide animation
	 * which seems to take a very long time in the test environment.
	 */
	it.skip( 'should emit when the slide changes', async () => {
		const wrapper = getWrapper();
		await wrapper.setProps( { play: true } );

		await wrapper.find( '.wmde-banner-slider-navigation-next' ).trigger( 'click' );

		expect( wrapper.emitted( 'slide-changed' ).length ).toBe( 1 );
		expect( wrapper.emitted( 'slide-changed' )[ 0 ][ 0 ] ).toBe( 1 );
	} );

	it( 'should start after a delay if one is passed', async () => {
		const timerSpy = new TimerSpy();
		const wrapper = getWrapper( timerSpy );

		await wrapper.setProps( { startDelay: 100 } );
		await wrapper.setProps( { play: true } );

		expect( timerSpy.setTimeoutCalls.length ).toStrictEqual( 1 );
		expect( timerSpy.setTimeoutCalls[ 0 ] ).toStrictEqual( 100 );
	} );

	it( 'should show a pagination dot for each exising slide', async () => {
		const wrapper = getWrapper();

		await nextTick();
		const paginationElements = wrapper.findAll( '.wmde-b-slider__pagination-item' );

		expect( paginationElements.length ).toBe( 2 );
		expect( paginationElements[ 0 ].attributes().class ).toContain( 'wmde-b-slider__pagination-item--active' );
	} );

	it( 'should render navigation', async function () {
		const wrapper = getWrapper();

		await wrapper.setProps( { withNavigation: false } );

		expect( wrapper.find( '.wmde-b-slider__previous-slide' ).exists() ).toBe( false );
		expect( wrapper.find( '.wmde-b-slider__next-slide' ).exists() ).toBe( false );

		await wrapper.setProps( { withNavigation: true } );

		expect( wrapper.find( '.wmde-b-slider__previous-slide' ).exists() ).toBe( true );
		expect( wrapper.find( '.wmde-b-slider__next-slide' ).exists() ).toBe( true );
	} );

	it( 'should render pagination', async function () {
		const wrapper = getWrapper();

		await wrapper.setProps( { withPagination: false } );

		expect( wrapper.find( '.wmde-b-slider__pagination' ).exists() ).toBeFalsy();

		await wrapper.setProps( { withPagination: true } );

		expect( wrapper.find( '.wmde-b-slider__pagination' ).exists() ).toBeTruthy();
	} );

	it( 'should stop the auto play when the slider is clicked', async () => {
		const wrapper = getWrapper();

		await wrapper.find( '.wmde-b-slider' ).trigger( 'mousedown' );

		expect( wrapper.find( '.wmde-b-slider--stopped' ).exists() ).toBeTruthy();
	} );

	it( 'should stop the auto play when the slider is touched', async () => {
		const wrapper = getWrapper();
		await wrapper.setProps( { play: true } );

		await wrapper.find( '.wmde-b-slider' ).trigger( 'touchstart' );

		expect( wrapper.find( '.wmde-b-slider--stopped' ).exists() ).toBeTruthy();
	} );

	it( 'should stop the auto play when a pagination dot is clicked', async () => {
		const wrapper = getWrapper();
		await wrapper.setProps( { play: true } );

		await wrapper.find( '.wmde-b-slider__pagination li:nth-child(2) button' ).trigger( 'click' );

		expect( wrapper.find( '.wmde-b-slider--stopped' ).exists() ).toBeTruthy();
	} );

	it( 'should stop the auto play when previous is clicked', async () => {
		const wrapper = getWrapper();
		await wrapper.setProps( { play: true } );

		await wrapper.find( '.wmde-b-slider__previous-slide' ).trigger( 'click' );

		expect( wrapper.find( '.wmde-b-slider--stopped' ).exists() ).toBeTruthy();
	} );

	it( 'should stop the auto play when next is clicked', async () => {
		const wrapper = getWrapper();
		await wrapper.setProps( { play: true } );

		await wrapper.find( '.wmde-b-slider__next-slide' ).trigger( 'click' );

		expect( wrapper.find( '.wmde-b-slider--stopped' ).exists() ).toBeTruthy();
	} );

	it( 'should stop the auto play when unmounted', async () => {
		const timerSpy = new TimerSpy();
		const wrapper = getWrapper( timerSpy );
		await wrapper.setProps( { play: true } );
		wrapper.unmount();

		expect( timerSpy.clearIntervalIds ).toStrictEqual( [ 0 ] );
		expect( timerSpy.clearTimeoutIds ).toStrictEqual( [ 0 ] );
	} );

	it( 'removed navigation from the tab order when tabbable is false', async () => {
		const wrapper = getWrapper();
		await nextTick();

		expect( wrapper.find( '.wmde-b-slider__previous-slide' ).attributes( 'tabindex' ) ).toBeUndefined();
		expect( wrapper.find( '.wmde-b-slider__next-slide' ).attributes( 'tabindex' ) ).toBeUndefined();
		let paginationElements = wrapper.findAll( '.wmde-b-slider__pagination-item' );
		expect( paginationElements[ 0 ].attributes( 'tabindex' ) ).toBeUndefined();
		expect( paginationElements[ 1 ].attributes( 'tabindex' ) ).toBeUndefined();

		await wrapper.setProps( { tabbable: false } );
		await nextTick();

		expect( wrapper.find( '.wmde-b-slider__previous-slide' ).attributes( 'tabindex' ) ).toStrictEqual( '-1' );
		expect( wrapper.find( '.wmde-b-slider__next-slide' ).attributes( 'tabindex' ) ).toStrictEqual( '-1' );
		paginationElements = wrapper.findAll( '.wmde-b-slider__pagination-item' );
		expect( paginationElements[ 0 ].attributes( 'tabindex' ) ).toStrictEqual( '-1' );
		expect( paginationElements[ 1 ].attributes( 'tabindex' ) ).toStrictEqual( '-1' );
	} );
} );
