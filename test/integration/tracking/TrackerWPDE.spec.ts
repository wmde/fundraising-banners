import { describe, beforeEach, it, expect, vi } from 'vitest';
import { TrackerWPDE } from '@src/tracking/TrackerWPDE';

interface Window {
	[ key: string ]: any;
}
declare let window: Window;

describe( 'TrackerWPDE', function () {

	beforeEach( () => {
		window = { TestTracker: undefined };
	} );

	it( 'tracks events', () => {
		window.TestTracker = {
			trackContentImpression: vi.fn()
		};
		const tracker = new TrackerWPDE( 'TestTracker', 'TestBanner05', new Set<string>( ['some-action'] ) );

		tracker.trackEvent( { eventName: 'some-action', feature: '', customData: {} } );

		expect( window.TestTracker.trackEvent.calledWith( 'Banners', 'some-action', 'TestBanner05' ) ).toBe( true );
	} );

	it.todo( 'collects tracking events until the tracker becomes available', ( done ) => {
		const retryInterval = 5;
		const simulatedLoadTime = 10;
		const scheduleRetry = tracker => {
			setTimeout( tracker.waitForTrackerToInit.bind( tracker ), retryInterval );
		};
		const tracker = new TrackerWPDE( 'TestTracker', 'TestBanner05', scheduleRetry );
		tracker.recordBannerImpression();
		tracker.trackEvent(  );

		setTimeout( () => {
			window.TestTracker = {
				trackContentImpression: sinon.spy(),
				trackEvent: sinon.spy()
			};
		}, simulatedLoadTime );

		setTimeout( () => {
			expect.ok( window.TestTracker.trackContentImpression.calledWith( 'Banners', 'TestBanner05' ) );
			expect.ok( window.TestTracker.trackEvent.calledWith( 'Banners', 'some-action', 'TestBanner05' ) );
			done();
		}, retryInterval + simulatedLoadTime + 1 );
	} );

	it.todo( 'aborts trying to find the tracker after 10 tries', () => {
		// An immediate scheduler
		const scheduleRetry = tracker => {
			tracker.waitForTrackerToInit();
		};
		const tracker = new TrackerWPDE( 'TestTracker', 'TestBanner05', scheduleRetry );

		expect.strictEqual( tracker.trackerFindCounter, 10 );
	} );

} );
