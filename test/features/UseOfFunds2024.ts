import { VueWrapper } from '@vue/test-utils';
import { expect } from 'vitest';
import { PageScroller } from '@src/utils/PageScroller/PageScroller';
import { UseOfFundsShownEvent } from '@src/tracking/events/UseOfFundsShownEvent';
import UseOfFundsModal from '@src/components/UseOfFunds2024/UseOfFundsModal.vue';
import { Tracker } from '@src/tracking/Tracker';

/*
The new 2024 use of funds component uses the html <dialog> element
which currently (2024) has no direct support from our testing library for visibility checking.
JSDOM also doesn't implement the methods used to open and close native dialogues so we need to manually mock them
 */
HTMLDialogElement.prototype.showModal = () => {};
HTMLDialogElement.prototype.close = () => {};

const expectShowsUseOfFunds = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );

	expect( wrapper.findComponent( UseOfFundsModal ).emitted( 'shown' ).length ).toBe( 1 );
};

const expectHidesUseOfFunds = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-funds-modal-close button' ).trigger( 'click' );

	expect( wrapper.findComponent( UseOfFundsModal ).emitted( 'hide' ).length ).toBe( 1 );
};

const expectEmitsModalOpenedEvent = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );

	expect( wrapper.emitted( 'modalOpened' ).length ).toStrictEqual( 1 );
};

const expectEmitsModalClosedEvent = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-funds-modal-close button' ).trigger( 'click' );

	expect( wrapper.emitted( 'modalClosed' ).length ).toStrictEqual( 1 );
};

const expectShowsUseOfFundsOnMiniBanner = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-uof-link' ).trigger( 'click' );

	expect( wrapper.findComponent( UseOfFundsModal ).emitted( 'shown' ).length ).toBe( 1 );
};

const expectShowsUseOfFundsOnFullPageBanner = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-button' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );

	expect( wrapper.findComponent( UseOfFundsModal ).emitted( 'shown' ).length ).toBe( 1 );
};

const expectHidesUseOfFundsOnMiniBanner = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-funds-modal-close button' ).trigger( 'click' );

	expect( wrapper.findComponent( UseOfFundsModal ).emitted( 'hide' ).length ).toBe( 1 );
};

const expectHidesUseOfFundsOnFullPageBanner = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-button' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-funds-modal-close button' ).trigger( 'click' );

	expect( wrapper.findComponent( UseOfFundsModal ).emitted( 'hide' ).length ).toBe( 1 );
};

const expectEmitsModalOpenedEventOnMiniBanner = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-uof-link' ).trigger( 'click' );

	expect( wrapper.emitted( 'modalOpened' ).length ).toStrictEqual( 1 );
};

const expectDoesNotEmitModalOpenedEventOnFullPageBanner = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-button' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );

	// modalOpened will be called by opening the full page, then won't be called again by the use of funds
	expect( wrapper.emitted( 'modalOpened' ).length ).toStrictEqual( 1 );
};

const expectEmitsModalClosedEventOnMiniBanner = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-uof-link' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-funds-modal-close button' ).trigger( 'click' );

	expect( wrapper.emitted( 'modalClosed' ).length ).toStrictEqual( 1 );
};

const expectDoesNotEmitModalClosedEventOnFullPageBanner = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-button' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-funds-modal-close button' ).trigger( 'click' );

	expect( wrapper.emitted( 'modalClosed' ) ).toBeUndefined();
};

const expectScrollsToFormWhenCallToActionIsClicked = async ( wrapper: VueWrapper<any>, pageScroller: PageScroller ): Promise<any> => {
	await wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );
	await wrapper.find( '.call-to-action button' ).trigger( 'click' );

	expect( pageScroller.scrollIntoView ).toHaveBeenCalledOnce();
	expect( pageScroller.scrollIntoView ).toHaveBeenCalledWith( '.wmde-banner-form' );
	expect( wrapper.findComponent( UseOfFundsModal ).emitted( 'callToAction' ).length ).toStrictEqual( 1 );
};

const expectScrollsToFormWhenClosesToFullPage = async ( wrapper: VueWrapper<any>, pageScroller: PageScroller ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-button' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-funds-modal-close button' ).trigger( 'click' );

	expect( pageScroller.scrollIntoView ).toHaveBeenCalledOnce();
	expect( pageScroller.scrollIntoView ).toHaveBeenCalledWith( '.wmde-banner-form' );
};

const expectDoesNotScrollToFormWhenClosesToMiniBanner = async ( wrapper: VueWrapper<any>, pageScroller: PageScroller ): Promise<any> => {
	await wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-funds-modal-close button' ).trigger( 'click' );

	expect( pageScroller.scrollIntoView ).not.toHaveBeenCalled();
};

const expectClickingUoFLinkOnMiniBannerTracksEvent = async ( wrapper: VueWrapper<any>, tracker: Tracker ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-uof-link' ).trigger( 'click' );

	expect( tracker.trackEvent ).toBeCalledWith( new UseOfFundsShownEvent( 'MiniBanner' ) );
};

export const desktopUseOfFundsFeatures: Record<string, ( wrapper: VueWrapper<any> ) => Promise<any>> = {
	expectShowsUseOfFunds,
	expectHidesUseOfFunds,
	expectEmitsModalOpenedEvent,
	expectEmitsModalClosedEvent
};

export const mobileUseOfFundsFeatures: Record<string, ( wrapper: VueWrapper<any> ) => Promise<any>> = {
	expectShowsUseOfFundsOnMiniBanner,
	expectShowsUseOfFundsOnFullPageBanner,
	expectHidesUseOfFundsOnMiniBanner,
	expectHidesUseOfFundsOnFullPageBanner,
	expectEmitsModalOpenedEventOnMiniBanner,
	expectDoesNotEmitModalOpenedEventOnFullPageBanner,
	expectEmitsModalClosedEventOnMiniBanner,
	expectDoesNotEmitModalClosedEventOnFullPageBanner
};

export const useOfFundsScrollFeatures: Record<string, ( wrapper: VueWrapper<any>, pageScroller: PageScroller ) => Promise<any>> = {
	expectScrollsToFormWhenCallToActionIsClicked,
	expectScrollsToFormWhenClosesToFullPage,
	expectDoesNotScrollToFormWhenClosesToMiniBanner
};

export const useOfFundsTrackingFeatures: Record<string, ( wrapper: VueWrapper<any>, tracker: Tracker ) => Promise<any>> = {
	expectClickingUoFLinkOnMiniBannerTracksEvent
};
