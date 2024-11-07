import { VueWrapper } from '@vue/test-utils';
import { expect } from 'vitest';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { CloseChoices } from '@src/domain/CloseChoices';

const expectEmitsCloseEvent = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-main .wmde-banner-close' ).trigger( 'click' );

	expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
	expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'MainBanner', CloseChoices.Close ) );
};

const expectDoesNotEmitCloseEvent = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-main .wmde-banner-close' ).trigger( 'click' );

	expect( wrapper.emitted( 'bannerClosed' ) ).toBeUndefined();
};

const expectClosesBannerWhenWindowBecomesSmall = async ( getWrapper: () => VueWrapper<any> ): Promise<any> => {
	const wrapper = getWrapper();

	Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 800 } );
	window.dispatchEvent( new Event( 'resize' ) );

	Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 799 } );
	window.dispatchEvent( new Event( 'resize' ) );

	expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
	expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'MainBanner', CloseChoices.WindowSizeBelowMin ) );
};

export const bannerMainFeatures: Record<string, ( wrapper: VueWrapper<any> ) => Promise<any>> = {
	expectEmitsCloseEvent,
	expectDoesNotEmitCloseEvent
};

export const bannerAutoHideFeatures: Record<string, ( getWrapper: () => VueWrapper<any> ) => Promise<any>> = {
	expectClosesBannerWhenWindowBecomesSmall
};
