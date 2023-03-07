import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { VisibleState } from '@src/components/BannerConductor/StateMachine/states/VisibleState';
import { Page } from '@src/page/Page';

describe( 'VisibleState', function () {
	let page: Page;

	beforeEach( () => {
		page = { setSpace: vitest.fn() } as unknown as Page;
	} );

	it( 'sets banner size on resize', () => {
		const visibleState = new VisibleState( page );

		visibleState.onResize( 42 );

		expect( page.setSpace ).toHaveBeenCalledOnce();
		expect( page.setSpace ).toHaveBeenCalledWith( 42 );
	} );
} );
