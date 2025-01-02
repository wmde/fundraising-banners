import { VueWrapper } from '@vue/test-utils';
import { expect } from 'vitest';
import { PageScroller } from '@src/utils/PageScroller/PageScroller';
import { UseOfFundsShownEvent } from '@src/tracking/events/UseOfFundsShownEvent';
import UseOfFundsModal from '@src/components/UseOfFunds2024/UseOfFundsModal.vue';
import { Tracker } from '@src/tracking/Tracker';

/*
The new 2024 use of funds component uses the html <dialog> element
which currently (2024) has no direct support from our testing library for visibility checking
 */
const expectShowsUseOfFunds = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );

	expect( wrapper.findComponent( UseOfFundsModal ).emitted( 'shown' ).length ).toBe( 1 );
};

const expectShowsUseOfFundsOnMiniBanner = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-uof-link' ).trigger( 'click' );

	expect( wrapper.findComponent( UseOfFundsModal ).emitted( 'shown' ).length ).toBe( 1 );
};

const expectHidesUseOfFunds = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-funds-modal-close button' ).trigger( 'click' );

	expect( wrapper.findComponent( UseOfFundsModal ).emitted( 'hide' ).length ).toBe( 1 );
};

const expectScrollsToFormWhenCallToActionIsClicked = async ( wrapper: VueWrapper<any>, pageScroller: PageScroller ): Promise<any> => {
	await wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );
	await wrapper.find( '.call-to-action button' ).trigger( 'click' );

	expect( pageScroller.scrollIntoView ).toHaveBeenCalledOnce();
	expect( pageScroller.scrollIntoView ).toHaveBeenCalledWith( '.wmde-banner-form' );
	expect( wrapper.findComponent( UseOfFundsModal ).emitted( 'callToAction' ).length ).toStrictEqual( 1 );
};

const expectScrollsToFormWhenCloseIsClicked = async ( wrapper: VueWrapper<any>, pageScroller: PageScroller ): Promise<any> => {
	await wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-funds-modal-close button' ).trigger( 'click' );

	expect( pageScroller.scrollIntoView ).toHaveBeenCalledOnce();
	expect( pageScroller.scrollIntoView ).toHaveBeenCalledWith( '.wmde-banner-form' );
};

const expectEmitsModalOpenedEvent = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );

	expect( wrapper.emitted( 'onModalOpened' ).length ).toStrictEqual( 1 );
};

const expectEmitsModalClosedEvent = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.banner-modal-close-link' ).trigger( 'click' );

	expect( wrapper.emitted( 'onModalClosed' ).length ).toStrictEqual( 1 );
};

const expectClickingUoFLinkOnMiniBannerTracksEvent = async ( wrapper: VueWrapper<any>, tracker: Tracker ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-uof-link' ).trigger( 'click' );

	expect( tracker.trackEvent ).toBeCalledWith( new UseOfFundsShownEvent( 'MiniBanner' ) );
};

export const useOfFundsFeatures: Record<string, ( wrapper: VueWrapper<any> ) => Promise<any>> = {
	expectShowsUseOfFunds,
	expectShowsUseOfFundsOnMiniBanner,
	expectHidesUseOfFunds,
	expectEmitsModalOpenedEvent,
	expectEmitsModalClosedEvent
};

export const useOfFundsScrollFeatures: Record<string, ( wrapper: VueWrapper<any>, pageScroller: PageScroller ) => Promise<any>> = {
	expectScrollsToFormWhenCallToActionIsClicked,
	expectScrollsToFormWhenCloseIsClicked
};

export const useOfFundsTrackingFeatures: Record<string, ( wrapper: VueWrapper<any>, tracker: Tracker ) => Promise<any>> = {
	expectClickingUoFLinkOnMiniBannerTracksEvent
};
