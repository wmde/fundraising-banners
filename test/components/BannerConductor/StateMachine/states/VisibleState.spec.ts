import { describe, expect, it, vitest } from 'vitest';
import { VisibleState } from '@src/components/BannerConductor/StateMachine/states/VisibleState';
import { PageStub } from '@test/fixtures/PageStub';
import { ImpressionCountStub } from '@test/fixtures/ImpressionCountStub';

describe( 'VisibleState', function () {

	it( 'sets banner size on resize', () => {
		const page = new PageStub();
		page.setSpace = vitest.fn( () => page );
		const visibleState = new VisibleState( page, new ImpressionCountStub() );

		visibleState.onResize( 42 );

		expect( page.setSpace ).toHaveBeenCalledOnce();
		expect( page.setSpace ).toHaveBeenCalledWith( 42 );
	} );

	it( 'sets banner size on content change', () => {
		const page = new PageStub();
		page.setSpace = vitest.fn( () => page );
		const visibleState = new VisibleState( page, new ImpressionCountStub() );

		visibleState.onContentChanged( 42 );

		expect( page.setSpace ).toHaveBeenCalledOnce();
		expect( page.setSpace ).toHaveBeenCalledWith( 42 );
	} );

	it( 'increases banner impression count on enter', async () => {
		const impressionCountStub = new ImpressionCountStub();
		impressionCountStub.incrementImpressionCounts = vitest.fn();
		const visibleState = new VisibleState( new PageStub(), impressionCountStub );

		await visibleState.enter();

		expect( impressionCountStub.incrementImpressionCounts ).toHaveBeenCalledOnce();
	} );
} );
