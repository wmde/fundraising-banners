import { VueWrapper } from '@vue/test-utils';
import { expect } from 'vitest';

export const fullBannerDelay = 42;

const expectShowsSoftClose = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-early .wmde-banner-close' ).trigger( 'click' );

	expect( wrapper.find( '.wmde-banner-soft-close' ).exists() ).toBeTruthy();
};

const expectSetsMainBannerDelay = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	expect( wrapper.attributes( 'style' ) ).toContain( `--wmde-full-banner-delay: ${fullBannerDelay}ms` );
};

export const earlyBannerFeatures: Record<string, ( wrapper: VueWrapper<any> ) => Promise<any>> = {
	expectShowsSoftClose,
	expectSetsMainBannerDelay
};
