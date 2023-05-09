import { describe, expect, it, vi, test } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import Banner from '../../../../banners/english/components/BannerVar.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { dynamicCampaignContent } from '@test/banners/dynamicCampaignContent';
import { useOfFundsContent } from '@test/banners/useOfFundsContent';
import { formItems } from '@test/banners/formItems';
import { CloseSources } from '@src/tracking/CloseSources';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';
import SoftCloseFeatures from '@test/features/SoftCloseDesktop';

const translator = ( key: string ): string => key;

describe( 'BannerVar.vue', () => {
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
		test.each( [
			[ 'expectShowsSoftClose' ],
			[ 'expectEmitsSoftCloseCloseEvent' ],
			[ 'expectEmitsSoftCloseMaybeLaterEvent' ],
			[ 'expectEmitsSoftCloseTimeOutEvent' ],
			[ 'expectEmitsBannerContentChangedOnSoftClose' ]
		] )( '%s', async ( testName: string ) => {
			const wrapper = getWrapper();
			await SoftCloseFeatures[ testName ]( wrapper );
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

	describe( 'Already Donated Modal', () => {
		it( 'Shows the already donated modal', async () => {
			const wrapper = getWrapper();

			await wrapper.find( '.wmde-banner-footer-already-donated' ).trigger( 'click' );

			expect( wrapper.find( '.wmde-banner-already-donated' ).classes() ).toContain( 'wmde-banner-already-donated--is-visible' );
		} );

		it( 'Hides the already donated modal', async () => {
			const wrapper = getWrapper();

			await wrapper.find( '.wmde-banner-footer-already-donated' ).trigger( 'click' );
			await wrapper.find( '.wmde-banner-already-donated .wmde-banner-close' ).trigger( 'click' );

			expect( wrapper.find( '.wmde-banner-already-donated' ).classes() ).not.toContain( 'wmde-banner-already-donated--is-visible' );
		} );

		it( 'Fires the maybe later event', async () => {
			const wrapper = getWrapper();

			await wrapper.find( '.wmde-banner-footer-already-donated' ).trigger( 'click' );
			await wrapper.find( '.wmde-banner-already-donated-button-maybe-later' ).trigger( 'click' );

			expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
			expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toBe( CloseSources.MaybeLater );
		} );

		it( 'Fires the go away event', async () => {
			const wrapper = getWrapper();

			await wrapper.find( '.wmde-banner-footer-already-donated' ).trigger( 'click' );
			await wrapper.find( '.wmde-banner-already-donated-button-go-away' ).trigger( 'click' );

			expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
			expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toBe( CloseSources.AlreadyDonatedGoAway );
		} );
	} );

} );
