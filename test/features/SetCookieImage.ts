import { VueWrapper } from '@vue/test-utils';
import { expect, vi } from 'vitest';

const expectSetsCookieImageOnSoftCloseClose = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-soft-close-button-close' ).trigger( 'click' );

	expect( wrapper.find( '.wmde-banner-set-cookie-image' ).exists() ).toBeTruthy();
};

const expectSetsCookieImageOnSoftCloseTimeOut = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );

	await vi.runAllTimersAsync();

	expect( wrapper.find( '.wmde-banner-set-cookie-image' ).exists() ).toBeTruthy();
};

const expectDoesNotSetCookieImageOnSoftCloseMaybeLater = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-soft-close-button-maybe-later' ).trigger( 'click' );

	expect( wrapper.find( '.wmde-banner-set-cookie-image' ).exists() ).toBeFalsy();
};

const expectSetCookieImageOnAlreadyDonatedMaybeLater = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-already-donated-button-maybe-later' ).trigger( 'click' );

	expect( wrapper.find( '.wmde-banner-set-cookie-image' ).exists() ).toBeTruthy();
};

const expectSetAlreadyDonatedCookieImageOnAlreadyDonatedNoMoreBanners = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-already-donated-button-go-away' ).trigger( 'click' );

	expect( wrapper.find( '.wmde-banner-set-cookie-image-already-donated' ).exists() ).toBeTruthy();
};

const expectSetCookieImageOnAlreadyDonatedLink = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-footer-already-donated' ).trigger( 'click' );

	expect( wrapper.find( '.wmde-banner-set-cookie-image-already-donated' ).exists() ).toBeTruthy();
};

const expectSetsMaybeLaterCookieOnSoftCloseMaybeLater = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-soft-close-button-maybe-later' ).trigger( 'click' );

	expect( wrapper.find( '.wmde-banner-set-cookie-image' ).exists() ).toBeFalsy();
};

export const setCookieImageFeatures: Record<string, ( wrapper: VueWrapper<any> ) => Promise<any>> = {
	expectSetsCookieImageOnSoftCloseClose,
	expectSetsCookieImageOnSoftCloseTimeOut,
	expectDoesNotSetCookieImageOnSoftCloseMaybeLater,
	expectSetCookieImageOnAlreadyDonatedMaybeLater,
	expectSetAlreadyDonatedCookieImageOnAlreadyDonatedNoMoreBanners,
	expectSetCookieImageOnAlreadyDonatedLink,
	expectSetsMaybeLaterCookieOnSoftCloseMaybeLater
};
