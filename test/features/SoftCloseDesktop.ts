import { expect, vi } from 'vitest';
import { VueWrapper } from '@vue/test-utils';
import { CloseChoices } from '@src/domain/CloseChoices';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { TrackingFeatures } from '@src/domain/TrackingFeatures';

const expectShowsSoftClose = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );

	expect( wrapper.find( '.wmde-banner-soft-close' ).exists() ).toBeTruthy();
};

const expectEmitsSoftCloseCloseEvent = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-soft-close-button-close' ).trigger( 'click' );

	expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
	expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( TrackingFeatures.SoftClose, CloseChoices.Close ) );
};

const expectEmitsSoftCloseMaybeLaterEvent = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-soft-close-button-maybe-later' ).trigger( 'click' );

	expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
	expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( TrackingFeatures.SoftClose, CloseChoices.MaybeLater ) );
};

const expectEmitsSoftCloseTimeOutEvent = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	vi.useFakeTimers();

	await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );
	await vi.runAllTimers();

	expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
	expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( TrackingFeatures.SoftClose, CloseChoices.TimeOut ) );

	vi.restoreAllMocks();
};

const expectEmitsBannerContentChangedOnSoftClose = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );

	expect( wrapper.emitted( 'bannerContentChanged' ).length ).toBe( 1 );
};

export const softCloseFeatures: Record<string, ( wrapper: VueWrapper<any> ) => Promise<any>> = {
	expectShowsSoftClose,
	expectEmitsSoftCloseCloseEvent,
	expectEmitsSoftCloseMaybeLaterEvent,
	expectEmitsSoftCloseTimeOutEvent,
	expectEmitsBannerContentChangedOnSoftClose
};
