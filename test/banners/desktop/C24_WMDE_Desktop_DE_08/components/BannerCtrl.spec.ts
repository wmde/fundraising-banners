import { afterEach, beforeEach, describe, test, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import Banner from '@banners/desktop/C24_WMDE_Desktop_DE_08/components/BannerCtrl.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { newDynamicContent } from '@test/banners/dynamicCampaignContent';
import { useOfFundsContent } from '@test/banners/useOfFundsContent';
import { formItems } from '@test/banners/formItems';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';
import { useOfFundsFeatures } from '@test/features/UseOfFunds';
import {
	bannerContentAnimatedTextFeatures,
	bannerContentDateAndTimeFeatures,
	bannerContentDisplaySwitchFeatures,
	bannerContentFeatures
} from '@test/features/BannerContent';
import { donationFormFeatures } from '@test/features/forms/MainDonation_UpgradeToYearlyButton';
import { useFormModel } from '@src/components/composables/useFormModel';
import { resetFormModel } from '@test/resetFormModel';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { bannerMainFeatures } from '@test/features/MainBanner';
import { formActionSwitchFeatures } from '@test/features/form_action_switch/MainDonation_UpgradeToYearlyButton';
import { softCloseFeatures } from '@test/features/SoftCloseDesktop';
import { alreadyDonatedModalFeatures } from '@test/features/AlreadyDonatedModal';
import { softCloseSubmitTrackingFeaturesDesktop } from '@test/features/SoftCloseSubmitTrackingDesktop';
import { Tracker } from '@src/tracking/Tracker';

const formModel = useFormModel();
const translator = ( key: string ): string => key;
let tracker: Tracker;

describe( 'BannerCtrl.vue', () => {

	beforeEach( () => {
		resetFormModel( formModel );
		vi.useFakeTimers();
		tracker = {
			trackEvent: vi.fn()
		};
	} );

	afterEach( () => {
		vi.restoreAllMocks();
		vi.useRealTimers();
	} );

	const getWrapper = ( dynamicContent: DynamicContent = null ): VueWrapper<any> => {
		return mount( Banner, {
			attachTo: document.body,
			props: {
				bannerState: BannerStates.Pending,
				useOfFundsContent,
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
					currentCampaignTimePercentage: 42,
					formActions: {
						donateWithAddressAction: 'https://example.com/with-address',
						donateAnonymouslyAction: 'https://example.com/without-address'
					},
					currencyFormatter: new CurrencyEn(),
					formItems,
					tracker
				}
			}
		} );
	};

	describe( 'Main Banner', () => {
		test.each( [
			[ 'expectEmitsCloseEvent' ]
		] )( '%s', async ( testName: string ) => {
			await bannerMainFeatures[ testName ]( getWrapper() );
		} );
	} );

	describe( 'Content', () => {
		test.each( [
			[ 'expectSlideShowPlaysWhenBecomesVisible' ],
			[ 'expectSlideShowStopsOnFormInteraction' ]
		] )( '%s', async ( testName: string ) => {
			await bannerContentFeatures[ testName ]( getWrapper() );
		} );

		test.each( [
			[ 'expectShowsSlideShowOnSmallSizes' ],
			[ 'expectShowsMessageOnLargeSizes' ]
		] )( '%s', async ( testName: string ) => {
			await bannerContentDisplaySwitchFeatures[ testName ]( getWrapper, 1300 );
		} );

		test.each( [
			[ 'expectShowsAnimatedVisitorsVsDonorsSentenceInMessage' ],
			[ 'expectShowsAnimatedVisitorsVsDonorsSentenceInSlideShow' ]
		] )( '%s', async ( testName: string ) => {
			await bannerContentAnimatedTextFeatures[ testName ]( getWrapper );
		} );

		test.each( [
			[ 'expectShowsLiveDateAndTimeInMessage' ],
			[ 'expectShowsLiveDateAndTimeInSlideshow' ]
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
			[ 'expectMainDonationFormSubmitsWithAddressForPayPal' ],
			[ 'expectUpgradeToYearlyFormSubmitsWithAddressForDirectDebit' ],
			[ 'expectUpgradeToYearlyFormSubmitsWithAddressForPayPal' ]
		] )( '%s', async ( testName: string ) => {
			await formActionSwitchFeatures[ testName ]( getWrapper() );
		} );
	} );

	describe( 'Soft Close', () => {
		test.each( [
			[ 'expectDoesNotShowSoftClose' ]
		] )( '%s', async ( testName: string ) => {
			await softCloseFeatures[ testName ]( getWrapper() );
		} );
	} );

	describe( 'Soft Close Submit Tracking', () => {
		test.each( [
			// this ctrl banner does not have the softclose feature
			[ 'expectStoresCloseChoiceInBannerWithoutSoftClose' ]
		] )( '%s', async ( testName: string ) => {
			await softCloseSubmitTrackingFeaturesDesktop[ testName ]( getWrapper(), tracker );
		} );
	} );

	describe( 'Already Donated', () => {
		test.each( [
			[ 'expectFiresMaybeLaterEventOnLinkClick' ]
		] )( '%s', async ( testName: string ) => {
			await alreadyDonatedModalFeatures[ testName ]( getWrapper() );
		} );
	} );

	describe( 'Use of Funds', () => {
		test.each( [
			[ 'expectShowsUseOfFunds' ],
			[ 'expectHidesUseOfFunds' ]
		] )( '%s', async ( testName: string ) => {
			await useOfFundsFeatures[ testName ]( getWrapper() );
		} );
	} );
} );