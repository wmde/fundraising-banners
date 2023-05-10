import { VueWrapper } from '@vue/test-utils';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { expect, vi } from 'vitest';

const expectSlideShowPlaysWhenBecomesVisible = async ( getWrapper: () => VueWrapper<any> ): Promise<any> => {
	const wrapper = getWrapper();
	await wrapper.setProps( { bannerState: BannerStates.Visible } );

	expect( wrapper.find( '.wmde-banner-slider--playing' ).exists() ).toBeTruthy();
};

const expectSlideShowStopsOnFormInteraction = async ( getWrapper: () => VueWrapper<any> ): Promise<any> => {
	vi.useFakeTimers();

	const wrapper = getWrapper();
	await wrapper.setProps( { bannerState: BannerStates.Visible } );
	await wrapper.find( '.wmde-banner-form' ).trigger( 'click' );
	await vi.runOnlyPendingTimers();

	expect( wrapper.find( '.wmde-banner-slider--stopped' ).exists() ).toBeTruthy();

	vi.restoreAllMocks();
};

const expectShowsSlideShowOnSmallSizes = async ( getWrapper: () => VueWrapper<any> ): Promise<any> => {
	Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 1300 } );

	const wrapper = getWrapper();

	expect( wrapper.find( '.wmde-banner-slider' ).exists() ).toBeTruthy();
};

const expectShowsMessageOnSmallSizes = async ( getWrapper: () => VueWrapper<any> ): Promise<any> => {
	Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 1301 } );

	const wrapper = getWrapper();

	expect( wrapper.find( '.wmde-banner-message' ).exists() ).toBeTruthy();
};

export const desktopContentFeatures: Record<string, ( getWrapper: () => VueWrapper<any> ) => Promise<any>> = {
	expectSlideShowPlaysWhenBecomesVisible,
	expectSlideShowStopsOnFormInteraction,
	expectShowsSlideShowOnSmallSizes,
	expectShowsMessageOnSmallSizes
};
