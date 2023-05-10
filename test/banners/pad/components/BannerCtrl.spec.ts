import { describe, expect, it, test } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import Banner from '../../../../banners/pad/components/BannerCtrl.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { dynamicCampaignContent } from '@test/banners/dynamicCampaignContent';
import { useOfFundsContent } from '@test/banners/useOfFundsContent';
import { formItems } from '@test/banners/formItems';
import { CloseSources } from '@src/tracking/CloseSources';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';
import { softCloseFeatures } from '@test/features/SoftCloseDesktop';
import { useOfFundsFeatures } from '@test/features/UseOfFunds';
import { desktopContentFeatures } from '@test/features/DesktopContent';

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
		test.each( [
			[ 'expectSlideShowPlaysWhenBecomesVisible' ],
			[ 'expectSlideShowStopsOnFormInteraction' ]
		] )( '%s', async ( testName: string ) => {
			await desktopContentFeatures[ testName ]( getWrapper );
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
			await softCloseFeatures[ testName ]( wrapper );
		} );
	} );

	describe( 'Use of Funds', () => {
		test.each( [
			[ 'expectShowsUseOfFunds' ],
			[ 'expectHidesUseOfFunds' ]
		] )( '%s', async ( testName: string ) => {
			const wrapper = getWrapper();
			await useOfFundsFeatures[ testName ]( wrapper );
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
