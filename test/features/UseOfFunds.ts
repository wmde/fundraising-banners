import { VueWrapper } from '@vue/test-utils';
import { expect } from 'vitest';
import { PageScroller } from '@src/utils/PageScroller/PageScroller';

const expectShowsUseOfFunds = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );

	expect( wrapper.find( '.banner-modal' ).classes() ).toContain( 'is-visible' );
};

const expectHidesUseOfFunds = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );
	await wrapper.find( '.banner-modal-close-link' ).trigger( 'click' );

	expect( wrapper.find( '.banner-modal' ).classes() ).not.toContain( 'is-visible' );
};

const expectScrollsToFormWhenCallToActionIsClicked = async ( wrapper: VueWrapper<any>, pageScroller: PageScroller ): Promise<any> => {
	await wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );
	await wrapper.find( '.use-of-funds-button' ).trigger( 'click' );

	expect( pageScroller.scrollIntoView ).toHaveBeenCalledOnce();
	expect( pageScroller.scrollIntoView ).toHaveBeenCalledWith( '.wmde-banner-form' );
};

const expectScrollsToLinkWhenCloseIsClicked = async ( wrapper: VueWrapper<any>, pageScroller: PageScroller ): Promise<any> => {
	await wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );
	await wrapper.find( '.banner-modal-close-link' ).trigger( 'click' );

	expect( pageScroller.scrollIntoView ).toHaveBeenCalledOnce();
	expect( pageScroller.scrollIntoView ).toHaveBeenCalledWith( '.wmde-banner-full-small-print .wmde-banner-footer-usage-link' );
};

export const useOfFundsFeatures: Record<string, ( wrapper: VueWrapper<any> ) => Promise<any>> = {
	expectShowsUseOfFunds,
	expectHidesUseOfFunds
};

export const useOfFundsScrollFeatures: Record<string, ( wrapper: VueWrapper<any>, pageScroller: PageScroller ) => Promise<any>> = {
	expectScrollsToFormWhenCallToActionIsClicked,
	expectScrollsToLinkWhenCloseIsClicked
};
