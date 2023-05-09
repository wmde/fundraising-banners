import { beforeEach, describe, expect, it, vi, test } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import Banner from '../../../../banners/mobile_english/components/BannerCtrl.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { PageScroller } from '@src/utils/PageScroller/PageScroller';
import { useOfFundsContent } from '@test/banners/useOfFundsContent';
import { dynamicCampaignContent } from '@test/banners/dynamicCampaignContent';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';
import { formItems } from '@test/banners/formItems';
import SoftCloseFeatures from '@test/features/SoftCloseMobile';

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
			await SoftCloseFeatures[ testName ]( wrapper );
		} );
	} );

	describe( 'Use of Funds', () => {
		it( 'Shows use of funds when the link is clicked from the full banner', async () => {
			await wrapper.find( '.wmde-banner-mini-button' ).trigger( 'click' );
			await wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );

			expect( wrapper.find( '.banner-modal' ).classes() ).toContain( 'is-visible' );
		} );

		it( 'Hides use of funds when the close link is clicked', async () => {
			await wrapper.find( '.wmde-banner-mini-button' ).trigger( 'click' );
			await wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );
			await wrapper.find( '.banner-modal-close-link' ).trigger( 'click' );

			expect( wrapper.find( '.banner-modal' ).classes() ).not.toContain( 'is-visible' );
		} );

		it( 'Scrolls to the form when the use of funds call to action is clicked', async () => {
			await wrapper.find( '.wmde-banner-mini-button' ).trigger( 'click' );
			await wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );
			await wrapper.find( '.use-of-funds-button' ).trigger( 'click' );

			expect( pageScroller.scrollIntoView ).toHaveBeenCalledOnce();
			expect( pageScroller.scrollIntoView ).toHaveBeenCalledWith( '.wmde-banner-form' );
		} );

		it( 'Scrolls to the use of funds link when the use of funds close button is clicked', async () => {
			await wrapper.find( '.wmde-banner-mini-button' ).trigger( 'click' );
			await wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );
			await wrapper.find( '.banner-modal-close-link' ).trigger( 'click' );

			expect( pageScroller.scrollIntoView ).toHaveBeenCalledOnce();
			expect( pageScroller.scrollIntoView ).toHaveBeenCalledWith( '.wmde-banner-full-small-print .wmde-banner-footer-usage-link' );
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
