import { describe, it, vitest, expect } from 'vitest';
import { ClosedState } from '@src/components/BannerConductor/StateMachine/states/ClosedState';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { PageStub } from '@test/fixtures/PageStub';
import { TrackerStub } from '@test/fixtures/TrackerStub';
import { ResizeHandlerStub } from '@test/fixtures/ResizeHandlerStub';
import { CloseChoices } from '@src/domain/CloseChoices';
import { TimerStub } from '@test/fixtures/TimerStub';
import { TimerSpy } from '@test/fixtures/TimerSpy';

describe( 'ClosedState', function () {
	it( 'tracks close event on enter', function () {
		const tracker = { trackEvent: vitest.fn() };
		const closeEvent = new CloseEvent( 'MainBanner', CloseChoices.Close );
		const state = new ClosedState(
			closeEvent,
			'fundraising',
			new PageStub(),
			tracker,
			new ResizeHandlerStub(),
			new TimerStub()
		);

		state.enter();

		expect( tracker.trackEvent ).toHaveBeenCalledWith( closeEvent );
	} );

	it( 'frees the space on the page without animation', function () {
		const page = new PageStub();
		page.setSpace = vitest.fn( () => page );
		page.unsetAnimated = vitest.fn( () => page );
		const state = new ClosedState(
			new CloseEvent( 'MainBanner', CloseChoices.Close ),
			'fundraising',
			page,
			new TrackerStub(),
			new ResizeHandlerStub(),
			new TimerStub()
		);

		state.enter();

		expect( page.setSpace ).toHaveBeenCalledWith( 0 );
		expect( page.unsetAnimated ).toHaveBeenCalledOnce();
	} );

	it( 'sets closed cookie', function () {
		const page = new PageStub();
		page.setCloseCookieIfNecessary = vitest.fn( () => page );
		const closeEvent = new CloseEvent( 'MainBanner', CloseChoices.Close );
		const state = new ClosedState(
			closeEvent,
			'fundraising',
			page,
			new TrackerStub(),
			new ResizeHandlerStub(),
			new TimerStub()
		);

		state.enter();

		expect( page.setCloseCookieIfNecessary ).toHaveBeenCalledOnce();
		expect( page.setCloseCookieIfNecessary ).toHaveBeenCalledWith( closeEvent, 'fundraising' );
	} );

	it( 'removes the event listeners', function () {
		const page = new PageStub();
		const resizeHandler = new ResizeHandlerStub();
		page.removePageEventListeners = vitest.fn( () => page );
		resizeHandler.onClose = vitest.fn();
		const state = new ClosedState(
			new CloseEvent( 'MainBanner', CloseChoices.Close ),
			'fundraising',
			page,
			new TrackerStub(),
			resizeHandler,
			new TimerStub()
		);

		state.enter();

		expect( page.removePageEventListeners ).toHaveBeenCalledOnce();
		expect( resizeHandler.onClose ).toHaveBeenCalledOnce();
	} );

	it( 'stops the timers', function () {
		const timer = new TimerSpy();
		const state = new ClosedState(
			new CloseEvent( 'MainBanner', CloseChoices.Close ),
			'fundraising',
			new PageStub(),
			new TrackerStub(),
			new ResizeHandlerStub(),
			timer
		);

		state.enter();

		expect( timer.clearAllCalls ).toStrictEqual( 1 );
	} );

	it( 'throws error on exit', function () {
		const state = new ClosedState(
			new CloseEvent( 'MainBanner', CloseChoices.Close ),
			'fundraising',
			new PageStub(),
			new TrackerStub(),
			new ResizeHandlerStub(),
			new TimerStub()
		);

		expect( () => state.exit() ).toThrowError( 'This state will never be exited' );
	} );
} );
