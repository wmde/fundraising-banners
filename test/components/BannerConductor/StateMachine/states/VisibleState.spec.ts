import { describe, expect, it, vitest } from 'vitest';
import { VisibleState } from '@src/components/BannerConductor/StateMachine/states/VisibleState';
import { PageStub } from '@test/fixtures/PageStub';

describe( 'VisibleState', function () {

	it( 'sets banner size on resize', () => {
		const page = new PageStub();
		page.setSpace = vitest.fn( () => page );
		const visibleState = new VisibleState( page );

		visibleState.onResize( 42 );

		expect( page.setSpace ).toHaveBeenCalledOnce();
		expect( page.setSpace ).toHaveBeenCalledWith( 42 );
	} );
} );
