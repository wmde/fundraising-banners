import { beforeEach, describe, it, vi, test, afterEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import Banner from '../../../../banners/mobile_english/components/BannerVar.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { PageScroller } from '@src/utils/PageScroller/PageScroller';
import { useOfFundsContent } from '@test/banners/useOfFundsContent';
import { newDynamicContent } from '@test/banners/dynamicCampaignContent';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';
import { formItems } from '@test/banners/formItems';
import { TrackerStub } from '@test/fixtures/TrackerStub';
import { softCloseFeatures } from '@test/features/SoftCloseMobile';
import { useOfFundsFeatures, useOfFundsScrollFeatures } from '@test/features/UseOfFunds';
import { miniBannerFeatures } from '@test/features/MiniBanner';
import { expectMainDonationFormSubmits } from '@test/features/forms/subForms/MainDonationForm';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { useFormModel } from '@src/components/composables/useFormModel';
import { resetFormModel } from '@test/resetFormModel';
import { fullPageBannerFeatures } from '@test/features/FullPageBanner';

let pageScroller: PageScroller;
const formModel = useFormModel();
const translator = ( key: string ): string => key;

describe( 'BannerVar.vue', () => {

	let wrapper: VueWrapper<any>;
	beforeEach( () => {
		resetFormModel( formModel );
		vi.useFakeTimers();

		pageScroller = {
			scrollIntoView: vi.fn(),
			scrollToTop: vi.fn()
		};

		wrapper = mount( Banner, {
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
					dynamicCampaignText: newDynamicContent(),
					formActions: { donateWithAddressAction: 'https://example.com', donateWithoutAddressAction: 'https://example.com' },
					currencyFormatter: new CurrencyEn(),
					formItems,
					tracker: new TrackerStub()
				}
			}
		} );
	} );

	afterEach( () => {
		vi.restoreAllMocks();
		vi.useRealTimers();
	} );

	describe( 'Donation Form Happy Paths', () => {
		it( 'Submits the main donation form', () => {
			expectMainDonationFormSubmits( wrapper, Intervals.ONCE, PaymentMethods.PAYPAL );
		} );
	} );

	describe( 'Soft Close', () => {
		test.each( [
			[ 'expectShowsSoftCloseOnMiniBannerClose' ],
			[ 'expectDoesNotShowSoftCloseOnFullBannerClose' ],
			[ 'expectEmitsSoftCloseCloseEvent' ],
			[ 'expectEmitsSoftCloseMaybeLaterEvent' ],
			[ 'expectEmitsSoftCloseTimeOutEvent' ],
			[ 'expectEmitsBannerContentChangedOnSoftClose' ],
			[ 'expectDoesNotShowSoftCloseOnFinalBannerImpression' ]
		] )( '%s', async ( testName: string ) => {
			await softCloseFeatures[ testName ]( wrapper );
		} );
	} );

	describe( 'Use of Funds', () => {
		test.each( [
			[ 'expectShowsUseOfFunds' ],
			[ 'expectHidesUseOfFunds' ]
		] )( '%s', async ( testName: string ) => {
			await useOfFundsFeatures[ testName ]( wrapper );
		} );

		test.each( [
			[ 'expectScrollsToFormWhenCallToActionIsClicked' ],
			[ 'expectScrollsToLinkWhenCloseIsClicked' ]
		] )( '%s', async ( testName: string ) => {
			await useOfFundsScrollFeatures[ testName ]( wrapper, pageScroller );
		} );
	} );

	describe( 'Mini Banner', () => {
		test.each( [
			[ 'expectSlideShowPlaysWhenMiniBannerBecomesVisible' ],
			[ 'expectSlideShowStopsWhenFullBannerBecomesVisible' ],
			[ 'expectShowsFullPageWhenCallToActionIsClicked' ],
			[ 'expectEmitsBannerContentChangedEventWhenCallToActionIsClicked' ]
		] )( '%s', async ( testName: string ) => {
			await miniBannerFeatures[ testName ]( wrapper );
		} );
	} );

	describe( 'Full Page Banner', () => {
		test.each( [
			[ 'expectEmitsCloseEvent' ]
		] )( '%s', async ( testName: string ) => {
			await fullPageBannerFeatures[ testName ]( wrapper );
		} );
	} );

} );
