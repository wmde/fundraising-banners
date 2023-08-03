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

export const bannerMainFeatures: Record<string, ( wrapper: VueWrapper<any> ) => Promise<any>> = {
	expectEmitsCloseEvent,
	expectDoesNotEmitCloseEvent
};
