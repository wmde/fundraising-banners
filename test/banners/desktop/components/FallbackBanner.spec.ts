import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import FallbackBanner from '../../../../banners/desktop/components/FallbackBanner.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { useOfFundsContent } from '@test/banners/useOfFundsContent';
import { newDynamicContent } from '@test/banners/dynamicCampaignContent';
import { CloseChoices } from '@src/domain/CloseChoices';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { Tracker } from '@src/tracking/Tracker';
import { TrackerStub } from '@test/fixtures/TrackerStub';
import { TrackerSpy } from '@test/fixtures/TrackerSpy';
import { FallbackBannerSubmitEvent } from '@src/tracking/events/FallbackBannerSubmitEvent';

const translator = ( key: string ): string => key;

describe( 'FallbackBanner.vue', () => {

	beforeEach( () => {
		vi.useFakeTimers();
	} );

	afterEach( () => {
		vi.useRealTimers();
	} );

	const getWrapperAtWidth = ( width: number, dynamicContent: DynamicContent = null, tracker: Tracker = null ): VueWrapper<any> => {
		Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: width } );
		return mount( FallbackBanner, {
			props: {
				bannerState: BannerStates.Pending,
				useOfFundsContent,
				donationLink: 'https://spenden.wikimedia.de'
			},
			global: {
				mocks: {
					$translate: translator
				},
				provide: {
					translator: { translate: translator },
					dynamicCampaignText: dynamicContent ?? newDynamicContent(),
					tracker: tracker ?? new TrackerStub()
				}
			}
		} );
	};

	it( 'shows the small banner under 800px', () => {
		const wrapper = getWrapperAtWidth( 799 );

		expect( wrapper.find( '.wmde-banner-fallback-small' ).exists() ).toBeTruthy();
		expect( wrapper.find( '.wmde-banner-fallback-large' ).exists() ).toBeFalsy();
	} );

	it( 'shows the large banner over 800px', () => {
		const wrapper = getWrapperAtWidth( 800 );

		expect( wrapper.find( '.wmde-banner-fallback-small' ).exists() ).toBeFalsy();
		expect( wrapper.find( '.wmde-banner-fallback-large' ).exists() ).toBeTruthy();
	} );

	it( 'emits the banner close event', async () => {
		const wrapper = getWrapperAtWidth( 799 );

		await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );

		expect( wrapper.emitted( 'bannerClosed' ).length ).toStrictEqual( 1 );
		expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toStrictEqual( new CloseEvent( 'FallbackBanner', CloseChoices.Close ) );
	} );

	it( 'plays the slideshow when the banner becomes visible', async () => {
		const wrapper = getWrapperAtWidth( 799 );

		await wrapper.setProps( { bannerState: BannerStates.Visible } );
		await vi.runOnlyPendingTimersAsync();

		expect( wrapper.find( '.wmde-banner-slider--playing' ).exists() ).toBeTruthy();
	} );

	it( 'shows the animated text in the message', async () => {
		const dynamicContent = newDynamicContent();
		dynamicContent.visitorsVsDonorsSentence = 'Visitors vs donors sentence';
		const wrapper = getWrapperAtWidth( 800, dynamicContent );

		expect( wrapper.find( '.wmde-banner-message .wmde-banner-text-animated-highlight' ).exists() ).toBeTruthy();
	} );

	it( 'shows the use of funds from small banner', async () => {
		const wrapper = getWrapperAtWidth( 799 );

		await wrapper.find( '.wmde-banner-fallback-small .wmde-banner-fallback-usage-link' ).trigger( 'click' );

		expect( wrapper.find( '.banner-modal' ).classes() ).toContain( 'is-visible' );
	} );

	it( 'hides the use of funds from small banner', async () => {
		const wrapper = getWrapperAtWidth( 799 );

		await wrapper.find( '.wmde-banner-fallback-small .wmde-banner-fallback-usage-link' ).trigger( 'click' );
		await wrapper.find( '.banner-modal-close-link' ).trigger( 'click' );

		expect( wrapper.find( '.banner-modal' ).classes() ).not.toContain( 'is-visible' );
	} );

	it( 'shows the use of funds from large banner', async () => {
		const wrapper = getWrapperAtWidth( 800 );

		await wrapper.find( '.wmde-banner-fallback-large .wmde-banner-fallback-usage-link' ).trigger( 'click' );

		expect( wrapper.find( '.banner-modal' ).classes() ).toContain( 'is-visible' );
	} );

	it( 'hides the use of funds from large banner', async () => {
		const wrapper = getWrapperAtWidth( 800 );

		await wrapper.find( '.wmde-banner-fallback-large .wmde-banner-fallback-usage-link' ).trigger( 'click' );
		await wrapper.find( '.banner-modal-close-link' ).trigger( 'click' );

		expect( wrapper.find( '.banner-modal' ).classes() ).not.toContain( 'is-visible' );
	} );

	it( 'submits from large banner', async () => {
		const location = { href: '' };
		Object.defineProperty( window, 'location', { writable: true, configurable: true, value: location } );
		const tracker = new TrackerSpy();
		const wrapper = getWrapperAtWidth( 800, null, tracker );

		await wrapper.find( '.wmde-banner-fallback-large .wmde-banner-fallback-button' ).trigger( 'click' );

		expect( tracker.hasTrackedEvent( FallbackBannerSubmitEvent.EVENT_NAME ) );
		expect( location.href ).toStrictEqual( 'https://spenden.wikimedia.de' );
	} );

	it( 'submits from small banner', async () => {
		const location = { href: '' };
		Object.defineProperty( window, 'location', { writable: true, configurable: true, value: location } );
		const tracker = new TrackerSpy();
		const wrapper = getWrapperAtWidth( 799, null, tracker );

		await wrapper.find( '.wmde-banner-fallback-small .wmde-banner-fallback-button' ).trigger( 'click' );

		expect( tracker.hasTrackedEvent( FallbackBannerSubmitEvent.EVENT_NAME ) );
		expect( location.href ).toStrictEqual( 'https://spenden.wikimedia.de' );
	} );
} );
