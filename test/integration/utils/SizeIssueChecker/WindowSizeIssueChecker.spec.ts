import { beforeEach, describe, expect, it } from 'vitest';
import { WindowSizeIssueChecker } from '@src/utils/SizeIssueChecker/WindowSizeIssueChecker';
import { Vector2 } from '@src/utils/Vector2';

describe( 'WindowSizeIssueChecker', function () {

	beforeEach( () => {
		Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 100 } );
		Object.defineProperty( window, 'innerHeight', { writable: true, configurable: true, value: 100 } );
	} );

	it( 'returns size issue when window is too thin', () => {
		const bannerDimensions = new Vector2( 100, 100 );
		const checker = new WindowSizeIssueChecker( 101 );

		expect( checker.hasSizeIssues( bannerDimensions, Vector2.ZERO ) ).toBeTruthy();
	} );

	it( 'returns size issue when banner is too tall', () => {
		const bannerDimensions = new Vector2( 100, 101 );
		const checker = new WindowSizeIssueChecker();

		expect( checker.hasSizeIssues( bannerDimensions, Vector2.ZERO ) ).toBeTruthy();
	} );

	it( 'returns size issue when banner with offset is too tall', () => {
		const bannerDimensions = new Vector2( 100, 100 );
		const spaceAdjustment = new Vector2( 0, 1 );
		const checker = new WindowSizeIssueChecker( 0, spaceAdjustment );

		expect( checker.hasSizeIssues( bannerDimensions, Vector2.ZERO ) ).toBeTruthy();
	} );

	it( 'returns size issue when banner with skin adjustment is too tall', () => {
		const bannerDimensions = new Vector2( 100, 100 );
		const spaceAdjustment = Vector2.ZERO;
		const checker = new WindowSizeIssueChecker( 0, spaceAdjustment );

		expect( checker.hasSizeIssues( bannerDimensions, new Vector2( 0, 1 ) ) ).toBeTruthy();
	} );

	it( 'returns no size issue when banner fits', () => {
		const bannerDimensions = new Vector2( 90, 90 );
		const spaceAdjustment = new Vector2( 4, 2 );
		const checker = new WindowSizeIssueChecker( 100, spaceAdjustment );

		expect( checker.hasSizeIssues( bannerDimensions, Vector2.ZERO ) ).toBeFalsy();
	} );
} );
