import { afterEach, beforeEach, describe, expect, it, test, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import Banner from '../../../../banners/desktop/components/BannerVar.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { newDynamicContent } from '@test/banners/dynamicCampaignContent';
import { useOfFundsContent } from '@test/banners/useOfFundsContent';
import { formItems } from '@test/banners/formItems';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';
import { softCloseFeatures } from '@test/features/SoftCloseDesktop';
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
import { alreadyDonatedModalFeatures } from '@test/features/AlreadyDonatedModal';
import { TrackerSpy } from '@test/fixtures/TrackerSpy';
import { BannerMaximisedEvent } from '../../../../banners/desktop/events/BannerMaximisedEvent';
import { formActionSwitchFeatures } from '@test/features/form_action_switch/MainDonation_UpgradeToYearlyButton';

const formModel = useFormModel();
const translator = ( key: string ): string => key;

describe( 'BannerVar.vue', () => {
	let tracker: TrackerSpy;

	beforeEach( () => {
		tracker = new TrackerSpy();
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
				remainingImpressions: 10
			},
			global: {
				mocks: {
					$translate: translator
				},
				provide: {
					translator: { translate: translator },
					dynamicCampaignText: dynamicContent ?? newDynamicContent(),
					currentCampaignTimePercentage: 42,
					formActions: { donateWithAddressAction: 'https://example.com/with-address', donateAnonymouslyAction: 'https://example.com/without-address' },
					currencyFormatter: new CurrencyEn(),
					formItems,
					tracker
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

	describe( 'Minimised Banner', () => {
		it( 'minimises banner', async () => {
			const wrapper = getWrapper();

			await wrapper.find( '.wmde-banner-minimised-minimise' ).trigger( 'click' );

			expect( wrapper.classes() ).toContain( 'wmde-banner-wrapper--minimised' );
		} );

		it( 'tracks minimised event', async () => {
			const wrapper = getWrapper();

			await wrapper.find( '.wmde-banner-minimised-minimise' ).trigger( 'click' );

			expect( tracker.hasTrackedEvent( 'banner-minimised' ) );
		} );

		it( 'maximises banner when icon is clicked', async () => {
			const wrapper = getWrapper();

			await wrapper.find( '.wmde-banner-minimised-minimise' ).trigger( 'click' );
			await wrapper.find( '.wmde-banner-minimised-maximise' ).trigger( 'click' );

			expect( wrapper.classes() ).toContain( 'wmde-banner-wrapper--main' );
		} );

		it( 'maximises banner when button is clicked', async () => {
			const wrapper = getWrapper();

			await wrapper.find( '.wmde-banner-minimised-minimise' ).trigger( 'click' );
			await wrapper.find( '.wmde-banner-minimised-submit-button' ).trigger( 'click' );

			expect( wrapper.classes() ).toContain( 'wmde-banner-wrapper--main' );
		} );

		it( 'tracks maximised event from icon', async () => {
			const wrapper = getWrapper();

			await wrapper.find( '.wmde-banner-minimised-minimise' ).trigger( 'click' );
			await wrapper.find( '.wmde-banner-minimised-maximise' ).trigger( 'click' );

			expect( tracker.hasTrackedEvent( 'banner-maximised' ) ).toBeTruthy();
			expect( tracker.getTrackedEvent( 'banner-maximised' ) ).toStrictEqual( new BannerMaximisedEvent( 'maximise' ) );
		} );

		it( 'tracks maximised event from button', async () => {
			const wrapper = getWrapper();

			await wrapper.find( '.wmde-banner-minimised-minimise' ).trigger( 'click' );
			await wrapper.find( '.wmde-banner-minimised-submit-button' ).trigger( 'click' );

			expect( tracker.hasTrackedEvent( 'banner-maximised' ) ).toBeTruthy();
			expect( tracker.getTrackedEvent( 'banner-maximised' ) ).toStrictEqual( new BannerMaximisedEvent( 'cta' ) );
		} );

		it( 'shows use of funds from minimised banner', async () => {
			const wrapper = getWrapper();

			await wrapper.find( '.wmde-banner-minimised-minimise' ).trigger( 'click' );
			await wrapper.find( '.wmde-banner-minimised .wmde-banner-footer-usage-link' ).trigger( 'click' );

			expect( wrapper.find( '.banner-modal' ).classes() ).toContain( 'is-visible' );
		} );
	} );

} );
