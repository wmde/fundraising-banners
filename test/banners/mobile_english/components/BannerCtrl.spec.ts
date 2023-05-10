import { beforeEach, describe, expect, it, vi, test } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import Banner from '../../../../banners/mobile_english/components/BannerCtrl.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { PageScroller } from '@src/utils/PageScroller/PageScroller';
import { useOfFundsContent } from '@test/banners/useOfFundsContent';
import { dynamicCampaignContent } from '@test/banners/dynamicCampaignContent';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';
import { formItems } from '@test/banners/formItems';
import { softCloseFeatures } from '@test/features/SoftCloseMobile';
import { useOfFundsFeatures, useOfFundsScrollFeatures } from '@test/features/UseOfFunds';

let pageScroller: PageScroller;
const translator = ( key: string ): string => key;

describe( 'BannerCtrl.vue', () => {

	let wrapper: VueWrapper<any>;
	beforeEach( () => {
		pageScroller = {
			scrollIntoView: vi.fn(),
			scrollToTop: vi.fn()
		};

		wrapper = mount( Banner, {
			props: {
				bannerState: BannerStates.Pending,
				formController: {
					submitStep: () => {},
					next: () => {},
					previous: () => {},
					onNext: () => {},
					onPrevious: () => {},
					onGoToStep: () => {},
					onSubmit: () => {}
				},
				forms: [],
				useOfFundsContent,
				pageScroller
			},
			global: {
				mocks: {
					$translate: translator
				},
				provide: {
					translator: { translate: translator },
					dynamicCampaignText: dynamicCampaignContent,
					formActions: { donateWithAddressAction: 'https://example.com', donateWithoutAddressAction: 'https://example.com' },
					currencyFormatter: new CurrencyEn(),
					formItems
				}
			}
		} );
	} );

	describe( 'Soft Close', () => {
		test.each( [
			[ 'expectShowsSoftCloseOnMiniBannerClose' ],
			[ 'expectDoesNotShowSoftCloseOnFullBannerClose' ],
			[ 'expectEmitsSoftCloseCloseEvent' ],
			[ 'expectEmitsSoftCloseMaybeLaterEvent' ],
			[ 'expectEmitsSoftCloseTimeOutEvent' ],
			[ 'expectEmitsBannerContentChangedOnSoftClose' ]
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

		it( 'Plays the mini banner slideshow when the banner becomes visible', async () => {
			await wrapper.setProps( { bannerState: BannerStates.Visible } );

			expect( wrapper.find( '.wmde-banner-slider--playing' ).exists() ).toBeTruthy();
		} );

		it( 'Stops the mini banner slideshow when the full page becomes visible', async () => {
			await wrapper.setProps( { bannerState: BannerStates.Visible } );
			await wrapper.find( '.wmde-banner-mini-button' ).trigger( 'click' );

			expect( wrapper.find( '.wmde-banner-slider--stopped' ).exists() ).toBeTruthy();
		} );

		it( 'Shows the full page banner when the mini banner show button is clicked', async () => {
			await wrapper.find( '.wmde-banner-mini-button' ).trigger( 'click' );

			expect( wrapper.classes() ).toContain( 'wmde-banner-wrapper--full-page' );
		} );

		it( 'Emits bannerContentChanged when the mini banner show button is clicked', async () => {
			await wrapper.find( '.wmde-banner-mini-button' ).trigger( 'click' );

			expect( wrapper.emitted( 'bannerContentChanged' ).length ).toBe( 1 );
		} );
	} );

} );
