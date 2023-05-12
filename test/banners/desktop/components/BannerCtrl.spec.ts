import { describe, expect, it, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import Banner from '../../../../banners/desktop/components/BannerCtrl.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { dynamicCampaignContent } from '@test/banners/dynamicCampaignContent';
import { useOfFundsContent } from '@test/banners/useOfFundsContent';
import { formItems } from '@test/banners/formItems';
import { CloseSources } from '@src/tracking/CloseSources';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';

const translator = ( key: string ): string => key;

describe( 'BannerCtrl.vue', () => {
	const getWrapper = (): VueWrapper<any> => {
		return mount( Banner, {
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
				useOfFundsContent
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
	};

	describe( 'Content', () => {
		it( 'Plays the slider when the banner state becomes visible', async () => {
			const wrapper = getWrapper();
			await wrapper.setProps( { bannerState: BannerStates.Visible } );

			expect( wrapper.find( '.wmde-banner-slider--playing' ).exists() ).toBeTruthy();
		} );

		it( 'Stops the slider when the form is interacted with', async () => {
			vi.useFakeTimers();

			const wrapper = getWrapper();
			await wrapper.setProps( { bannerState: BannerStates.Visible } );
			await wrapper.find( '.wmde-banner-form' ).trigger( 'click' );
			await vi.runOnlyPendingTimers();

			expect( wrapper.find( '.wmde-banner-slider--stopped' ).exists() ).toBeTruthy();

			vi.restoreAllMocks();
		} );

		it( 'Shows the slider on small sizes', async () => {
			Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 1300 } );
			const wrapper = getWrapper();

			expect( wrapper.find( '.wmde-banner-slider' ).exists() ).toBeTruthy();
		} );

		it( 'Shows the message on large sizes', async () => {
			Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 1301 } );
			const wrapper = getWrapper();

			expect( wrapper.find( '.wmde-banner-message' ).exists() ).toBeTruthy();
		} );
	} );

	describe( 'Soft Close', () => {
		it( 'Shows soft close on main banner close', async () => {
			const wrapper = getWrapper();

			await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );

			expect( wrapper.find( '.wmde-banner-soft-close' ).exists() ).toBeTruthy();
		} );

		it( 'Emits soft close close event', async () => {
			const wrapper = getWrapper();

			await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );
			await wrapper.find( '.wmde-banner-soft-close-button-close' ).trigger( 'click' );

			expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
			expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toBe( CloseSources.SoftCloseBannerRejected );

		} );

		it( 'Emits soft close maybe later event', async () => {
			const wrapper = getWrapper();

			await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );
			await wrapper.find( '.wmde-banner-soft-close-button-maybe-later' ).trigger( 'click' );

			expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
			expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toBe( CloseSources.MaybeLater );
		} );

		it( 'Emits soft close time out event', async () => {
			vi.useFakeTimers();

			const wrapper = getWrapper();

			await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );
			await vi.runAllTimers();

			expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
			expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toBe( CloseSources.TimeOut );

			vi.restoreAllMocks();
		} );

		it( 'Emits bannerContentChanged event on soft close', async () => {
			const wrapper = getWrapper();

			await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );

			expect( wrapper.emitted( 'bannerContentChanged' ).length ).toBe( 1 );
		} );
	} );

	describe( 'Use of Funds', () => {
		it( 'Shows use of funds', async () => {
			const wrapper = getWrapper();

			await wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );

			expect( wrapper.find( '.banner-modal' ).classes() ).toContain( 'is-visible' );
		} );

		it( 'Hides use of funds', async () => {
			const wrapper = getWrapper();

			await wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );
			await wrapper.find( '.banner-modal-close-link' ).trigger( 'click' );

			expect( wrapper.find( '.banner-modal' ).classes() ).not.toContain( 'is-visible' );
		} );
	} );

} );
