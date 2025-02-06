import { VueWrapper } from '@vue/test-utils';
import { expect } from 'vitest';
import { CloseChoices } from '@src/domain/CloseChoices';
import { CloseEvent } from '@src/tracking/events/CloseEvent';

const expectFiresMaybeLaterEventOnLinkClick = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-footer-already-donated' ).trigger( 'click' );

	expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
	expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'AlreadyDonated', CloseChoices.AlreadyDonated ) );
};

export const alreadyDonatedLinkFeatures: Record<string, ( wrapper: VueWrapper<any> ) => Promise<any>> = {
	expectFiresMaybeLaterEventOnLinkClick
};
