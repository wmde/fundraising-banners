import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { CloseChoices } from '@src/domain/CloseChoices';
import BannerCtrl from '@banners/thank_you/components/BannerCtrl.vue';
import { Tracker } from '@src/tracking/Tracker';
import { ThankYouModalShownEvent } from '@src/tracking/events/ThankYouModalShownEvent';
import { BannerSubmitEvent } from '@src/tracking/events/BannerSubmitEvent';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { TimerStub } from '@test/fixtures/TimerStub';
import { ThankYouModalHiddenEvent } from '@src/tracking/events/ThankYouModalHiddenEvent';
import thankYouContent from '@test/fixtures/ThankYouContent';
import { ThankYouSectionExpandedEvent } from '@src/tracking/events/ThankYouSectionExpandedEvent';
import BannerDisclosure from '@banners/thank_you/components/BannerDisclosure.vue';

describe( 'BannerCtrl.vue', () => {
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

	const getWrapper = (): VueWrapper<any> => {
		return mount( BannerCtrl, {
			props: {
				bannerState: BannerStates.Pending,
				thankYouContent,
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

		wrapper.find( '.wmde-b-close-button button' ).trigger( 'click' );

		expect( wrapper.emitted( 'bannerClosed' ).length ).toStrictEqual( 1 );
		expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toStrictEqual( new CloseEvent( 'MainBanner', CloseChoices.Close ) );
	} );

	it( 'Shows and hides the full page modal', async () => {
		const wrapper = getWrapper();

		await wrapper.find( '.wmde-b-mini-cta button' ).trigger( 'click' );

		expect( showCallback ).toHaveBeenCalled();

		await wrapper.find( '.wmde-b-modal .wmde-b-close-button button' ).trigger( 'click' );

		expect( closeCallback ).toHaveBeenCalled();
	} );

	it( 'emits modal shown events', () => {
		const wrapper = getWrapper();

		wrapper.find( '.wmde-b-mini-cta button' ).trigger( 'click' );

		expect( tracker.trackEvent ).toHaveBeenCalledOnce();
		expect( tracker.trackEvent ).toHaveBeenCalledWith( new ThankYouModalShownEvent() );
		expect( wrapper.emitted( 'modalOpened' ).length ).toStrictEqual( 1 );
	} );

	it( 'emits modal hidden events', () => {
		const wrapper = getWrapper();

		wrapper.find( '.wmde-b-modal .wmde-b-close-button button' ).trigger( 'click' );

		expect( tracker.trackEvent ).toHaveBeenCalledOnce();
		expect( tracker.trackEvent ).toHaveBeenCalledWith( new ThankYouModalHiddenEvent() );
		expect( wrapper.emitted( 'modalClosed' ).length ).toStrictEqual( 1 );
	} );

	it( 'redirects when membership buttons are clicked', async () => {
		let location: string|URL = '';
		window.open = ( url ) => {
			location = url;
			return this;
		};
		const wrapper = getWrapper();

		const ctaFiveEuroAmount = wrapper.find( '.wmde-b-cta > div:first-child a' );
		await ctaFiveEuroAmount.trigger( 'click' );

		expect( location ).toStrictEqual( 'WITH_AMOUNT' );

		const ctaOtherAmount = wrapper.find( '.wmde-b-cta > div:last-child a' );
		await ctaOtherAmount.trigger( 'click' );

		expect( location ).toStrictEqual( 'WITHOUT_AMOUNT' );
	} );

	it( 'tracks when membership buttons are clicked', async () => {
		window.open = () => {
			return this;
		};
		const wrapper = getWrapper();

		const ctaFiveEuroAmount = wrapper.find( '.wmde-b-cta > div:first-child a' );
		await ctaFiveEuroAmount.trigger( 'click' );
		const ctaOtherAmount = wrapper.find( '.wmde-b-cta > div:last-child a' );
		await ctaOtherAmount.trigger( 'click' );

		expect( tracker.trackEvent ).toBeCalledTimes( 2 );
		expect( tracker.trackEvent ).toBeCalledWith( new BannerSubmitEvent( 'ThankYouBanner', 'with-amount-5' ) );
		expect( tracker.trackEvent ).toBeCalledWith( new BannerSubmitEvent( 'ThankYouBanner', 'without-amount' ) );
	} );

	it( 'tracks and redirects when subscribe link is clicked', async () => {
		let location: string|URL = '';
		window.open = ( url ) => {
			location = url;
			return this;
		};
		const wrapper = getWrapper();

		const subscribeLink = wrapper.find( 'footer p:first-child a:first-child' );
		await subscribeLink.trigger( 'click' );

		expect( location ).toStrictEqual( 'SUBSCRIBE URL' );
		expect( tracker.trackEvent ).toBeCalledTimes( 1 );
		expect( tracker.trackEvent ).toBeCalledWith( new BannerSubmitEvent( 'ThankYouBanner', 'subscribe' ) );
	} );

	it( 'tracks and redirects when use of funds link is clicked', async () => {
		let location: string|URL = '';
		window.open = ( url ) => {
			location = url;
			return this;
		};
		Object.defineProperty( window, 'location', { writable: true, configurable: true, value: location } );
		const wrapper = getWrapper();

		const useOfFundsLink = wrapper.find( 'footer p:first-child a:last-child' );
		await useOfFundsLink.trigger( 'click' );

		expect( location ).toStrictEqual( 'USE OF FUNDS' );
		expect( tracker.trackEvent ).toBeCalledTimes( 1 );
		expect( tracker.trackEvent ).toBeCalledWith( new BannerSubmitEvent( 'ThankYouBanner', 'use-of-funds' ) );
	} );

	it( 'tracks when dialogues are opened', async () => {
		const wrapper = getWrapper();

		const disclosures = wrapper.findAllComponents( BannerDisclosure );
		disclosures[ 0 ].vm.$emit( 'dialogueToggled', true );
		disclosures[ 0 ].vm.$emit( 'dialogueToggled', false );
		disclosures[ 1 ].vm.$emit( 'dialogueToggled', true );
		disclosures[ 1 ].vm.$emit( 'dialogueToggled', false );

		expect( tracker.trackEvent ).toBeCalledTimes( 2 );
		expect( tracker.trackEvent ).toBeCalledWith( new ThankYouSectionExpandedEvent( 'knowledge' ) );
		expect( tracker.trackEvent ).toBeCalledWith( new ThankYouSectionExpandedEvent( 'help' ) );
	} );
} );
