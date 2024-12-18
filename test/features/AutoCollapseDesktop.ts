import { VueWrapper } from '@vue/test-utils';
import { Tracker } from '@src/tracking/Tracker';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { nextTick } from 'vue';
import { expect, vi } from 'vitest';
import { BannerMaximisedEvent } from '@banners/desktop/C24_WMDE_Desktop_DE_00/events/BannerMaximisedEvent';
import { BannerMinimisedEvent } from '@banners/desktop/C24_WMDE_Desktop_DE_00/events/BannerMinimisedEvent';

const expectAutoCollapsesTheMainBanner = async ( getWrapper: () => VueWrapper<any> ): Promise<any> => {
	let scrollCallback: () => void;
	Object.defineProperty( window, 'scrollY', { writable: true, configurable: true, value: 400 } );
	Object.defineProperty( window, 'addEventListener',
		{
			writable: true,
			configurable: true,
			value: ( eventName: string, callback: () => void ) => {
				scrollCallback = callback;
			}
		} );

	const wrapper = getWrapper();
	await wrapper.setProps( { bannerState: BannerStates.Visible } );

	scrollCallback();
	await nextTick();

	expect( wrapper.classes() ).toContain( 'wmde-banner-wrapper--main' );

	Object.defineProperty( window, 'scrollY', { writable: true, configurable: true, value: 501 } );
	scrollCallback();
	await nextTick();

	expect( wrapper.classes() ).toContain( 'wmde-banner-wrapper--minimised' );
};

const expectTracksAutoCollapse = async ( getWrapper: () => VueWrapper<any>, tracker: Tracker ): Promise<any> => {
	let scrollCallback: () => void;
	Object.defineProperty( window, 'scrollY', { writable: true, configurable: true, value: 501 } );
	Object.defineProperty( window, 'addEventListener',
		{
			writable: true,
			configurable: true,
			value: ( eventName: string, callback: () => void ) => {
				scrollCallback = callback;
			}
		} );

	const wrapper = getWrapper();
	await wrapper.setProps( { bannerState: BannerStates.Visible } );
	scrollCallback();
	await nextTick();

	expect( tracker.trackEvent ).toHaveBeenCalledWith( new BannerMinimisedEvent() );
};

const expectRemovesEventListenerWhenCollapsed = async ( getWrapper: () => VueWrapper<any> ): Promise<any> => {
	let scrollCallback: () => void;
	const removeEventListener = vi.fn();
	Object.defineProperty( window, 'scrollY', { writable: true, configurable: true, value: 501 } );
	Object.defineProperty( window, 'addEventListener',
		{
			writable: true,
			configurable: true,
			value: ( eventName: string, callback: () => void ) => {
				scrollCallback = callback;
			}
		} );
	Object.defineProperty( window, 'removeEventListener', { writable: true, configurable: true, value: removeEventListener } );

	const wrapper = getWrapper();
	await wrapper.setProps( { bannerState: BannerStates.Visible } );

	scrollCallback();
	await nextTick();

	expect( removeEventListener ).toHaveBeenCalledWith( 'scroll', scrollCallback );
};

const expectGoesToSoftCloseFromMinimised = async ( getWrapper: () => VueWrapper<any> ): Promise<any> => {
	let scrollCallback: () => void;
	Object.defineProperty( window, 'scrollY', { writable: true, configurable: true, value: 501 } );
	Object.defineProperty( window, 'addEventListener',
		{
			writable: true,
			configurable: true,
			value: ( eventName: string, callback: () => void ) => {
				scrollCallback = callback;
			}
		} );

	const wrapper = getWrapper();
	await wrapper.setProps( { bannerState: BannerStates.Visible } );
	scrollCallback();
	await nextTick();

	await wrapper.find( '.wmde-banner-minimised .wmde-banner-close' ).trigger( 'click' );

	expect( wrapper.classes() ).toContain( 'wmde-banner-wrapper--soft-closing' );
};

const expectGoesBackToMainBannerFromMinimised = async ( getWrapper: () => VueWrapper<any>, tracker: Tracker ): Promise<any> => {
	let scrollCallback: () => void;
	Object.defineProperty( window, 'scrollY', { writable: true, configurable: true, value: 501 } );
	Object.defineProperty( window, 'addEventListener',
		{
			writable: true,
			configurable: true,
			value: ( eventName: string, callback: () => void ) => {
				scrollCallback = callback;
			}
		}
	);

	const wrapper = getWrapper();
	await wrapper.setProps( { bannerState: BannerStates.Visible } );
	scrollCallback();
	await nextTick();

	await wrapper.find( '.wmde-banner-minimised-maximise' ).trigger( 'click' );

	expect( wrapper.classes() ).toContain( 'wmde-banner-wrapper--main' );
	expect( tracker.trackEvent ).toHaveBeenCalledWith( new BannerMaximisedEvent( 'maximise' ) );
};

export const autoCollapseFeatures: Record<string, ( getWrapper: () => VueWrapper<any>, tracker: Tracker ) => Promise<any>> = {
	expectAutoCollapsesTheMainBanner,
	expectTracksAutoCollapse,
	expectRemovesEventListenerWhenCollapsed,
	expectGoesToSoftCloseFromMinimised,
	expectGoesBackToMainBannerFromMinimised
};
