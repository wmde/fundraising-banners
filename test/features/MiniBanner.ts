import { VueWrapper } from '@vue/test-utils';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { expect } from 'vitest';

const expectSlideShowPlaysWhenMiniBannerBecomesVisible = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.setProps( { bannerState: BannerStates.Visible } );

	expect( wrapper.find( '.wmde-banner-slider--playing' ).exists() ).toBeTruthy();
};

const expectSlideShowStopsWhenFullBannerBecomesVisible = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.setProps( { bannerState: BannerStates.Visible } );
	await wrapper.find( '.wmde-banner-mini-button' ).trigger( 'click' );

	expect( wrapper.find( '.wmde-banner-slider--stopped' ).exists() ).toBeTruthy();
};

const expectShowsFullPageWhenCallToActionIsClicked = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-button' ).trigger( 'click' );

	expect( wrapper.classes() ).toContain( 'wmde-banner-wrapper--full-page' );
};

const expectShowsFullPageWithPreselectedAmountWhenPreselectButtonIsClicked = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-button-preselect' ).trigger( 'click' );

	expect( wrapper.classes() ).toContain( 'wmde-banner-wrapper--full-page' );
	const preselectedAmountValue = wrapper.find<HTMLInputElement>( '.wmde-banner-submit-form input[name=amount]' ).element.value;
	expect( preselectedAmountValue ).toBeTruthy();
};

const expectEmitsBannerContentChangedEventWhenCallToActionIsClicked = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-button' ).trigger( 'click' );

	expect( wrapper.emitted( 'bannerContentChanged' ).length ).toBe( 1 );
};

export const miniBannerFeatures: Record<string, ( wrapper: VueWrapper<any> ) => Promise<any>> = {
	expectSlideShowPlaysWhenMiniBannerBecomesVisible,
	expectSlideShowStopsWhenFullBannerBecomesVisible,
	expectShowsFullPageWhenCallToActionIsClicked,
	expectShowsFullPageWithPreselectedAmountWhenPreselectButtonIsClicked,
	expectEmitsBannerContentChangedEventWhenCallToActionIsClicked
};
