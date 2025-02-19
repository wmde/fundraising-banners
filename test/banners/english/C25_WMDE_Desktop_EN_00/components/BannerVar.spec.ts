import { beforeEach, describe, expect, it, test } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import Banner from '@banners/english/C25_WMDE_Desktop_EN_00/components/BannerVar.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { newDynamicContent } from '@test/banners/dynamicCampaignContent';
import { useOfFundsContent } from '@test/banners/useOfFundsContent2024';
import { formItems } from '@test/banners/formItems';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';
import { desktopUseOfFundsFeatures } from '@test/features/UseOfFunds2024';
import { bannerContentAnimatedTextFeatures, bannerContentDateAndTimeFeatures, bannerContentDisplaySwitchFeatures, bannerContentFeatures } from '@test/features/BannerContent';
import { TrackerStub } from '@test/fixtures/TrackerStub';
import { donationFormFeatures } from '@test/features/forms/MainDonationDonationReceipt_UpgradeToYearlyButton';
import { useFormModel } from '@src/components/composables/useFormModel';
import { resetFormModel } from '@test/resetFormModel';
import { bannerAutoHideFeatures, bannerMainFeatures } from '@test/features/MainBanner';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { alreadyDonatedLinkFeatures } from '@test/features/AlreadyDonatedLink';
import { softCloseFeatures } from '@test/features/SoftCloseDesktop';
import { Timer } from '@src/utils/Timer';
import { TimerStub } from '@test/fixtures/TimerStub';
import { fakeFormActions } from '@test/fixtures/FakeFormActions';
import { paymentIconFeatures } from '@test/features/PaymentIcons';

const formModel = useFormModel();
const translator = ( key: string ): string => key;

describe( 'BannerVar.vue', () => {

	beforeEach( () => {
		resetFormModel( formModel );
	} );

	const getWrapper = ( dynamicContent: DynamicContent = null, timer: Timer = null ): VueWrapper<any> => {
		return mount( Banner, {
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
					timer: timer ?? new TimerStub(),
					currentCampaignTimePercentage: 42
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

		test.each( [
			[ 'expectClosesBannerWhenWindowBecomesSmall' ]
		] )( '%s', async ( testName: string ) => {
			await bannerAutoHideFeatures[ testName ]( getWrapper );
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
			[ 'expectUpgradeToYearlyFormSubmitsDontUpgrade' ],
			[ 'expectMainDonationFormShowsDonationReceiptCheckbox' ]
		] )( '%s', async ( testName: string ) => {
			await donationFormFeatures[ testName ]( getWrapper() );
		} );

		it( 'Set the correct action when amount is above 10', async (): Promise<void> => {
			const wrapper = getWrapper();

			await wrapper.find( '.interval-0 input' ).trigger( 'change' );
			await wrapper.find( '.amount-10 input' ).trigger( 'change' );
			await wrapper.find( '.payment-ppl input' ).trigger( 'change' );

			const formActionAttribute = wrapper.find<HTMLFormElement>( '.wmde-banner-submit-form' ).element.action;
			expect( formActionAttribute ).toContain( 'with-address' );
			expect( formActionAttribute ).toContain( 'ap=1' );
		} );

		it( 'Set the correct action when amount is below 10 and receipt is not checked', async (): Promise<void> => {
			const wrapper = getWrapper();

			await wrapper.find( '.interval-0 input' ).trigger( 'change' );
			await wrapper.find( '.amount-5 input' ).trigger( 'change' );
			await wrapper.find( '.payment-ppl input' ).trigger( 'change' );

			expect( wrapper.find<HTMLFormElement>( '.wmde-banner-submit-form' ).element.action ).toContain( 'without-address' );
		} );

		it( 'Set the correct action when amount is below 10 and receipt is checked', async (): Promise<void> => {
			const wrapper = getWrapper();

			await wrapper.find( '.interval-0 input' ).trigger( 'change' );
			await wrapper.find( '.amount-5 input' ).trigger( 'change' );
			await wrapper.find( '.payment-ppl input' ).trigger( 'change' );
			await wrapper.find( '#wmde-banner-form-donation-receipt' ).trigger( 'click' );

			const formActionAttribute = wrapper.find<HTMLFormElement>( '.wmde-banner-submit-form' ).element.action;
			expect( formActionAttribute ).toContain( 'with-address' );
			expect( formActionAttribute ).toContain( 'ap=1' );
		} );

		it( 'Puts the receipt option into the submit form', async (): Promise<void> => {
			const wrapper = getWrapper();

			expect( wrapper.find<HTMLInputElement>( '.wmde-banner-submit-form [name="receipt"]' ).element.value ).toStrictEqual( 'false' );

			await wrapper.find( '.interval-0 input' ).trigger( 'change' );
			await wrapper.find( '.amount-5 input' ).trigger( 'change' );
			await wrapper.find( '.payment-ppl input' ).trigger( 'change' );
			await wrapper.find( '#wmde-banner-form-donation-receipt' ).trigger( 'click' );

			expect( wrapper.find<HTMLInputElement>( '.wmde-banner-submit-form [name="receipt"]' ).element.value ).toStrictEqual( 'true' );
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
			[ 'expectHidesUseOfFunds' ],
			[ 'expectEmitsModalOpenedEvent' ],
			[ 'expectEmitsModalClosedEvent' ]
		] )( '%s', async ( testName: string ) => {
			await desktopUseOfFundsFeatures[ testName ]( getWrapper() );
		} );
	} );

	describe( 'Already Donated', () => {
		test.each( [
			[ 'expectFiresMaybeLaterEventOnLinkClick' ]
		] )( '%s', async ( testName: string ) => {
			await alreadyDonatedLinkFeatures[ testName ]( getWrapper() );
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
