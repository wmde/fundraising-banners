import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ShowingState } from '@src/components/BannerConductor/StateMachine/states/ShowingState';
import { Page } from '@src/page/Page';
import { PageStub } from '@test/fixtures/PageStub';

describe( 'ShowingState', function () {
	let page: Page;

	beforeEach( () => {
		page = new PageStub();
		page.setSpace = vitest.fn().mockReturnValue( page );
		page.setAnimated = vitest.fn().mockReturnValue( page );
		page.setTransitionDuration = vitest.fn().mockReturnValue( page );
		page.showBanner = vitest.fn();
	} );

	it( 'shows banner on enter', async () => {
		const showingState = new ShowingState( page, 1 );

		await showingState.enter();

		expect( page.setAnimated ).toHaveBeenCalledOnce();
		expect( page.setTransitionDuration ).toHaveBeenCalledOnce();
		expect( page.setTransitionDuration ).toHaveBeenCalledWith( 1 );
		expect( page.showBanner ).toHaveBeenCalledOnce();
	} );

	it( 'starts transitionDuration timeout on enter', async () => {
		const setTimeoutSpy = vitest.spyOn( window, 'setTimeout' );
		const showingState = new ShowingState( page, 1 );

		await showingState.enter();

		expect( setTimeoutSpy ).toHaveBeenCalledOnce();
		expect( setTimeoutSpy ).toHaveBeenCalledWith( expect.any( Function ), 1 );
	} );

	it( 'stops delay timeout on exit', async () => {
		const clearTimeoutSpy = vitest.spyOn( window, 'clearTimeout' );
		const showingState = new ShowingState( page, 1 );

		await showingState.exit();

		expect( clearTimeoutSpy ).toHaveBeenCalledOnce();
	} );

	it( 'sets banner size on resize', () => {
		const showingState = new ShowingState( page, 1 );

		showingState.onResize( 42 );

		expect( page.setSpace ).toHaveBeenCalledOnce();
		expect( page.setSpace ).toHaveBeenCalledWith( 42 );
	} );

	it( 'sets banner size on content changed', () => {
		const showingState = new ShowingState( page, 1 );

		showingState.onContentChanged( 42 );

		expect( page.setSpace ).toHaveBeenCalledOnce();
		expect( page.setSpace ).toHaveBeenCalledWith( 42 );
	} );
} );
