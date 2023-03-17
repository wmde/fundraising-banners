import { describe, it, vitest, expect } from 'vitest';
import { ClosedState } from '@src/components/BannerConductor/StateMachine/states/ClosedState';
import { CloseSources } from '@src/tracking/CloseSources';
import { PageStub } from '../../../../fixtures/PageStub';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { TrackerStub } from '../../../../fixtures/TrackerStub';

describe( 'ClosedState', function () {
	it( 'tracks close event on enter', function () {
		const tracker = { trackEvent: vitest.fn() };
		const state = new ClosedState( CloseSources.MainBanner, new PageStub(), tracker );

		state.enter();

		expect( tracker.trackEvent ).toHaveBeenCalledWith( new CloseEvent( CloseSources.MainBanner ) );
	} );

	it( 'frees the space on the page without animation', function () {
		const page = new PageStub();
		page.setSpace = vitest.fn( () => page );
		page.unsetAnimated = vitest.fn( () => page );
		const state = new ClosedState( CloseSources.MainBanner, page, new TrackerStub() );

		state.enter();

		expect( page.setSpace ).toHaveBeenCalledWith( 0 );
		expect( page.unsetAnimated ).toHaveBeenCalledOnce();
	} );

	it( 'sets closed cookie', function () {
		const page = new PageStub();
		page.setCloseCookieIfNecessary = vitest.fn();
		const state = new ClosedState( CloseSources.MainBanner, page, new TrackerStub() );

		state.enter();

		expect( page.setCloseCookieIfNecessary ).toHaveBeenCalledOnce();
		expect( page.setCloseCookieIfNecessary ).toHaveBeenCalledWith( CloseSources.MainBanner );
	} );
} );
