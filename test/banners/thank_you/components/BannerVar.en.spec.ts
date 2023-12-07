import { describe, expect, it, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { CloseChoices } from '@src/domain/CloseChoices';
import BannerCtrl from '../../../../banners/thank_you/components/BannerVar.en.vue';
import { Tracker } from '@src/tracking/Tracker';
import { ThankYouModalShownEvent } from '@src/tracking/events/ThankYouModalShownEvent';
import { BannerSubmitEvent } from '@src/tracking/events/BannerSubmitEvent';
import { MembershipFormActions } from '../../../../banners/thank_you/MembershipFormActions';

const formActions: MembershipFormActions = {
	create: ( extraUrlParameters: Record<string, string> ) => `URL [ ${ extraUrlParameters?.interval }, ${ extraUrlParameters?.fee } ]`
};

describe( 'BannerVar.en.vue', () => {
	let tracker: Tracker;

	const getWrapper = (): VueWrapper<any> => {
		tracker = { trackEvent: vi.fn() };
		return mount( BannerCtrl, {
			props: {
				progressBarFillPercentage: 80,
				subscribeURL: 'SUBSCRIBE URL'
			},
			global: {
				mocks: {
					$translate: ( key: string ): string => key
				},
				provide: {
					tracker: tracker,
					formActions
				}
			}
		} );
	};

	it( 'emits close event', () => {
		const wrapper = getWrapper();

		wrapper.find( '.wmde-banner-close' ).trigger( 'click' );

		expect( wrapper.emitted( 'bannerClosed' ).length ).toStrictEqual( 1 );
		expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toStrictEqual( new CloseEvent( 'MainBanner', CloseChoices.Close ) );
	} );

	it( 'emits modal shown event', () => {
		const wrapper = getWrapper();

		wrapper.find( '.wmde-banner-button' ).trigger( 'click' );

		expect( tracker.trackEvent ).toHaveBeenCalledOnce();
		expect( tracker.trackEvent ).toHaveBeenCalledWith( new ThankYouModalShownEvent() );
	} );

	it( 'sets progress bar fill percentage on slider', () => {
		Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 750 } );
		const wrapper = getWrapper();

		expect( wrapper.find( '.wmde-banner-progress-bar' ).attributes( 'style' ) ).toStrictEqual( '--wmde-banner-progress-bar-width: 80%;' );
	} );

	it( 'sets progress bar fill percentage on text', () => {
		Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 751 } );
		const wrapper = getWrapper();

		expect( wrapper.find( '.wmde-banner-progress-bar' ).attributes( 'style' ) ).toStrictEqual( '--wmde-banner-progress-bar-width: 80%;' );
	} );

	it( 'redirects when membership buttons are clicked', async () => {
		const location = { href: '' };
		Object.defineProperty( window, 'location', { writable: true, configurable: true, value: location } );
		const wrapper = getWrapper();

		await wrapper.find( '.wmde-banner-full-cta-buttons .wmde-banner-button:first-child' ).trigger( 'click' );

		expect( location.href ).toStrictEqual( 'URL [ 1, 200 ]' );

		await wrapper.find( '.wmde-banner-full-cta-buttons .wmde-banner-button:nth-child( 2 )' ).trigger( 'click' );

		expect( location.href ).toStrictEqual( 'URL [ 1, 500 ]' );

		await wrapper.find( '.wmde-banner-full-cta-buttons .wmde-banner-button:last-child' ).trigger( 'click' );

		expect( location.href ).toStrictEqual( 'URL [ undefined, undefined ]' );
	} );

	it( 'tracks when membership buttons are clicked', async () => {
		Object.defineProperty( window, 'location', { writable: true, configurable: true, value: { href: '' } } );
		const wrapper = getWrapper();

		await wrapper.find( '.wmde-banner-full-cta-buttons .wmde-banner-button:first-child' ).trigger( 'click' );
		await wrapper.find( '.wmde-banner-full-cta-buttons .wmde-banner-button:nth-child( 2 )' ).trigger( 'click' );
		await wrapper.find( '.wmde-banner-full-cta-buttons .wmde-banner-button:last-child' ).trigger( 'click' );

		expect( tracker.trackEvent ).toBeCalledTimes( 3 );
		expect( tracker.trackEvent ).toBeCalledWith( new BannerSubmitEvent( 'ThankYouBanner', 'with-amount-2' ) );
		expect( tracker.trackEvent ).toBeCalledWith( new BannerSubmitEvent( 'ThankYouBanner', 'with-amount-5' ) );
		expect( tracker.trackEvent ).toBeCalledWith( new BannerSubmitEvent( 'ThankYouBanner', 'without-amount' ) );
	} );

	it( 'tracks and redirects when subscribe link is clicked', async () => {
		const location = { href: '' };
		Object.defineProperty( window, 'location', { writable: true, configurable: true, value: location } );
		const wrapper = getWrapper();

		await wrapper.find( '.wmde-banner-full-subscribe a' ).trigger( 'click' );

		expect( location.href ).toStrictEqual( 'SUBSCRIBE URL' );
		expect( tracker.trackEvent ).toBeCalledTimes( 1 );
		expect( tracker.trackEvent ).toBeCalledWith( new BannerSubmitEvent( 'ThankYouBanner', 'subscribe' ) );
	} );
} );
