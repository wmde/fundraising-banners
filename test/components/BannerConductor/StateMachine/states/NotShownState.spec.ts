import { describe, expect, it, vitest } from 'vitest';
import { NotShownState } from '@src/components/BannerConductor/StateMachine/states/NotShownState';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';
import { NotShownEvent } from '@src/tracking/events/NotShownEvent';
import { PageStub } from '@test/fixtures/PageStub';
import { TrackerStub } from '@test/fixtures/TrackerStub';

describe( 'NotShownState', function () {
	it( 'tracks not shown event on enter', function () {
		const tracker = { trackEvent: vitest.fn() };
		const trackingEvent = new NotShownEvent( BannerNotShownReasons.SizeIssue );
		const state = new NotShownState( BannerNotShownReasons.SizeIssue, new PageStub(), tracker );

		state.enter();

		expect( tracker.trackEvent ).toHaveBeenCalledOnce();
		expect( tracker.trackEvent ).toHaveBeenCalledWith( trackingEvent );
	} );

	it( 'marks banner as not shown on enter', function () {
		const page = new PageStub();
		page.preventImpressionCountForHiddenBanner = vitest.fn( () => page );
		const state = new NotShownState( BannerNotShownReasons.SizeIssue, page, new TrackerStub() );

		state.enter();

		expect( page.preventImpressionCountForHiddenBanner ).toHaveBeenCalledOnce();
	} );

	it( 'removes the event listeners', function () {
		const page = new PageStub();
		page.removePageEventListeners = vitest.fn( () => page );
		const state = new NotShownState( BannerNotShownReasons.UserInteraction, page, new TrackerStub() );

		state.enter();

		expect( page.removePageEventListeners ).toHaveBeenCalledOnce();
	} );
} );
