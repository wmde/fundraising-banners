import { afterEach, beforeEach, describe, test, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import Banner from '../../../../banners/wpde_desktop/components/BannerVar.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { newDynamicContent } from '@test/banners/dynamicCampaignContent';
import { useOfFundsContent } from '@test/banners/useOfFundsContent';
import { formItems } from '@test/banners/formItems';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';
import { useOfFundsFeatures } from '@test/features/UseOfFunds';
import {
	bannerContentAnimatedTextFeatures, bannerContentDateAndTimeFeatures,
	bannerContentDisplaySwitchFeatures,
	bannerContentFeatures
} from '@test/features/BannerContent';
import { TrackerStub } from '@test/fixtures/TrackerStub';
import { donationFormFeatures } from '@test/features/forms/MainDonation_UpgradeToYearly_CustomAmount';
import { useFormModel } from '@src/components/composables/useFormModel';
import { resetFormModel } from '@test/resetFormModel';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { bannerMainFeatures } from '@test/features/MainBanner';
import { softCloseFeatures } from '@test/features/SoftCloseDesktop';
import { setCookieImageFeatures } from '@test/features/SetCookieImage';
import { alreadyDonatedModalFeatures } from '@test/features/AlreadyDonatedModal';

const formModel = useFormModel();
const translator = ( key: string ): string => key;

describe( 'BannerVar.vue', () => {

	beforeEach( () => {
		resetFormModel( formModel );
		vi.useFakeTimers();
	} );

	afterEach( () => {
		vi.restoreAllMocks();
		vi.useRealTimers();
	} );

	const getWrapper = ( dynamicContent: DynamicContent = null ): VueWrapper<any> => {
		return mount( Banner, {
			props: {
				bannerState: BannerStates.Pending,
				useOfFundsContent,
				remainingImpressions: 10
			},
			global: {
				mocks: {
					$translate: translator
				},
				provide: {
					translator: { translate: translator },
					dynamicCampaignText: dynamicContent ?? newDynamicContent(),
					formActions: { donateWithAddressAction: 'https://example.com', donateWithoutAddressAction: 'https://example.com' },
					currencyFormatter: new CurrencyEn(),
					formItems,
					tracker: new TrackerStub()
				}
			}
		} );
	};

	describe( 'Main Banner', () => {
		test.each( [
			[ 'expectDoesNotEmitCloseEvent' ]
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
			[ 'expectHidesAnimatedVisitorsVsDonorsSentenceInMessage' ],
			[ 'expectShowsAnimatedVisitorsVsDonorsSentenceInMessage' ],
			[ 'expectHidesAnimatedVisitorsVsDonorsSentenceInSlideShow' ],
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
			[ 'expectUpgradeToYearlyFormSubmitsDontUpgrade' ],
			[ 'expectUpgradeToYearlyFormGoesToCustomAmount' ],
			[ 'expectCustomAmountFormSubmits' ]
		] )( '%s', async ( testName: string ) => {
			await donationFormFeatures[ testName ]( getWrapper() );
		} );
	} );

	describe( 'Soft Close', () => {
		test.each( [
			[ 'expectShowsSoftClose' ],
			[ 'expectEmitsSoftCloseCloseEvent' ],
			[ 'expectEmitsSoftCloseMaybeLaterEvent' ],
			[ 'expectEmitsSoftCloseTimeOutEvent' ],
			[ 'expectEmitsBannerContentChangedOnSoftClose' ],
			[ 'expectDoesNotShowSoftCloseOnFinalBannerImpression' ]
		] )( '%s', async ( testName: string ) => {
			await softCloseFeatures[ testName ]( getWrapper() );
		} );
	} );

	describe( 'Set Cookie Image', () => {
		test.each( [
			[ 'expectSetsCookieImageOnSoftCloseClose' ],
			[ 'expectSetsCookieImageOnSoftCloseTimeOut' ],
			[ 'expectDoesNotSetCookieImageOnSoftCloseMaybeLater' ],
			[ 'expectSetCookieImageOnAlreadyDonatedMaybeLater' ],
			[ 'expectSetAlreadyDonatedCookieImageOnAlreadyDonatedNoMoreBanners' ],
			[ 'expectSetsMaybeLaterCookieOnSoftCloseMaybeLater' ]
		] )( '%s', async ( testName: string ) => {
			await setCookieImageFeatures[ testName ]( getWrapper() );
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

	describe( 'Already Donated', () => {
		test.each( [
			[ 'expectShowsAlreadyDonatedModal' ],
			[ 'expectHidesAlreadyDonatedModal' ],
			[ 'expectFiresMaybeLaterEvent' ],
			[ 'expectFiresGoAwayEvent' ]
		] )( '%s', async ( testName: string ) => {
			await alreadyDonatedModalFeatures[ testName ]( getWrapper() );
		} );
	} );

} );
