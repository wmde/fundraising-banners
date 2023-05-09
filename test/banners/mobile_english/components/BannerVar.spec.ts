import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import Banner from '../../../../banners/mobile_english/components/BannerVar.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { CloseSources } from '@src/tracking/CloseSources';
import { PageScroller } from '@src/utils/PageScroller/PageScroller';
import { useOfFundsContent } from '@test/banners/useOfFundsContent';
import { dynamicCampaignContent } from '@test/banners/dynamicCampaignContent';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';
import { formItems } from '@test/banners/formItems';

let pageScroller: PageScroller;
const translator = ( key: string ): string => key;

describe( 'BannerVar.vue', () => {

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
		it( 'Shows the soft close when mini banner is closed', async () => {
			await wrapper.find( '.wmde-banner-mini-close-button' ).trigger( 'click' );

			expect( wrapper.classes() ).toContain( 'wmde-banner-wrapper--soft-closing' );
			expect( wrapper.find( '.wmde-banner-soft-close' ).exists() ).toBeTruthy();
			expect( wrapper.emitted( 'bannerContentChanged' ).length ).toBe( 1 );
		} );

		it( 'Does not show the soft close when full banner is closed', async () => {
			await wrapper.find( '.wmde-banner-mini-button' ).trigger( 'click' );
			await wrapper.find( '.wmde-banner-full-close' ).trigger( 'click' );

			expect( wrapper.classes() ).toContain( 'wmde-banner-wrapper--full-page' );
			expect( wrapper.find( '.wmde-banner-soft-close' ).exists() ).toBeFalsy();
			expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
			expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toBe( CloseSources.FollowUpBanner );
		} );

		it( 'Emits bannerContentChanged event on soft close', async () => {
			await wrapper.find( '.wmde-banner-mini-close-button' ).trigger( 'click' );

			expect( wrapper.emitted( 'bannerContentChanged' ).length ).toBe( 1 );
		} );

		it( 'Emits soft close close event', async () => {
			await wrapper.find( '.wmde-banner-mini-close-button' ).trigger( 'click' );
			await wrapper.find( '.wmde-banner-soft-close-button-close' ).trigger( 'click' );

			expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
			expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toBe( CloseSources.SoftCloseBannerRejected );

		} );

		it( 'Emits soft close maybe later event', async () => {
			await wrapper.find( '.wmde-banner-mini-close-button' ).trigger( 'click' );
			await wrapper.find( '.wmde-banner-soft-close-button-maybe-later' ).trigger( 'click' );

			expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
			expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toBe( CloseSources.MaybeLater );
		} );

		it( 'Emits soft close time out event', async () => {
			vi.useFakeTimers();

			await wrapper.find( '.wmde-banner-mini-close-button' ).trigger( 'click' );
			await vi.runAllTimersAsync();

			expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
			expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toBe( CloseSources.TimeOut );

			vi.restoreAllMocks();
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
