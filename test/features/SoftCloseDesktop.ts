import { expect } from 'vitest';
import { VueWrapper } from '@vue/test-utils';
import { CloseChoices } from '@src/domain/CloseChoices';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { TimerSpy } from '@test/fixtures/TimerSpy';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { Timer } from '@src/utils/Timer';

const expectShowsSoftClose = async ( getWrapper: () => VueWrapper<any> ): Promise<any> => {
	const wrapper = getWrapper();

	await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );

	expect( wrapper.find( '.wmde-banner-soft-close' ).exists() ).toBeTruthy();
};

const expectDoesNotShowSoftClose = async ( getWrapper: () => VueWrapper<any> ): Promise<any> => {
	const wrapper = getWrapper();

	await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );

	expect( wrapper.find( '.wmde-banner-soft-close' ).exists() ).toBeFalsy();
	expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'MainBanner', CloseChoices.Close ) );
};

const expectEmitsSoftCloseCloseEvent = async ( getWrapper: () => VueWrapper<any> ): Promise<any> => {
	const wrapper = getWrapper();

	await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-soft-close-button-close' ).trigger( 'click' );

	expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
	expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'SoftClose', CloseChoices.Close ) );
};

const expectEmitsSoftCloseMaybeLaterEvent = async ( getWrapper: () => VueWrapper<any> ): Promise<any> => {
	const wrapper = getWrapper();

	await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-soft-close-button-maybe-later' ).trigger( 'click' );

	expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
	expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'SoftClose', CloseChoices.MaybeLater ) );
};

const expectEmitsSoftCloseTimeOutEvent = async ( getWrapper: ( dynamicContent: DynamicContent, timer: Timer ) => VueWrapper<any> ): Promise<any> => {
	const timerSpy = new TimerSpy();
	const wrapper = getWrapper( null, timerSpy );

	await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );

	// The soft close counts down over 15 seconds so we need to keep advancing until it runs out
	for ( let i: number = 0; i < 15; i++ ) {
		await timerSpy.advanceInterval();
	}

	expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
	expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'SoftClose', CloseChoices.TimeOut ) );
};

const expectEmitsBannerContentChangedOnSoftClose = async ( getWrapper: () => VueWrapper<any> ): Promise<any> => {
	const wrapper = getWrapper();

	await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );

	expect( wrapper.emitted( 'bannerContentChanged' ).length ).toBeGreaterThanOrEqual( 1 );
};

const expectDoesNotShowSoftCloseOnFinalBannerImpression = async ( getWrapper: () => VueWrapper<any> ): Promise<any> => {
	const wrapper = getWrapper();

	await wrapper.setProps( { remainingImpressions: 0 } );
	await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );

	expect( wrapper.find( '.wmde-banner-soft-close' ).exists() ).toBeFalsy();
	expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
	expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'MainBanner', CloseChoices.Close ) );
};

const expectShowsCloseIcon = async ( getWrapper: () => VueWrapper<any> ): Promise<any> => {
	const wrapper = getWrapper();

	await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );

	expect( wrapper.find( '.wmde-banner-soft-close .wmde-banner-close' ).exists() ).toBeTruthy();
};

const expectCloseIconEmitsCloseEvent = async ( getWrapper: () => VueWrapper<any> ): Promise<any> => {
	const wrapper = getWrapper();

	await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );

	await wrapper.find( '.wmde-banner-soft-close .wmde-banner-close' ).trigger( 'click' );

	expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
	expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'SoftClose', CloseChoices.Close ) );
};

export const softCloseFeatures: Record<string, ( getWrapper: () => VueWrapper<any> ) => Promise<any>> = {
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
