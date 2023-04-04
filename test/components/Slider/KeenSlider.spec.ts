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

	it( 'should advance the slides after the interval when the slider has started', async () => {
		const wrapper = getWrapper();

		await wrapper.setProps( { start: true } );

		await vi.advanceTimersByTimeAsync( 405 );

		// TODO mock useKeenSlider and slider.next
	} );

} );
