import { VueWrapper } from '@vue/test-utils';
import { expect } from 'vitest';
import { CloseChoices } from '@src/domain/CloseChoices';
import { CloseEvent } from '@src/tracking/events/CloseEvent';

const expectShowsAlreadyDonatedModal = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-footer-already-donated' ).trigger( 'click' );

	expect( wrapper.find( '.wmde-banner-already-donated' ).classes() ).toContain( 'wmde-banner-already-donated--is-visible' );
};

const expectHidesAlreadyDonatedModal = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-footer-already-donated' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-already-donated .wmde-banner-close' ).trigger( 'click' );

	expect( wrapper.find( '.wmde-banner-already-donated' ).classes() ).not.toContain( 'wmde-banner-already-donated--is-visible' );
};

const expectFiresMaybeLaterEvent = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-footer-already-donated' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-already-donated-button-maybe-later' ).trigger( 'click' );

	expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
	expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'AlreadyDonatedModal', CloseChoices.Close ) );
};

const expectFiresGoAwayEvent = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-footer-already-donated' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-already-donated-button-go-away' ).trigger( 'click' );

	expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
	expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'AlreadyDonatedModal', CloseChoices.NoMoreBannersForCampaign ) );
};

export const alreadyDonatedModalFeatures: Record<string, ( wrapper: VueWrapper<any> ) => Promise<any>> = {
	expectShowsAlreadyDonatedModal,
	expectHidesAlreadyDonatedModal,
	expectFiresMaybeLaterEvent,
	expectFiresGoAwayEvent
};
