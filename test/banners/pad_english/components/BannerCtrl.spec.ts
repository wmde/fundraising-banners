import { describe, expect, it, test, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import Banner from '../../../../banners/pad_english/components/BannerCtrl.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { useOfFundsContent } from '@test/banners/useOfFundsContent';
import { dynamicCampaignContent } from '@test/banners/dynamicCampaignContent';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';
import { formItems } from '@test/banners/formItems';
import { useOfFundsFeatures } from '@test/features/UseOfFunds';

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
					formActions: {},
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

} );
