import { VueWrapper } from '@vue/test-utils';
import { expect } from 'vitest';
import { Tracker } from '@src/tracking/Tracker';
import { MinimisedEvent } from '@src/tracking/events/MinimisedEvent';

const expectMinimisesAndMaximises = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-minimise-button' ).trigger( 'click' );

	expect( wrapper.classes() ).toContain( 'wmde-banner-wrapper--minimised' );

	await wrapper.find( '.wmde-banner-minimised-maximise-button' ).trigger( 'click' );

	expect( wrapper.classes() ).toContain( 'wmde-banner-wrapper--mini' );
};

const expectOpensFullPageFromMiniBanner = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-button' ).trigger( 'click' );

	expect( wrapper.classes() ).toContain( 'wmde-banner-wrapper--full-page' );
	expect( wrapper.classes() ).toContain( 'wmde-banner-opened-from-mini' );
};

const expectTracksMinimiseAndMaximise = async ( wrapper: VueWrapper<any>, tracker: Tracker ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-minimise-button' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-minimised-maximise-button' ).trigger( 'click' );

	expect( tracker.trackEvent ).toHaveBeenCalledTimes( 2 );
	expect( tracker.trackEvent ).toHaveBeenCalledWith( new MinimisedEvent( 'MiniBanner', 'minimised' ) );
	expect( tracker.trackEvent ).toHaveBeenCalledWith( new MinimisedEvent( 'MinimisedBanner', 'maximised' ) );
};

export const minimisedBannerFeatures: Record<string, ( wrapper: VueWrapper<any>, tracker: Tracker ) => Promise<any>> = {
	expectMinimisesAndMaximises,
	expectOpensFullPageFromMiniBanner,
	expectTracksMinimiseAndMaximise
};
