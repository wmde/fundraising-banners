import { expect, vi } from 'vitest';
import { VueWrapper } from '@vue/test-utils';
import { CloseChoices } from '@src/domain/CloseChoices';
import { CloseEvent } from '@src/tracking/events/CloseEvent';

const expectShowsSoftCloseOnMiniBannerClose = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-close-button' ).trigger( 'click' );

	expect( wrapper.classes() ).toContain( 'wmde-banner-wrapper--soft-closing' );
	expect( wrapper.find( '.wmde-banner-soft-close' ).exists() ).toBeTruthy();
	expect( wrapper.emitted( 'bannerContentChanged' ).length ).toBe( 1 );
};

const expectDoesNotShowSoftCloseOnFullBannerClose = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-button' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-full-close' ).trigger( 'click' );

	expect( wrapper.classes() ).toContain( 'wmde-banner-wrapper--full-page' );
	expect( wrapper.find( '.wmde-banner-soft-close' ).exists() ).toBeFalsy();
	expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
	expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'FullPageBanner', CloseChoices.MaybeLater ) );
};

const expectEmitsSoftCloseCloseEvent = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-close-button' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-soft-close-button-close' ).trigger( 'click' );

	expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
	expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'SoftClose', CloseChoices.Close ) );
};

const expectEmitsSoftCloseMaybeLaterEvent = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-close-button' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-soft-close-button-maybe-later' ).trigger( 'click' );

	expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
	expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'SoftClose', CloseChoices.MaybeLater ) );
};

const expectEmitsSoftCloseTimeOutEvent = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	vi.useFakeTimers();

	await wrapper.find( '.wmde-banner-mini-close-button' ).trigger( 'click' );
	await vi.runAllTimersAsync();

	expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
	expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'SoftClose', CloseChoices.TimeOut ) );

	vi.restoreAllMocks();
};

const expectEmitsBannerContentChangedOnSoftClose = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-close-button' ).trigger( 'click' );

	expect( wrapper.emitted( 'bannerContentChanged' ).length ).toBe( 1 );
};

export const softCloseFeatures: Record<string, ( wrapper: VueWrapper<any> ) => Promise<any>> = {
	expectShowsSoftCloseOnMiniBannerClose,
	expectDoesNotShowSoftCloseOnFullBannerClose,
	expectEmitsSoftCloseCloseEvent,
	expectEmitsSoftCloseMaybeLaterEvent,
	expectEmitsSoftCloseTimeOutEvent,
	expectEmitsBannerContentChangedOnSoftClose
};
