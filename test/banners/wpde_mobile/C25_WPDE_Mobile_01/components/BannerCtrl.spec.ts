import { afterEach, beforeEach, describe, Mock, test, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import Banner from '@banners/wpde_mobile/C25_WPDE_Mobile_01/components/BannerCtrl.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { PageScroller } from '@src/utils/PageScroller/PageScroller';
import { useOfFundsContent } from '@test/banners/useOfFundsContent';
import { newDynamicContent } from '@test/banners/dynamicCampaignContent';
import { CurrencyDe } from '@src/utils/DynamicContent/formatters/CurrencyDe';
import { formItems } from '@test/banners/formItems';
import {
	mobileUseOfFundsFeatures,
	useOfFundsScrollFeatures,
	useOfFundsTrackingFeatures
} from '@test/features/UseOfFunds';
import { miniBannerFeatures } from '@test/features/MiniBanner';
import { donationFormFeatures } from '@test/features/forms/MainDonation_UpgradeToYearlyButton';
import { useFormModel } from '@src/components/composables/useFormModel';
import { resetFormModel } from '@test/resetFormModel';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { fullPageBannerFeatures } from '@test/features/FullPageBanner';
import { bannerContentDateAndTimeFeatures } from '@test/features/BannerContent';
import { setCookieImageFeatures } from '@test/features/SetCookieImageMobile';
import { Timer } from '@src/utils/Timer';
import { TimerStub } from '@test/fixtures/TimerStub';
import { fakeFormActions } from '@test/fixtures/FakeFormActions';
import { Tracker } from '@src/tracking/Tracker';

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
				}
			}
		} );

		return wrapper;
	};

	describe( 'Content', () => {
		test.each( [
			[ 'expectShowsLiveTimeInMiniBanner' ],
			[ 'expectShowsLiveTimeInFullPageBanner' ]
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
	} );

	describe( 'Set Cookie Image', () => {
		test.each( [
			[ 'expectSetsCookieImageOnMiniBannerClose' ]
		] )( '%s', async ( testName: string ) => {
			await setCookieImageFeatures[ testName ]( getWrapper );
		} );
	} );

	describe( 'Use of Funds', () => {
		test.each( [
			[ 'expectShowsUseOfFundsOnMiniBanner' ],
			[ 'expectHidesUseOfFundsOnMiniBanner' ],
			[ 'expectEmitsModalOpenedEventOnMiniBanner' ],
			[ 'expectEmitsModalClosedEventOnMiniBanner' ],
			[ 'expectDoesNotEmitModalClosedEventOnFullPageBanner' ]
		] )( '%s', async ( testName: string ) => {
			await mobileUseOfFundsFeatures[ testName ]( getWrapper() );
		} );

		test.each( [
			[ 'expectScrollsToFormWhenCallToActionIsClicked' ],
			[ 'expectScrollsToFormWhenClosesToFullPage' ],
			[ 'expectDoesNotScrollToFormWhenClosesToMiniBanner' ]
		] )( '%s', async ( testName: string ) => {
			await useOfFundsScrollFeatures[ testName ]( getWrapper(), pageScroller );
		} );

		test.each( [
			[ 'expectClickingUoFLinkOnMiniBannerTracksEvent' ]
		] )( '%s', async ( testName: string ) => {
			await useOfFundsTrackingFeatures[ testName ]( getWrapper(), tracker );
		} );
	} );

	describe( 'Mini Banner', () => {
		test.each( [
			[ 'expectSlideShowPlaysWhenMiniBannerBecomesVisible' ],
			[ 'expectSlideShowStopsWhenFullBannerBecomesVisible' ],
			[ 'expectShowsFullPageWhenCallToActionIsClicked' ],
			[ 'expectShowsFullPageWithPreselectedAmountWhenPreselectButtonIsClicked' ],
			[ 'expectEmitsBannerContentChangedEventWhenCallToActionIsClicked' ],
			[ 'expectEmitsCloseEvent' ],
			[ 'expectsEmitsCloseEventOnAlreadyDonated' ]
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
