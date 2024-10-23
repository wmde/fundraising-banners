import { expect, vi } from 'vitest';
import { VueWrapper } from '@vue/test-utils';
import { CloseChoices } from '@src/domain/CloseChoices';
import { CloseEvent } from '@src/tracking/events/CloseEvent';

const expectShowsSoftClose = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );

	expect( wrapper.find( '.wmde-banner-soft-close' ).exists() ).toBeTruthy();
};

const expectDoesNotShowSoftClose = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );

	expect( wrapper.find( '.wmde-banner-soft-close' ).exists() ).toBeFalsy();
	expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'MainBanner', CloseChoices.Close ) );

	// TODO: "stores a flag in the user's browser." ?
};

const expectEmitsSoftCloseCloseEvent = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-soft-close-button-close' ).trigger( 'click' );

	expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
	expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'SoftClose', CloseChoices.Close ) );
};

const expectEmitsSoftCloseMaybeLaterEvent = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-soft-close-button-maybe-later' ).trigger( 'click' );

	expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
	expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'SoftClose', CloseChoices.MaybeLater ) );
};

const expectEmitsSoftCloseTimeOutEvent = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );

	await vi.runAllTimersAsync();

	expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
	expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'SoftClose', CloseChoices.TimeOut ) );
};

const expectEmitsBannerContentChangedOnSoftClose = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );

	expect( wrapper.emitted( 'bannerContentChanged' ).length ).toBe( 1 );
};

const expectDoesNotShowSoftCloseOnFinalBannerImpression = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.setProps( { remainingImpressions: 0 } );
	await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );

	expect( wrapper.find( '.wmde-banner-soft-close' ).exists() ).toBeFalsy();
	expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
	expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'MainBanner', CloseChoices.Close ) );
};

const expectShowsCloseIcon = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );

	expect( wrapper.find( '.wmde-banner-soft-close .wmde-banner-close' ).exists() ).toBeTruthy();
};

const expectCloseIconEmitsCloseEvent = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );

	await wrapper.find( '.wmde-banner-soft-close .wmde-banner-close' ).trigger( 'click' );

	expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
	expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'SoftClose', CloseChoices.Close ) );
};

export const softCloseFeatures: Record<string, ( wrapper: VueWrapper<any> ) => Promise<any>> = {
	expectShowsSoftClose,
	expectEmitsSoftCloseCloseEvent,
	expectEmitsSoftCloseMaybeLaterEvent,
	expectEmitsSoftCloseTimeOutEvent,
	expectEmitsBannerContentChangedOnSoftClose,
	expectDoesNotShowSoftClose,
	expectDoesNotShowSoftCloseOnFinalBannerImpression,
	expectShowsCloseIcon,
	expectCloseIconEmitsCloseEvent
};
