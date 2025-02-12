import { afterEach, beforeEach, describe, test } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import Banner from '@banners/pad/C25_WMDE_iPad_DE_00/components/BannerVar.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { newDynamicContent } from '@test/banners/dynamicCampaignContent';
import { useOfFundsContent } from '@test/banners/useOfFundsContent';
import { formItems } from '@test/banners/formItems';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';
import { TrackerStub } from '@test/fixtures/TrackerStub';
import { softCloseFeatures } from '@test/features/SoftCloseDesktop';
import { useOfFundsFeatures } from '@test/features/UseOfFunds';
import { bannerContentAnimatedTextFeatures, bannerContentFeatures } from '@test/features/BannerContent';
import { resetFormModel } from '@test/resetFormModel';
import { useFormModel } from '@src/components/composables/useFormModel';
import { donationFormFeatures } from '@test/features/forms/MainDonation_UpgradeToYearlyButton';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { bannerMainFeatures } from '@test/features/MainBanner';
import { Timer } from '@src/utils/Timer';
import { TimerStub } from '@test/fixtures/TimerStub';
import { fakeFormActions } from '@test/fixtures/FakeFormActions';
import { paymentIconFeatures } from '@test/features/PaymentIcons';

const formModel = useFormModel();
const translator = ( key: string ): string => key;

describe( 'BannerCtrl.vue', () => {
	let wrapper: VueWrapper<any>;
	beforeEach( () => {
		resetFormModel( formModel );
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
					currencyFormatter: new CurrencyEn(),
					formItems,
					tracker: new TrackerStub(),
					timer: timer ?? new TimerStub()
				}
			}
		} );

		return wrapper;
	};

	describe( 'Main Banner', () => {
		test.each( [
			[ 'expectDoesNotEmitCloseEvent' ],
			[ 'expectEmitsCloseEventWhenRemainingImpressionsAreZero' ]
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
			[ 'expectHidesAnimatedVisitorsVsDonorsSentenceInSlideShow' ],
			[ 'expectShowsAnimatedVisitorsVsDonorsSentenceInSlideShow' ]
		] )( '%s', async ( testName: string ) => {
			await bannerContentAnimatedTextFeatures[ testName ]( getWrapper );
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

	describe( 'Soft Close', () => {
		test.each( [
			[ 'expectShowsSoftClose' ],
			[ 'expectEmitsSoftCloseCloseEvent' ],
			[ 'expectEmitsSoftCloseMaybeLaterEvent' ],
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
	} );

	describe( 'Payment Icons', () => {
		test.each( [
			[ 'expectShowsPayPalLogo' ],
			[ 'expectShowsCreditCardLogos' ]
		] )( '%s', async ( testName: string ) => {
			await paymentIconFeatures[ testName ]( getWrapper() );
		} );
	} );

} );
