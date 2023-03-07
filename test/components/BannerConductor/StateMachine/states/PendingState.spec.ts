import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { PendingState } from '@src/components/BannerConductor/StateMachine/states/PendingState';
import { Page } from '@src/page/Page';

describe( 'PendingState', function () {
	let page: Page;

	beforeEach( () => {
		page = { setSpace: vitest.fn() } as unknown as Page;
	} );

	it( 'sets banner height on enter', async () => {
		const pendingState = new PendingState( page, 60, 1 );

		await pendingState.enter();

		expect( page.setSpace ).toHaveBeenCalledOnce();
		expect( page.setSpace ).toHaveBeenCalledWith( 60 );
	} );

	it( 'starts delay timeout on enter', async () => {
		const setTimeoutSpy = vitest.spyOn( window, 'setTimeout' );
		const pendingState = new PendingState( page, 60, 1 );

		await pendingState.enter();

		expect( setTimeoutSpy ).toHaveBeenCalledOnce();
		expect( setTimeoutSpy ).toHaveBeenCalledWith( expect.any( Function ), 1 );
	} );

	it( 'stops delay timeout on exit', async () => {
		const clearTimeoutSpy = vitest.spyOn( window, 'clearTimeout' );
		const pendingState = new PendingState( page, 60, 1 );

		await pendingState.exit();

		expect( clearTimeoutSpy ).toHaveBeenCalledOnce();
	} );

	it( 'sets banner size on resize', () => {
		const pendingState = new PendingState( page, 60, 1 );

		pendingState.onResize( 42 );

		expect( page.setSpace ).toHaveBeenCalledOnce();
		expect( page.setSpace ).toHaveBeenCalledWith( 42 );
	} );
} );
