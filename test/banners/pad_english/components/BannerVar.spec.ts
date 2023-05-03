import { describe, expect, it, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import Banner from '../../../../banners/pad_english/components/BannerVar.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { useOfFundsContent } from '@test/banners/useOfFundsContent';
import { dynamicCampaignContent } from '@test/banners/dynamicCampaignContent';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';
import { formItems } from '@test/banners/formItems';

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
