import { afterEach, beforeEach, describe, test, vi, it, expect } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import Banner from '@banners/mobile_english/C25_WMDE_Mobile_EN_00/components/BannerVar.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { PageScroller } from '@src/utils/PageScroller/PageScroller';
import { useOfFundsContent } from '@test/banners/useOfFundsContent';
import { newDynamicContent } from '@test/banners/dynamicCampaignContent';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';
import { formItems } from '@test/banners/formItems';
import { softCloseFeatures } from '@test/features/SoftCloseMobile';
import { useOfFundsFeatures, useOfFundsScrollFeatures } from '@test/features/UseOfFunds';
import { miniBannerFeatures } from '@test/features/MiniBanner';
import { donationFormFeatures } from '@test/features/forms/MainDonation_UpgradeToYearlyButton';
import { useFormModel } from '@src/components/composables/useFormModel';
import { resetFormModel } from '@test/resetFormModel';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { fullPageBannerFeatures } from '@test/features/FullPageBanner';
import { formActionSwitchFeatures } from '@test/features/form_action_switch/MainDonation_UpgradeToYearlyButton';
import { Tracker } from '@src/tracking/Tracker';
import { bannerContentAnimatedTextFeatures, bannerContentDateAndTimeFeatures } from '@test/features/BannerContent';
import { UseOfFundsShownEvent } from '@src/tracking/events/UseOfFundsShownEvent';
import { Timer } from '@src/utils/Timer';
import { TimerStub } from '@test/fixtures/TimerStub';

let pageScroller: PageScroller;
let tracker: Tracker;
const formModel = useFormModel();
const translator = ( key: string ): string => key;

describe( 'BannerVar.vue', () => {

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
				donationURL: 'https://spenden.wikimedia.de'
			},
			global: {
				mocks: {
					$translate: translator
				},
				provide: {
					translator: { translate: translator },
					dynamicCampaignText: dynamicContent ?? newDynamicContent(),
					formActions: { donateWithAddressActionUrl: 'https://example.com/with-address', donateAnonymouslyActionUrl: 'https://example.com/without-address' },
					currencyFormatter: new CurrencyEn(),
					formItems,
					tracker,
					timer: timer ?? new TimerStub()
				}
			}
		} );

		return wrapper;
	};

	describe( 'Content', () => {
		test.skip.each( [
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
		test.skip.each( [
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

	describe( 'Use of Funds', () => {
		test.each( [
			[ 'expectShowsUseOfFunds' ],
			[ 'expectHidesUseOfFunds' ]
		] )( '%s', async ( testName: string ) => {
			await useOfFundsFeatures[ testName ]( getWrapper() );
		} );

		test.each( [
			[ 'expectScrollsToFormWhenCallToActionIsClicked' ],
			[ 'expectScrollsToLinkWhenCloseIsClicked' ]
		] )( '%s', async ( testName: string ) => {
			await useOfFundsScrollFeatures[ testName ]( getWrapper(), pageScroller );
		} );

		it( 'Shows the use of funds from header link', async () => {
			wrapper = getWrapper();

			await wrapper.find( '.wmde-banner-full .wmde-banner-headline' ).trigger( 'click' );

			expect( wrapper.find( '.banner-modal' ).classes() ).toContain( 'is-visible' );
			expect( tracker.trackEvent ).toBeCalledWith( new UseOfFundsShownEvent( 'FullPageBanner' ) );
		} );
	} );

	describe( 'Mini Banner', () => {
		test.each( [
			[ 'expectSlideShowPlaysWhenMiniBannerBecomesVisible' ],
			[ 'expectSlideShowStopsWhenFullBannerBecomesVisible' ],
			[ 'expectShowsFullPageWhenCallToActionIsClicked' ],
			[ 'expectShowsFullPageWithPreselectedAmountWhenPreselectButtonIsClicked' ],
			[ 'expectEmitsBannerContentChangedEventWhenCallToActionIsClicked' ]
		] )( '%s', async ( testName: string ) => {
			await miniBannerFeatures[ testName ]( getWrapper() );
		} );

		it( 'Shows the use of funds from header link', async () => {
			wrapper = getWrapper();

			await wrapper.find( '.wmde-banner-mini .wmde-banner-headline' ).trigger( 'click' );

			expect( wrapper.find( '.banner-modal' ).classes() ).toContain( 'is-visible' );
			expect( tracker.trackEvent ).toBeCalledWith( new UseOfFundsShownEvent( 'MiniBanner' ) );
		} );
	} );

	describe( 'Full Page Banner', () => {
		test.each( [
			[ 'expectEmitsCloseEvent' ]
		] )( '%s', async ( testName: string ) => {
			await fullPageBannerFeatures[ testName ]( getWrapper() );
		} );
	} );
} );
