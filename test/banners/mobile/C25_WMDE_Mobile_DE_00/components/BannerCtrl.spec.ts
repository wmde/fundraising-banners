import { afterEach, beforeEach, describe, Mock, test, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import Banner from '@banners/mobile/C25_WMDE_Mobile_DE_00/components/BannerCtrl.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { PageScroller } from '@src/utils/PageScroller/PageScroller';
import { useOfFundsContent } from '@test/banners/useOfFundsContent2024';
import { newDynamicContent } from '@test/banners/dynamicCampaignContent';
import { CurrencyDe } from '@src/utils/DynamicContent/formatters/CurrencyDe';
import { formItems } from '@test/banners/formItems';
import { softCloseFeatures } from '@test/features/SoftCloseMobile';
import { useOfFundsFeatures, useOfFundsScrollFeatures } from '@test/features/UseOfFunds2024';
import { miniBannerFeatures } from '@test/features/MiniBanner';
import { donationFormFeatures } from '@test/features/forms/MainDonation_UpgradeToYearlyButton';
import { useFormModel } from '@src/components/composables/useFormModel';
import { resetFormModel } from '@test/resetFormModel';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { fullPageBannerFeatures } from '@test/features/FullPageBanner';
import { formActionSwitchFeatures } from '@test/features/form_action_switch/MainDonation_UpgradeToYearlyButton';
import { Tracker } from '@src/tracking/Tracker';
import { bannerContentAnimatedTextFeatures, bannerContentDateAndTimeFeatures } from '@test/features/BannerContent';
import { softCloseSubmitTrackingFeatures } from '@test/features/SoftCloseSubmitTracking';
import { Timer } from '@src/utils/Timer';
import { TimerStub } from '@test/fixtures/TimerStub';
import { fakeFormActions } from '@test/fixtures/FakeFormActions';

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
				remainingImpressions: 10,
				localCloseTracker: {
					getItem: () => '',
					setItem: () => {}
				}
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

	describe( 'Content', () => {
		test.each( [
			[ 'expectShowsAnimatedVisitorsVsDonorsSentenceInMessage' ],
			[ 'expectShowsAnimatedVisitorsVsDonorsSentenceInSlideShow' ],
			[ 'expectHidesAnimatedVisitorsVsDonorsSentenceInMessage' ],
			[ 'expectHidesAnimatedVisitorsVsDonorsSentenceInSlideShow' ]
		] )( '%s', async ( testName: string ) => {
			await bannerContentAnimatedTextFeatures[ testName ]( getWrapper );
		} );

		test.each( [
			[ 'expectShowsLiveDateAndTimeInMiniBanner' ],
			[ 'expectShowsLiveDateAndTimeInFullPageBanner' ]
		] )( '%s', async ( testName: string ) => {
			await bannerContentDateAndTimeFeatures[ testName ]( getWrapper );
		} );
	} );

	describe( 'Donation Form Happy Paths', () => {
		test.each( [
			[ 'expectMainDonationFormSubmitsWhenSofortIsSelected' ],
			[ 'expectMainDonationFormSubmitsWhenYearlyIsSelected' ],
			[ 'expectMainDonationFormGoesToUpgrade' ],
			[ 'expectUpgradeToYearlyFormSubmitsUpgrade' ],
			[ 'expectUpgradeToYearlyFormSubmitsDontUpgrade' ]
		] )( '%s', async ( testName: string ) => {
			await donationFormFeatures[ testName ]( getWrapper() );
		} );

		test.each( [
			[ 'expectMainDonationFormSubmitsWithAddressForDirectDebit' ],
			[ 'expectUpgradeToYearlyFormSubmitsWithAddressForDirectDebit' ]
		] )( '%s', async ( testName: string ) => {
			await formActionSwitchFeatures[ testName ]( getWrapper() );
		} );
	} );

	describe( 'Soft Close', () => {
		test.each( [
			[ 'expectShowsSoftCloseOnMiniBannerClose' ],
			[ 'expectDoesNotShowSoftCloseOnFullBannerClose' ],
			[ 'expectEmitsSoftCloseCloseEvent' ],
			[ 'expectEmitsSoftCloseMaybeLaterEvent' ],
			[ 'expectEmitsSoftCloseAlreadyDonatedEvent' ],
			[ 'expectEmitsSoftCloseTimeOutEvent' ],
			[ 'expectEmitsBannerContentChangedOnSoftClose' ],
			[ 'expectDoesNotShowSoftCloseOnFinalBannerImpression' ]
		] )( '%s', async ( testName: string ) => {
			await softCloseFeatures[ testName ]( getWrapper );
		} );
	} );

	describe( 'Soft Close Submit Tracking', () => {
		test.each( [
			[ 'expectStoresMaybeLateCloseChoice' ],
			[ 'expectStoresCloseCloseChoice' ],
			[ 'expectStoresAlreadyDonatedCloseChoice' ],
			[ 'expectEmitsBannerSubmitOnReturnEvent' ],
			[ 'expectDoesNotEmitsBannerSubmitOnReturnEventWhenLocalStorageItemIsMissing' ]
		] )( '%s', async ( testName: string ) => {
			await softCloseSubmitTrackingFeatures[ testName ]( getWrapper(), tracker );
		} );
	} );

	describe( 'Use of Funds', () => {
		test.each( [
			[ 'expectShowsUseOfFunds' ],
			[ 'expectHidesUseOfFunds' ]
		] )( '%s', async ( testName: string ) => {
			await useOfFundsFeatures[ testName ]( getWrapper() );
		} );

		test.each( [
			[ 'expectScrollsToFormWhenCallToActionIsClicked' ],
			[ 'expectScrollsToFormWhenCloseIsClicked' ]
		] )( '%s', async ( testName: string ) => {
			await useOfFundsScrollFeatures[ testName ]( getWrapper(), pageScroller );
		} );
	} );

	describe( 'Mini Banner', () => {
		test.each( [
			[ 'expectSlideShowPlaysWhenMiniBannerBecomesVisible' ],
			[ 'expectSlideShowStopsWhenFullBannerBecomesVisible' ],
			[ 'expectShowsFullPageWhenCallToActionIsClicked' ],
			[ 'expectEmitsBannerContentChangedEventWhenCallToActionIsClicked' ]
		] )( '%s', async ( testName: string ) => {
			await miniBannerFeatures[ testName ]( getWrapper() );
		} );
	} );

	describe( 'Full Page Banner', () => {
		test.each( [
			[ 'expectEmitsCloseEvent' ],
			[ 'expectEmitsModalOpenedEvent' ],
			[ 'expectEmitsModalClosedEvent' ]
		] )( '%s', async ( testName: string ) => {
			await fullPageBannerFeatures[ testName ]( getWrapper() );
		} );
	} );
} );
