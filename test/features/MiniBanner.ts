import { VueWrapper } from '@vue/test-utils';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { expect } from 'vitest';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { CloseChoices } from '@src/domain/CloseChoices';

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

const expectEmitsCloseEvent = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-close' ).trigger( 'click' );

	expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
	expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'MiniBanner', CloseChoices.Close ) );
};

const expectsEmitsCloseEventOnAlreadyDonated = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-already-donated-button' ).trigger( 'click' );

	expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
	expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'MiniBanner', CloseChoices.AlreadyDonated ) );
};

export const miniBannerFeatures: Record<string, ( wrapper: VueWrapper<any> ) => Promise<any>> = {
	expectSlideShowPlaysWhenMiniBannerBecomesVisible,
	expectSlideShowStopsWhenFullBannerBecomesVisible,
	expectShowsFullPageWhenCallToActionIsClicked,
	expectShowsFullPageWithPreselectedAmountWhenPreselectButtonIsClicked,
	expectEmitsBannerContentChangedEventWhenCallToActionIsClicked,
	expectEmitsCloseEvent,
	expectsEmitsCloseEventOnAlreadyDonated
};
