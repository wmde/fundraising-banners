import { expect, it, Mock } from 'vitest';
import { afterEach, beforeEach, describe, test, vi } from 'vitest';
import type { VueWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import Banner from '@banners/mobile/WMDE_FR_2026_Mobile_DE_04/components/BannerCtrl.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import type { PageScroller } from '@src/utils/PageScroller/PageScroller';
import { useOfFundsContent } from '@test/banners/useOfFundsContent';
import { newDynamicContent } from '@test/banners/dynamicCampaignContent';
import { CurrencyDe } from '@src/utils/DynamicContent/formatters/CurrencyDe';
import { formItems } from '@test/banners/formItems';
import { donationFormFeatures } from '@test/features/forms/MainDonation_UpgradeToYearlyButton';
import { useFormModel } from '@src/components/composables/useFormModel';
import { resetFormModel } from '@test/resetFormModel';
import type { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { formActionSwitchFeatures } from '@test/features/form_action_switch/MainDonation_UpgradeToYearlyButton';
import type { Tracker } from '@src/tracking/Tracker';
import type { Timer } from '@src/utils/Timer';
import { TimerStub } from '@test/fixtures/TimerStub';
import { fakeFormActions } from '@test/fixtures/FakeFormActions';
import UseOfFundsModal from '@src/components/UseOfFunds/UseOfFundsModal.vue';
import { UseOfFundsShownEvent } from '@src/tracking/events/UseOfFundsShownEvent';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { CloseChoices } from '@src/domain/CloseChoices';
import type { LocalCloseTracker } from '@src/utils/LocalCloseTracker';
import { BannerSubmitOnReturnEvent } from '@src/tracking/events/BannerSubmitOnReturnEvent';
import { setMainDonationFormValues } from '@test/features/forms/subForms/MainDonationForm';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';

let pageScroller: PageScroller;
let tracker: Tracker;
const formModel = useFormModel();
const translator = ( key: string ): string => key;
describe( 'BannerCtrl.vue', () => {
	let showCallback: Mock;
	let closeCallback: Mock;

	let wrapper: VueWrapper<any>;
	beforeEach( () => {
		resetFormModel( formModel );

		pageScroller = {
			scrollIntoView: vi.fn(),
			scrollToTop: vi.fn()
		};

		tracker = {
			trackEvent: vi.fn()
		};

		// for use of funds dialogue
		showCallback = vi.fn();
		closeCallback = vi.fn();
		HTMLDialogElement.prototype.showModal = showCallback;
		HTMLDialogElement.prototype.close = closeCallback;
	} );

	afterEach( () => {
		wrapper.unmount();
	} );

	const getWrapper = ( dynamicContent: DynamicContent = null, timer: Timer = null ): VueWrapper<any> => {
		// attachTo the document body to fix an issue with Vue Test Utils where
		// clicking a submit button in a form does not fire the submit event
		wrapper = mount( Banner, {
			attachTo: document.body,
			props: {
				bannerState: BannerStates.Pending,
				useOfFundsContent,
				pageScroller,
				remainingImpressions: 10
			},
			global: {
				mocks: {
					$translate: translator
				},
				provide: {
					translator: { translate: translator },
					dynamicCampaignText: dynamicContent ?? newDynamicContent(),
					formActions: fakeFormActions,
					currencyFormatter: new CurrencyDe(),
					formItems,
					tracker,
					timer: timer ?? new TimerStub(),
					currentCampaignTimePercentage: 42
				}
			}
		} );

		return wrapper;
	};

	describe( 'Donation Form Happy Paths', () => {
		test.each( [
			[ 'expectMainDonationFormSubmitsWhenSofortIsSelected' ],
			[ 'expectMainDonationFormSubmitsWhenYearlyIsSelected' ],
			[ 'expectMainDonationFormGoesToUpgrade' ],
			[ 'expectUpgradeToYearlyFormSubmitsUpgrade' ],
			[ 'expectUpgradeToYearlyFormSubmitsDontUpgrade' ],
			[ 'submitOpensInNewTab' ],
			[ 'submitHidesBanner' ]
		] )( '%s', async ( testName: string ) => {
			await donationFormFeatures[ testName ]( getWrapper() );
		} );

		it( 'Uses the default amounts when the donate button is clicked', async () => {
			getWrapper();
			const miniButton = wrapper.find( '.wmde-b-mini-banner footer div:last-child button' );

			await miniButton.trigger( 'click' );

			expect( wrapper.find( '.amount-5' ).exists() ).toBeTruthy();
			expect( wrapper.find( '.amount-15' ).exists() ).toBeTruthy();
			expect( wrapper.find( '.amount-25' ).exists() ).toBeTruthy();
			expect( wrapper.find( '.amount-50' ).exists() ).toBeTruthy();
			expect( wrapper.find( '.amount-100' ).exists() ).toBeTruthy();
		} );

		it( 'Uses the alternate amounts when the donate with amount button is clicked', async () => {
			getWrapper();
			const miniButtonPreselect = wrapper.find( '.wmde-b-mini-banner footer div:first-child button' );

			await miniButtonPreselect.trigger( 'click' );

			expect( wrapper.find( '.amount-10' ).exists() ).toBeTruthy();
			expect( wrapper.find( '.amount-15' ).exists() ).toBeTruthy();
			expect( wrapper.find( '.amount-25' ).exists() ).toBeTruthy();
			expect( wrapper.find( '.amount-50' ).exists() ).toBeTruthy();
			expect( wrapper.find( '.amount-100' ).exists() ).toBeTruthy();
		} );

		test.each( [
			[ 'expectMainDonationFormSubmitsWithAddressForDirectDebit' ],
			[ 'expectUpgradeToYearlyFormSubmitsWithAddressForDirectDebit' ]
		] )( '%s', async ( testName: string ) => {
			await formActionSwitchFeatures[ testName ]( getWrapper() );
		} );
	} );

	describe( 'Use of Funds', () => {

		it( 'shows and hides the use of funds on the mini banner', async () => {
			getWrapper();

			const showUseOfFundsButton = wrapper.find( '.wmde-b-mini-banner header > div:first-child > button:first-child' );
			const closeUseOfFundsButton = wrapper.find( '.wmde-banner-funds-modal-close button' );

			await showUseOfFundsButton.trigger( 'click' );
			await closeUseOfFundsButton.trigger( 'click' );

			const useOfFundsModal = wrapper.findComponent( UseOfFundsModal );

			expect( useOfFundsModal.emitted( 'shown' ).length ).toBe( 1 );
			expect( useOfFundsModal.emitted( 'hide' ).length ).toBe( 1 );
			expect( wrapper.emitted( 'modalOpened' ).length ).toStrictEqual( 1 );
			expect( wrapper.emitted( 'modalClosed' ).length ).toStrictEqual( 1 );
		} );

		it( 'tracks when use of funds is opened', async () => {
			getWrapper();

			const showUseOfFundsButton = wrapper.find( '.wmde-b-mini-banner header > div:first-child > button:first-child' );

			await showUseOfFundsButton.trigger( 'click' );

			expect( tracker.trackEvent ).toHaveBeenCalledWith( new UseOfFundsShownEvent( 'MiniBanner' ) );
		} );
	} );

	describe( 'Mini Banner', () => {

		it( 'shows the donation form', async () => {
			getWrapper();

			const miniButton = wrapper.find( '.wmde-b-mini-banner footer div:last-child button' );
			await miniButton.trigger( 'click' );

			expect( wrapper.classes() ).toContain( 'wmde-banner-wrapper--full-page' );
		} );

		it( 'emits a content changed event when the donation form is shown', async () => {
			getWrapper();

			const miniButton = wrapper.find( '.wmde-b-mini-banner footer div:last-child button' );
			await miniButton.trigger( 'click' );

			expect( wrapper.emitted( 'bannerContentChanged' ).length ).toBe( 1 );
		} );

		it( 'emits a close event', async () => {
			getWrapper();

			const closeButton = wrapper.find( '.wmde-b-mini-banner header > div:last-child button' );
			await closeButton.trigger( 'click' );

			expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
			expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'MiniBanner', CloseChoices.Close ) );
		} );

		it( 'emits the already donated close event', async () => {
			getWrapper();

			const closeButton = wrapper.find( '.wmde-b-mini-banner header > div:first-child > button:last-child' );
			await closeButton.trigger( 'click' );

			expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
			expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'MiniBanner', CloseChoices.AlreadyDonated ) );
		} );

		it( 'plays the slideshow once the banner becomes visible', async () => {
			getWrapper();
			await wrapper.setProps( { bannerState: BannerStates.Visible } );

			expect( wrapper.find( '.wmde-b-slider--playing' ).exists() ).toBeTruthy();
		} );

		it( 'stops the slideshow once the donation form is shown', async () => {
			getWrapper();

			const miniButton = wrapper.find( '.wmde-b-mini-banner footer div:last-child button' );
			await wrapper.setProps( { bannerState: BannerStates.Visible } );
			await miniButton.trigger( 'click' );

			expect( wrapper.find( '.wmde-b-slider--stopped' ).exists() ).toBeTruthy();
		} );
	} );

	describe( 'Full Page Banner', () => {
		it( 'emits the close event', async () => {
			getWrapper();

			await wrapper.find( '.wmde-banner-full-close' ).trigger( 'click' );

			expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
			expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'FullPageBanner', CloseChoices.Hide ) );
		} );

		it( 'emits the modal opened event', async () => {
			getWrapper();

			const miniButton = wrapper.find( '.wmde-b-mini-banner footer div:last-child button' );
			await miniButton.trigger( 'click' );

			expect( wrapper.emitted( 'modalOpened' ).length ).toBe( 1 );
		} );

		it( 'emits the modal closed event', async () => {
			getWrapper();

			const miniButton = wrapper.find( '.wmde-b-mini-banner footer div:last-child button' );
			await miniButton.trigger( 'click' );
			await wrapper.find( '.wmde-banner-full-close' ).trigger( 'click' );

			expect( wrapper.emitted( 'modalClosed' ).length ).toBe( 1 );
		} );
	} );

	describe( 'Soft Close Return Tracking', () => {
		it( 'Does not store a cookie on close', async () => {
			const localCloseTracker: LocalCloseTracker = {
				getItem: vi.fn(),
				setItem: vi.fn()
			};
			getWrapper();
			await wrapper.setProps( { localCloseTracker } );

			const closeButton = wrapper.find( '.wmde-b-mini-banner header > div:last-child button' );

			await closeButton.trigger( 'click' );

			expect( localCloseTracker.setItem ).not.toHaveBeenCalled();
		} );

		it( 'Does not fire submit on return event', async () => {
			const localCloseTracker: LocalCloseTracker = {
				getItem: () => 'I chose not to choose a close choice',
				setItem: vi.fn()
			};
			getWrapper();
			await wrapper.setProps( { localCloseTracker } );

			await setMainDonationFormValues( wrapper, Intervals.YEARLY, '15', PaymentMethods.PAYPAL );
			await wrapper.find( '.wmde-banner-sub-form-donation' ).trigger( 'submit' );

			expect( tracker.trackEvent ).not.toHaveBeenCalledWith( new BannerSubmitOnReturnEvent( 'I chose not to choose a close choice' ) );
		} );
	} );
} );
