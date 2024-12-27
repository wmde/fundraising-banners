import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { CloseChoices } from '@src/domain/CloseChoices';
import Banner from '@banners/thank_you_2024/components/BannerVar.en.vue';
import MiniBannerTextWin from '@banners/thank_you_2024/content/win/MiniBannerText.en.vue';
import FullPageBannerTextWin from '@banners/thank_you_2024/content/win/FullPageBannerTextVar.en.vue';
import { Tracker } from '@src/tracking/Tracker';
import { ThankYouModalShownEvent } from '@src/tracking/events/ThankYouModalShownEvent';
import { BannerSubmitEvent } from '@src/tracking/events/BannerSubmitEvent';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { TimerStub } from '@test/fixtures/TimerStub';
import { ThankYouModalHiddenEvent } from '@src/tracking/events/ThankYouModalHiddenEvent';

describe( 'BannerVar.en.vue', () => {
	let tracker: Tracker;
	let showCallback: Mock;
	let closeCallback: Mock;

	beforeEach( () => {
		tracker = { trackEvent: vi.fn() };
		showCallback = vi.fn();
		closeCallback = vi.fn();
		HTMLDialogElement.prototype.showModal = showCallback;
		HTMLDialogElement.prototype.close = closeCallback;
	} );

	const getWrapper = ( progressBarPercentage: number = 80 ): VueWrapper<any> => {
		return mount( Banner, {
			props: {
				bannerState: BannerStates.Pending,
				settings: {
					numberOfDonors: '42',
					numberOfMembers: '23',
					progressBarPercentage
				},
				subscribeURL: 'SUBSCRIBE URL',
				useOfFundsURL: 'USE OF FUNDS',
				membershipWithAmountURL: 'WITH_AMOUNT',
				membershipWithoutAmountURL: 'WITHOUT_AMOUNT'
			},
			global: {
				mocks: {
					$translate: ( key: string ): string => key
				},
				provide: {
					tracker: tracker,
					timer: new TimerStub()
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

	it( 'shows win content', () => {
		Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 751 } );
		const wrapper = getWrapper( 100 );

		expect( wrapper.findComponent( MiniBannerTextWin ).exists() ).toBeTruthy();
		expect( wrapper.findComponent( FullPageBannerTextWin ).exists() ).toBeTruthy();
	} );

	it( 'Shows and hides the full page modal', async () => {
		const wrapper = getWrapper();

		await wrapper.find( '.wmde-banner-mini-read-more' ).trigger( 'click' );

		expect( showCallback ).toHaveBeenCalled();

		await wrapper.find( '.wmde-banner-full .wmde-banner-close' ).trigger( 'click' );

		expect( closeCallback ).toHaveBeenCalled();
	} );

	it( 'emits modal shown events', () => {
		const wrapper = getWrapper();

		wrapper.find( '.wmde-banner-mini-read-more' ).trigger( 'click' );

		expect( tracker.trackEvent ).toHaveBeenCalledOnce();
		expect( tracker.trackEvent ).toHaveBeenCalledWith( new ThankYouModalShownEvent() );
		expect( wrapper.emitted( 'modalOpened' ).length ).toStrictEqual( 1 );
	} );

	it( 'emits modal hidden events', () => {
		const wrapper = getWrapper();

		wrapper.find( '.wmde-banner-full .wmde-banner-close' ).trigger( 'click' );

		expect( tracker.trackEvent ).toHaveBeenCalledOnce();
		expect( tracker.trackEvent ).toHaveBeenCalledWith( new ThankYouModalHiddenEvent() );
		expect( wrapper.emitted( 'modalClosed' ).length ).toStrictEqual( 1 );
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

		await wrapper.find( '.wmde-banner-full-cta-with' ).trigger( 'click' );

		expect( location.href ).toStrictEqual( 'WITH_AMOUNT' );

		await wrapper.find( '.wmde-banner-full-cta-without' ).trigger( 'click' );

		expect( location.href ).toStrictEqual( 'WITHOUT_AMOUNT' );
	} );

	it( 'tracks when membership buttons are clicked', async () => {
		Object.defineProperty( window, 'location', { writable: true, configurable: true, value: { href: '' } } );
		const wrapper = getWrapper();

		await wrapper.find( '.wmde-banner-full-cta-with' ).trigger( 'click' );
		await wrapper.find( '.wmde-banner-full-cta-without' ).trigger( 'click' );

		expect( tracker.trackEvent ).toBeCalledTimes( 2 );
		expect( tracker.trackEvent ).toBeCalledWith( new BannerSubmitEvent( 'ThankYouBanner', 'with-amount-5' ) );
		expect( tracker.trackEvent ).toBeCalledWith( new BannerSubmitEvent( 'ThankYouBanner', 'without-amount' ) );
	} );

	it( 'tracks and redirects when subscribe link is clicked', async () => {
		const location = { href: '' };
		Object.defineProperty( window, 'location', { writable: true, configurable: true, value: location } );
		const wrapper = getWrapper();

		await wrapper.find( '.wmde-banner-subscribe a:first-child' ).trigger( 'click' );

		expect( location.href ).toStrictEqual( 'SUBSCRIBE URL' );
		expect( tracker.trackEvent ).toBeCalledTimes( 1 );
		expect( tracker.trackEvent ).toBeCalledWith( new BannerSubmitEvent( 'ThankYouBanner', 'subscribe' ) );
	} );

	it( 'tracks and redirects when use of funds link is clicked', async () => {
		const location = { href: '' };
		Object.defineProperty( window, 'location', { writable: true, configurable: true, value: location } );
		const wrapper = getWrapper();

		await wrapper.find( '.wmde-banner-subscribe a:last-child' ).trigger( 'click' );

		expect( location.href ).toStrictEqual( 'USE OF FUNDS' );
		expect( tracker.trackEvent ).toBeCalledTimes( 1 );
		expect( tracker.trackEvent ).toBeCalledWith( new BannerSubmitEvent( 'ThankYouBanner', 'use-of-funds' ) );
	} );
} );
