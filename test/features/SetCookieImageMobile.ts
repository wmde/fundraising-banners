import { VueWrapper } from '@vue/test-utils';
import { expect, vi } from 'vitest';

// This test does not make sense
const expectSetsCookieImageOnSoftCloseClose = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-button' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-full-close' ).trigger( 'click' );

	expect( wrapper.find( '.wmde-banner-set-cookie-image' ).exists() ).toBeTruthy();
};

const expectSetsCookieImageOnSoftCloseTimeOut = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	vi.useFakeTimers();

	await wrapper.find( '.wmde-banner-mini-close-button' ).trigger( 'click' );
	await vi.runAllTimers();

	expect( wrapper.find( '.wmde-banner-set-cookie-image' ).exists() ).toBeTruthy();

	vi.restoreAllMocks();
};

const expectDoesNotSetCookieImageOnSoftCloseMaybeLater = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-close-button' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-soft-close-button-maybe-later' ).trigger( 'click' );

	expect( wrapper.find( '.wmde-banner-set-cookie-image' ).exists() ).toBeFalsy();
};

export const setCookieImageFeatures: Record<string, ( wrapper: VueWrapper<any> ) => Promise<any>> = {
	expectSetsCookieImageOnSoftCloseClose,
	expectSetsCookieImageOnSoftCloseTimeOut,
	expectDoesNotSetCookieImageOnSoftCloseMaybeLater
};
