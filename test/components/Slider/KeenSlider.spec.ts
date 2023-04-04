import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import KeenSlider from '@src/components/Slider/KeenSlider.vue';

describe( 'KeenSlider', () => {

	beforeEach( () => {
		vi.useFakeTimers();
	} );

	const getWrapper = (): VueWrapper<any> => {
		return mount( KeenSlider, {
			props: {
				withNavigation: true,
				start: false,
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

	it.todo( 'should advance the slides after the interval when the slider has started', async () => {
		const wrapper = getWrapper();

		await wrapper.setProps( { start: true } );

		await vi.advanceTimersByTimeAsync( 1000 );

		// we were not able to mock keen-slider so far because we need to return a container ref for that
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

	// We can't test this because we couldn't mock the keen slider
	it.todo( 'should stop the auto play when the slide is clicked' );
} );
