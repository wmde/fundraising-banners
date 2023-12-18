import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { flushPromises, mount, VueWrapper } from '@vue/test-utils';
import Banner from '../../../../banners/desktop/components/BannerVar.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { newDynamicContent } from '@test/banners/dynamicCampaignContent';
import { useOfFundsContent } from '@test/banners/useOfFundsContent';
import { formItems } from '@test/banners/formItems';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';
import { TrackerStub } from '@test/fixtures/TrackerStub';
import { softCloseFeatures } from '@test/features/SoftCloseDesktop';
import { useOfFundsFeatures } from '@test/features/UseOfFunds';
import {
	bannerContentAnimatedTextFeatures,
	bannerContentDateAndTimeFeatures,
	bannerContentDisplaySwitchFeatures,
	bannerContentFeatures
} from '@test/features/BannerContent';
import { useFormModel } from '@src/components/composables/useFormModel';
import { resetFormModel } from '@test/resetFormModel';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { bannerMainFeatures } from '@test/features/MainBanner';
import { alreadyDonatedModalFeatures } from '@test/features/AlreadyDonatedModal';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { FormItem } from '@src/utils/FormItemsBuilder/FormItem';
import { formActionSwitchFeatures } from '@test/features/form_action_switch/MainDonation_UpgradeToYearlyButton';
import { earlyBannerFeatures, fullBannerDelay } from '@test/features/EarlyBanner';

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
			attachTo: document.body,
			props: {
				bannerState: BannerStates.Pending,
				useOfFundsContent,
				remainingImpressions: 10,
				fullBannerDelay
			},
			global: {
				mocks: {
					$translate: translator
				},
				provide: {
					translator: { translate: translator },
					dynamicCampaignText: dynamicContent ?? newDynamicContent(),
					formActions: {
						donateWithAddressAction: 'https://example.com/with-address',
						donateAnonymouslyAction: 'https://example.com/without-address'
					},
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
			[ 'expectShowsLiveTimeInMessage' ],
			[ 'expectShowsLiveTimeInSlideshow' ]
		] )( '%s', async ( testName: string ) => {
			await bannerContentDateAndTimeFeatures[ testName ]( getWrapper );
		} );

		test.each( [
			[ 'expectMainDonationFormSubmitsWithAddressForDirectDebit' ],
			[ 'expectMainDonationFormSubmitsWithoutAddressForPayPal' ],
			[ 'expectUpgradeToYearlyFormSubmitsWithAddressForDirectDebit' ],
			[ 'expectUpgradeToYearlyFormSubmitsWithoutAddressForPayPal' ]
		] )( '%s', async ( testName: string ) => {
			await formActionSwitchFeatures[ testName ]( getWrapper() );
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

	describe( 'Main Donation Form Button Variable Payment Type', ()=> {
		test.each( [
			[ PaymentMethods.PAYPAL, 'submit-label-paypal' ],
			[ PaymentMethods.BANK_TRANSFER, 'submit-label-bank-transfer' ],
			[ PaymentMethods.CREDIT_CARD, 'submit-label-credit-card' ],
			[ PaymentMethods.DIRECT_DEBIT, 'submit-label' ]
		] )( 'should set the button label according to payment type', async (
			paymentType: FormItem, expectedButtonLabel: string ) => {
			formModel.paymentMethod.value = paymentType.value;
			await flushPromises();

			const wrapper = getWrapper();
			expect( wrapper.find( '.wmde-banner-form-button' ).text() ).toBe( expectedButtonLabel );
		} );
	} );

	describe( 'Early Banner', () => {
		test.each( [
			[ 'expectShowsSoftClose' ],
			[ 'expectSetsMainBannerDelay' ]
		] )( '%s', async ( testName: string ) => {
			await earlyBannerFeatures[ testName ]( getWrapper() );
		} );
	} );

} );
