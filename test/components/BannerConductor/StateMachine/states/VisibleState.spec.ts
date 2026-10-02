import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { VisibleState } from '@src/components/BannerConductor/StateMachine/states/VisibleState';
import { PageStub } from '@test/fixtures/PageStub';
import { ImpressionCountStub } from '@test/fixtures/ImpressionCountStub';
import type { Tracker } from '@src/tracking/Tracker';
import { ShownEvent } from '@src/tracking/events/ShownEvent';
import FallbackBannerShownEvent from '@src/tracking/events/FallbackBannerShownEvent';

describe( 'VisibleState', function () {
	let tracker: Tracker;

	beforeEach( () => {
		tracker = { trackEvent: vitest.fn() };
	} );

	it( 'sets banner size on resize', () => {
		const page = new PageStub();
		page.setSpace = vitest.fn( () => page );
		const visibleState = new VisibleState( 'Page', page, new ImpressionCountStub(), tracker, 42 );

		visibleState.onResize( 42 );

		expect( page.setSpace ).toHaveBeenCalledOnce();
		expect( page.setSpace ).toHaveBeenCalledWith( 42 );
	} );

	it( 'sets banner size on content change', () => {
		const page = new PageStub();
		page.setSpace = vitest.fn( () => page );
		const visibleState = new VisibleState( 'Page', page, new ImpressionCountStub(), tracker, 42 );

		visibleState.onContentChanged( 42 );

		expect( page.setSpace ).toHaveBeenCalledOnce();
		expect( page.setSpace ).toHaveBeenCalledWith( 42 );
	} );

	it( 'fires shown event on enter', async () => {
		const visibleState = new VisibleState( 'Page', new PageStub(), new ImpressionCountStub(), tracker, 42 );
		const shownEvent = new ShownEvent( 'Page' );

		await visibleState.enter();

		expect( tracker.trackEvent ).toHaveBeenCalledOnce();
		expect( tracker.trackEvent ).toHaveBeenCalledWith( shownEvent );
	} );

	it( 'fires fallback banner shown event on enter when fallback feature', async () => {
		const visibleState = new VisibleState( 'FallbackBanner', new PageStub(), new ImpressionCountStub(), tracker, 42 );
		const fallbackShownEvent = new FallbackBannerShownEvent( { bannerHeight: 42, viewportHeight: 768, viewportWidth: 1024 } );

		await visibleState.enter();

		expect( tracker.trackEvent ).toHaveBeenCalledOnce();
		expect( tracker.trackEvent ).toHaveBeenCalledWith( fallbackShownEvent );
	} );

	it( 'increases banner impression count on enter', async () => {
		const impressionCountStub = new ImpressionCountStub();
		impressionCountStub.incrementImpressionCounts = vitest.fn();
		const visibleState = new VisibleState( 'Page', new PageStub(), impressionCountStub, tracker, 42 );

		await visibleState.enter();

		expect( impressionCountStub.incrementImpressionCounts ).toHaveBeenCalledOnce();
	} );
} );
