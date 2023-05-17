import { describe, beforeEach, it, expect, vi, test } from 'vitest';
import { TrackerWPDE } from '@src/tracking/TrackerWPDE';
import { CustomAmountChangedEvent } from '@src/tracking/events/CustomAmountChangedEvent';
import { TrackingEvent } from '@src/tracking/TrackingEvent';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { ClickAlreadyDonatedEvent } from '@src/tracking/events/ClickAlreadyDonatedEvent';

interface Window {
	[ key: string ]: any;
}
declare let window: Window;

describe( 'TrackerWPDE', function () {

	beforeEach( () => {
		window.TestTracker = undefined;
	} );

	it( 'tracks events', () => {
		window.TestTracker = { trackEvent: vi.fn() };
		const tracker = new TrackerWPDE( 'TestTracker', 'TestBanner05', new Set<string>( [ 'some-action' ] ) );

		tracker.trackEvent( { eventName: 'some-action', feature: '', customData: {} } );

		expect( window.TestTracker.trackEvent ).toBeCalledWith( 'Banners', 'some-action', 'TestBanner05' );
	} );

	it( 'collects tracking events until the tracker becomes available', async () => {
		vi.useFakeTimers();

		const tracker = new TrackerWPDE( 'TestTracker', 'TestBanner05', new Set<string>( [ 'action-1', 'action-2' ] ) );

		tracker.trackEvent( { eventName: 'action-1', feature: '', customData: {} } );
		tracker.trackEvent( { eventName: 'action-2', feature: '', customData: {} } );

		window.TestTracker = { trackEvent: vi.fn() };

		await vi.runAllTimers();

		expect( window.TestTracker.trackEvent ).toHaveBeenCalledTimes( 2 );
		expect( window.TestTracker.trackEvent ).toBeCalledWith( 'Banners', 'action-1', 'TestBanner05' );
		expect( window.TestTracker.trackEvent ).toBeCalledWith( 'Banners', 'action-2', 'TestBanner05' );

		vi.restoreAllMocks();
	} );

	it( 'aborts trying to find the tracker when the retry times out', async () => {
		vi.useFakeTimers();

		const tracker = new TrackerWPDE( 'TestTracker', 'TestBanner05', new Set<string>( [ 'action-1', 'action-2' ] ) );

		tracker.trackEvent( { eventName: 'action-1', feature: '', customData: {} } );
		tracker.trackEvent( { eventName: 'action-2', feature: '', customData: {} } );

		await vi.runAllTimers();

		window.TestTracker = { trackEvent: vi.fn() };

		expect( window.TestTracker.trackEvent ).not.toHaveBeenCalled();

		vi.restoreAllMocks();
	} );

	test.each( [
		[ new CustomAmountChangedEvent( 'increased' ), CustomAmountChangedEvent.EVENT_NAME, 'increased-amount' ],
		[ new CustomAmountChangedEvent( 'decreased' ), CustomAmountChangedEvent.EVENT_NAME, 'decreased-amount' ],
		[ new ClickAlreadyDonatedEvent(), ClickAlreadyDonatedEvent.EVENT_NAME, ClickAlreadyDonatedEvent.EVENT_NAME ]
	] )( 'should generate event identifiers from tracking data', ( trackingEvent: TrackingEvent, allowedAction: string, expectedId: string ) => {
		window.TestTracker = { trackEvent: vi.fn() };
		const tracker = new TrackerWPDE( 'TestTracker', 'TestBanner05', new Set<string>( [ allowedAction ] ) );

		tracker.trackEvent( trackingEvent );

		expect( window.TestTracker.trackEvent ).toBeCalledWith( 'Banners', expectedId, 'TestBanner05' );
	} );
} );
