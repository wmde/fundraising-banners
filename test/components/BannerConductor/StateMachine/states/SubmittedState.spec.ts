import { describe, expect, it, vitest } from 'vitest';
import { PageStub } from '@test/fixtures/PageStub';
import { ResizeHandlerStub } from '@test/fixtures/ResizeHandlerStub';
import { TimerStub } from '@test/fixtures/TimerStub';
import { TimerSpy } from '@test/fixtures/TimerSpy';
import { SubmittedState } from '@src/components/BannerConductor/StateMachine/states/SubmittedState';

describe( 'SubmittedState', function () {
	it( 'frees the space on the page without animation', function () {
		const page = new PageStub();
		page.setSpace = vitest.fn( () => page );
		page.unsetAnimated = vitest.fn( () => page );
		const state = new SubmittedState(
			page,
			new ResizeHandlerStub(),
			new TimerStub()
		);

		state.enter();

		expect( page.setSpace ).toHaveBeenCalledWith( 0 );
		expect( page.unsetAnimated ).toHaveBeenCalledOnce();
	} );

	it( 'removes the event listeners', function () {
		const page = new PageStub();
		const resizeHandler = new ResizeHandlerStub();
		page.removePageEventListeners = vitest.fn( () => page );
		resizeHandler.onClose = vitest.fn();
		const state = new SubmittedState(
			page,
			resizeHandler,
			new TimerStub()
		);

		state.enter();

		expect( page.removePageEventListeners ).toHaveBeenCalledOnce();
		expect( resizeHandler.onClose ).toHaveBeenCalledOnce();
	} );

	it( 'stops the timers', function () {
		const timer = new TimerSpy();
		const state = new SubmittedState(
			new PageStub(),
			new ResizeHandlerStub(),
			timer
		);

		state.enter();

		expect( timer.clearAllCalls ).toStrictEqual( 1 );
	} );

	it( 'throws error on exit', function () {
		const state = new SubmittedState(
			new PageStub(),
			new ResizeHandlerStub(),
			new TimerStub()
		);

		expect( () => state.exit() ).toThrowError( 'This state will never be exited' );
	} );
} );
