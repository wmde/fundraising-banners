import { VueWrapper } from '@vue/test-utils';
import { expect } from 'vitest';
import { Tracker } from '@src/tracking/Tracker';
import { MinimisedEvent } from '@src/tracking/events/MinimisedEvent';
import { BannerMinimisedEvent } from '@src/tracking/events/BannerMinimisedEvent';
import { BannerMaximisedEvent } from '@src/tracking/events/BannerMaximisedEvent';

const expectMinimisesAndMaximises = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-minimised-minimise' ).trigger( 'click' );

	expect( wrapper.classes() ).toContain( 'wmde-banner-wrapper--minimised' );

	await wrapper.find( '.wmde-banner-minimised-maximise' ).trigger( 'click' );

	expect( wrapper.classes() ).toContain( 'wmde-banner-wrapper--main' );
};

const expectTracksMinimiseAndMaximise = async ( wrapper: VueWrapper<any>, tracker: Tracker ): Promise<any> => {
	await wrapper.find( '.wmde-banner-minimised-minimise' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-minimised-maximise' ).trigger( 'click' );

	expect( tracker.trackEvent ).toHaveBeenCalledTimes( 2 );
	expect( tracker.trackEvent ).toHaveBeenCalledWith( new MinimisedEvent( 'MinimisedBanner', 'minimised' ) );
	expect( tracker.trackEvent ).toHaveBeenCalledWith( new MinimisedEvent( 'MinimisedBanner', 'maximised' ) );
};

/**
 * Desktop Banner 17 accidentally used events from the Desktop_00 prototype, but went live before we tested.
 * This means we cannot retroactively change the used event classes because the event tracking in production would have 2 different event names.
 *
 * If we keep the minimise function, the next banner should use `expectTracksMinimiseAndMaximise`
 * This test should be removed on cleanup.
 *
 * @deprecated
 */
const expectTracksLegacyMinimiseAndMaximise = async ( wrapper: VueWrapper<any>, tracker: Tracker ): Promise<any> => {
	await wrapper.find( '.wmde-banner-minimised-minimise' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-minimised-maximise' ).trigger( 'click' );

	expect( tracker.trackEvent ).toHaveBeenCalledTimes( 2 );
	expect( tracker.trackEvent ).toHaveBeenCalledWith( new BannerMinimisedEvent() );
	expect( tracker.trackEvent ).toHaveBeenCalledWith( new BannerMaximisedEvent( 'maximise' ) );
};

export const minimisedBannerFeatures: Record<string, ( wrapper: VueWrapper<any>, tracker: Tracker ) => Promise<any>> = {
	expectMinimisesAndMaximises,
	expectTracksMinimiseAndMaximise,
	expectTracksLegacyMinimiseAndMaximise
};
