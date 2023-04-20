import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import KeenSlider from '@src/components/Slider/KeenSlider.vue';

describe( 'KeenSlider', () => {

	beforeEach( () => {
		vi.useFakeTimers();
	} );

	afterEach( () => {
		vi.restoreAllMocks();
	} );

	const getWrapper = (): VueWrapper<any> => {
		return mount( KeenSlider, {
			props: {
				withNavigation: true,
				play: false,
				interval: 200
			},
			slots: {
				slide1: 'First Slide',
				slide2: 'Second Slide'
			}
		} );
	};

	it( 'should display the slides and wrap them', () => {
		const wrapper = getWrapper();

		const slideElements = wrapper.findAll( '.wmde-banner-slide' );
		const firstSlide = wrapper.find( '.wmde-banner-slide' );
		const firstSlideContent = firstSlide.find( '.wmde-banner-slide-content' );

		expect( slideElements.length ).toBe( 2 );
		expect( firstSlide.attributes().class ).toContain( 'keen-slider__slide' );
		expect( firstSlideContent.text() ).toBe( 'First Slide' );
	} );

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
		await vi.advanceTimersByTimeAsync( 400 );

		expect( wrapper.find( '.wmde-banner-slide:nth-child(2) .wmde-banner-slide--current' ).exists ).toBeTruthy();
	} );

	it( 'should show a pagination dot for each exising slide', async () => {
		const wrapper = getWrapper();

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
