import { beforeEach, describe, expect, it, test, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import Banner from '@banners/desktop/C25_WMDE_Desktop_DE_00/components/BannerVar.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { newDynamicContent } from '@test/banners/dynamicCampaignContent';
import { useOfFundsContent } from '@test/banners/useOfFundsContent';
import { formItems } from '@test/banners/formItems';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';
import { desktopUseOfFundsFeatures } from '@test/features/UseOfFunds';
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
import { bannerAutoHideFeatures, bannerMainFeatures } from '@test/features/MainBanner';
import { formActionSwitchFeatures } from '@test/features/form_action_switch/MainDonation_UpgradeToYearlyButton';
import { softCloseFeatures } from '@test/features/SoftCloseDesktop';
import { alreadyDonatedLinkFeatures } from '@test/features/AlreadyDonatedLink';
import { softCloseSubmitTrackingFeaturesDesktop } from '@test/features/SoftCloseSubmitTrackingDesktop';
import { Tracker } from '@src/tracking/Tracker';
import { TimerStub } from '@test/fixtures/TimerStub';
import { Timer } from '@src/utils/Timer';
import { fakeFormActions } from '@test/fixtures/FakeFormActions';

const formModel = useFormModel();
const translator = ( key: string ): string => key;
let tracker: Tracker;

describe( 'BannerVar.vue', () => {

	beforeEach( () => {
		resetFormModel( formModel );
		tracker = {
			trackEvent: vi.fn()
		};
	} );

	const getWrapper = ( dynamicContent: DynamicContent = null, timer: Timer = null ): VueWrapper<any> => {
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
					formActions: fakeFormActions,
					currencyFormatter: new CurrencyEn(),
					formItems,
					tracker,
					timer: timer ?? new TimerStub()
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
			[ 'expectShowsLiveDateAndTimeInTitle' ]
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
			[ 'expectShowsCloseIcon' ],
			[ 'expectCloseIconEmitsCloseEvent' ]
		] )( '%s', async ( testName: string ) => {
			await softCloseFeatures[ testName ]( getWrapper );
		} );
	} );

	describe( 'Soft Close Submit Tracking', () => {
		test.each( [
			[ 'expectEmitsBannerSubmitOnReturnEvent' ],
			[ 'expectDoesNotEmitsBannerSubmitOnReturnEventWhenLocalStorageItemIsMissing' ]
		] )( '%s', async ( testName: string ) => {
			await softCloseSubmitTrackingFeaturesDesktop[ testName ]( getWrapper(), tracker );
		} );
	} );

	describe( 'Already Donated', () => {
		test.each( [
			[ 'expectFiresMaybeLaterEventOnLinkClick' ]
		] )( '%s', async ( testName: string ) => {
			await alreadyDonatedLinkFeatures[ testName ]( getWrapper() );
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
} );
