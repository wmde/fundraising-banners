import { VueWrapper } from '@vue/test-utils';
import { expect } from 'vitest';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { CloseChoices } from '@src/domain/CloseChoices';

const expectEmitsCloseEvent = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-button' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-full-close' ).trigger( 'click' );

	expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
	expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'FullPageBanner', CloseChoices.MaybeLater ) );
};

export const fullPageBannerFeatures: Record<string, ( wrapper: VueWrapper<any> ) => Promise<any>> = {
	expectEmitsCloseEvent
};
