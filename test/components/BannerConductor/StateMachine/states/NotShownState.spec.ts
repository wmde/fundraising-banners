import { describe, expect, it, vitest } from 'vitest';
import { NotShownState } from '@src/components/BannerConductor/StateMachine/states/NotShownState';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';
import { NotShownEvent } from '@src/tracking/events/NotShownEvent';
import { PageStub } from '@test/fixtures/PageStub';
import { TrackerStub } from '@test/fixtures/TrackerStub';
import { ResizeHandlerStub } from '@test/fixtures/ResizeHandlerStub';

describe( 'NotShownState', function () {
	it( 'tracks not shown event on enter', function () {
		Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 100 } );
		Object.defineProperty( window, 'innerHeight', { writable: true, configurable: true, value: 200 } );

		const tracker = { trackEvent: vitest.fn() };
		const trackingEvent = new NotShownEvent( { bannerHeight: 0, viewportHeight: 200, viewportWidth: 100, reason: BannerNotShownReasons.DisallowedNamespace } );
		const state = new NotShownState( BannerNotShownReasons.DisallowedNamespace, new PageStub(), tracker, new ResizeHandlerStub(), 0 );

		state.enter();

		expect( tracker.trackEvent ).toHaveBeenCalledOnce();
		expect( tracker.trackEvent ).toHaveBeenCalledWith( trackingEvent );
	} );

	it( 'adds banner and screen size when tracking size issues', function () {
		const tracker = { trackEvent: vitest.fn() };
		const trackingEvent = new NotShownEvent( {
			reason: BannerNotShownReasons.SizeIssue,
			bannerHeight: 300,
			viewportWidth: window.innerWidth,
			viewportHeight: window.innerHeight
		} );
		const state = new NotShownState( BannerNotShownReasons.SizeIssue, new PageStub(), tracker, new ResizeHandlerStub(), 300 );

		state.enter();

		expect( tracker.trackEvent ).toHaveBeenCalledOnce();
		expect( tracker.trackEvent ).toHaveBeenCalledWith( trackingEvent );
	} );

	it( 'marks banner as not shown on enter', function () {
		const page = new PageStub();
		page.preventImpressionCountForHiddenBanner = vitest.fn( () => page );
		const state = new NotShownState( BannerNotShownReasons.SizeIssue, page, new TrackerStub(), new ResizeHandlerStub(), 0 );

		state.enter();

		expect( page.preventImpressionCountForHiddenBanner ).toHaveBeenCalledOnce();
	} );

	it( 'removes the event listeners', function () {
		const page = new PageStub();
		const resizeHandler = new ResizeHandlerStub();
		page.removePageEventListeners = vitest.fn( () => page );
		resizeHandler.onClose = vitest.fn();
		const state = new NotShownState( BannerNotShownReasons.UserInteraction, page, new TrackerStub(), resizeHandler, 0 );

		state.enter();

		expect( page.removePageEventListeners ).toHaveBeenCalledOnce();
		expect( resizeHandler.onClose ).toHaveBeenCalledOnce();
	} );

	it( 'throws error on exit', function () {
		const state = new NotShownState(
			BannerNotShownReasons.UserInteraction,
			new PageStub(),
			new TrackerStub(),
			new ResizeHandlerStub(),
			0
		);

		expect( () => state.exit() ).toThrowError( 'This state will never be exited' );
	} );
} );
