import { describe, beforeEach, it, expect, vi, test } from 'vitest';
import { TrackerWPDE } from '@src/tracking/TrackerWPDE';
import { CustomAmountChangedEvent } from '@src/tracking/events/CustomAmountChangedEvent';
import { TrackingEvent } from '@src/tracking/TrackingEvent';
import { ClickAlreadyDonatedEvent } from '@src/tracking/events/ClickAlreadyDonatedEvent';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { ShownEvent } from '@src/tracking/events/ShownEvent';
import { FormStepShownEvent } from '@src/tracking/events/FormStepShownEvent';

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
		const tracker = new TrackerWPDE(
			'TestTracker',
			'TestBanner05',
			new Map<string, number>( [ [ 'some-action', 1 ] ] ) );

		tracker.trackEvent( { eventName: 'some-action', feature: '', userChoice: '', customData: {} } );

		expect( window.TestTracker.trackEvent ).toBeCalledWith( 'Banners', 'some-action', 'TestBanner05' );
	} );

	test.each( [
		[ new CloseEvent( 'SoftClose', 'close' ), 'banner-closed-close' ],
		[ new ShownEvent(), 'banner-shown' ],
		[ new CustomAmountChangedEvent( 'increased' ), 'increased-amount' ],
		[ new CustomAmountChangedEvent( 'decreased' ), 'decreased-amount' ],
		[ new FormStepShownEvent( 'UpgradeToYearlyForm' ), 'form-step-shown-UpgradeToYearlyForm' ],
		[ { eventName: 'some-action', feature: '', userChoice: '', customData: {} }, 'some-action' ],
		[ { eventName: 'some-action', feature: '', userChoice: 'with-choice', customData: {} }, 'some-action-with-choice' ]
	] )( 'converts events', ( event: TrackingEvent, expectedName: string ) => {
		window.TestTracker = { trackEvent: vi.fn() };
		const tracker = new TrackerWPDE(
			'TestTracker',
			'TestBanner05',
			new Map<string, number>( [ [ event.eventName, 1 ] ] ) );

		tracker.trackEvent( event );

		expect( window.TestTracker.trackEvent ).toBeCalledWith( 'Banners', expectedName, 'TestBanner05' );
	} );

	it( 'collects tracking events until the tracker becomes available', async () => {
		vi.useFakeTimers();

		const tracker = new TrackerWPDE(
			'TestTracker',
			'TestBanner05',
			new Map<string, number>( [ [ 'action-1', 1 ], [ 'action-2', 1 ] ] )
		);

		tracker.trackEvent( { eventName: 'action-1', feature: '', userChoice: '', customData: {} } );
		tracker.trackEvent( { eventName: 'action-2', feature: '', userChoice: '', customData: {} } );

		window.TestTracker = { trackEvent: vi.fn() };

		await vi.runAllTimers();

		expect( window.TestTracker.trackEvent ).toHaveBeenCalledTimes( 2 );
		expect( window.TestTracker.trackEvent ).toBeCalledWith( 'Banners', 'action-1', 'TestBanner05' );
		expect( window.TestTracker.trackEvent ).toBeCalledWith( 'Banners', 'action-2', 'TestBanner05' );

		vi.restoreAllMocks();
	} );

	it( 'aborts trying to find the tracker when the retry times out', async () => {
		vi.useFakeTimers();

		const tracker = new TrackerWPDE(
			'TestTracker',
			'TestBanner05',
			new Map<string, number>( [ [ 'action-1', 1 ], [ 'action-2', 1 ] ] )
		);

		tracker.trackEvent( { eventName: 'action-1', feature: '', userChoice: '', customData: {} } );
		tracker.trackEvent( { eventName: 'action-2', feature: '', userChoice: '', customData: {} } );

		await vi.runAllTimers();

		window.TestTracker = { trackEvent: vi.fn() };

		expect( window.TestTracker.trackEvent ).not.toHaveBeenCalled();

		vi.restoreAllMocks();
	} );

	test.each( [
		[ new CustomAmountChangedEvent( 'increased' ), CustomAmountChangedEvent.EVENT_NAME, 'increased-amount' ],
		[ new CustomAmountChangedEvent( 'decreased' ), CustomAmountChangedEvent.EVENT_NAME, 'decreased-amount' ],
		[ new ClickAlreadyDonatedEvent(), ClickAlreadyDonatedEvent.EVENT_NAME, ClickAlreadyDonatedEvent.EVENT_NAME ]
	] )( 'should generate event identifiers from tracking data, data set %#',
		( trackingEvent: TrackingEvent, allowedAction: string, expectedId: string ) => {
			window.TestTracker = { trackEvent: vi.fn() };
			const tracker = new TrackerWPDE(
				'TestTracker',
				'TestBanner05',
				new Map<string, number>( [ [ allowedAction, 1 ] ] )
			);

			tracker.trackEvent( trackingEvent );

			expect( window.TestTracker.trackEvent ).toBeCalledWith( 'Banners', expectedId, 'TestBanner05' );
		} );

	test.each( [
		[ 0.5, 1, true ],
		[ 0.7777, 0, false ],
		[ 0.7777, 0.01, false ],
		[ 0.009, 0.01, true ],
		[ 0.1, 0.1, true ]
	] )( 'should only do tracking when the random threshold (%f) is smaller the tracking rate (%f)',
		( randomValue: number, trackingRate: number, wasTracked: boolean ) => {
			const oldRandom = Math.random;
			Math.random = vi.fn( () => randomValue );
			window.TestTracker = { trackEvent: vi.fn() };
			const tracker = new TrackerWPDE(
				'TestTracker',
				'TestBanner05',
				new Map<string, number>( [ [ 'some-action', trackingRate ] ] ) );

			tracker.trackEvent( { eventName: 'some-action', feature: '', userChoice: '', customData: {} } );

			expect( window.TestTracker.trackEvent ).toHaveBeenCalledTimes( wasTracked ? 1 : 0 );

			Math.random = oldRandom;
		} );

	it( 'should always track in "devMode" and ignore tracking rate', () => {
		window.TestTracker = { trackEvent: vi.fn() };
		const windowLocationBackup = window.location;
		window.location = { search: '....devMode...' };
		const tracker = new TrackerWPDE(
			'TestTracker',
			'TestBanner05',
			new Map<string, number>( [ [ 'some-action', 0 ] ] ) );

		tracker.trackEvent( { eventName: 'some-action', feature: '', userChoice: '', customData: {} } );

		expect( window.TestTracker.trackEvent ).toHaveBeenCalled();

		window.location = windowLocationBackup;
	} );

	it( 'only tracks known events', () => {
		window.TestTracker = { trackEvent: vi.fn() };
		const windowLocationBackup = window.location;
		window.location = { search: '....devMode...' };
		const tracker = new TrackerWPDE(
			'TestTracker',
			'TestBanner05',
			new Map<string, number>( [ [ 'some-action', 0 ] ] ) );

		tracker.trackEvent( { eventName: 'unknown-event', feature: '', userChoice: '', customData: {} } );

		expect( window.TestTracker.trackEvent ).not.toHaveBeenCalled();

		window.location = windowLocationBackup;
	} );
} );
