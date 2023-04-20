import { describe, expect, it, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import BannerWrapper from '../../../../banners/desktop/components/BannerWrapper.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { dynamicCampaignContent } from '@test/banners/dynamicCampaignContent';
import { useOfFundsContent } from '@test/banners/useOfFundsContent';
import { CloseSources } from '@src/tracking/CloseSources';

describe( 'BannerWrapper.vue', () => {
	const getWrapper = (): VueWrapper<any> => {
		return mount( BannerWrapper, {
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
				useOfFundsContent
			},
			global: {
				mocks: {
					$translate: ( key: string ): string => key
				},
				provide: {
					dynamicCampaignText: dynamicCampaignContent,
					formActions: { donateWithAddressAction: 'https://example.com', donateWithoutAddressAction: 'https://example.com' }
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
			const wrapper = getWrapper();
			await wrapper.setProps( { bannerState: BannerStates.Visible } );
			await wrapper.find( '.wmde-banner-form' ).trigger( 'click' );

			expect( wrapper.find( '.wmde-banner-slider--stopped' ).exists() ).toBeTruthy();
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

			await wrapper.find( '.wmde-banner-close-link' ).trigger( 'click' );

			expect( wrapper.find( '.wmde-banner-soft-close' ).exists() ).toBeTruthy();
		} );

		it( 'Emits soft close close event', async () => {
			const wrapper = getWrapper();

			await wrapper.find( '.wmde-banner-close-link' ).trigger( 'click' );
			await wrapper.find( '.wmde-banner-soft-close-button-close' ).trigger( 'click' );

			expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
			expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toBe( CloseSources.SoftCloseBannerRejected );

		} );

		it( 'Emits soft close maybe later event', async () => {
			const wrapper = getWrapper();

			await wrapper.find( '.wmde-banner-close-link' ).trigger( 'click' );
			await wrapper.find( '.wmde-banner-soft-close-button-maybe-later' ).trigger( 'click' );

			expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
			expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toBe( CloseSources.MaybeLater );
		} );

		it( 'Emits soft close time out event', async () => {
			vi.useFakeTimers();

			const wrapper = getWrapper();

			await wrapper.find( '.wmde-banner-close-link' ).trigger( 'click' );
			await vi.runAllTimersAsync();

			expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
			expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toBe( CloseSources.TimeOut );

			vi.restoreAllMocks();
		} );

		it( 'Emits bannerContentChanged event on soft close', async () => {
			const wrapper = getWrapper();

			await wrapper.find( '.wmde-banner-close-link' ).trigger( 'click' );

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
