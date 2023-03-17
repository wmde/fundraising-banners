import { beforeEach, describe, expect, it } from 'vitest';
import { WindowSizeIssueChecker } from '@src/utils/SizeIssueChecker/WindowSizeIssueChecker';
import { Vector2 } from '@src/utils/Vector2';

describe( 'WindowSizeIssueChecker', function () {

	beforeEach( () => {
		Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 100 } );
		Object.defineProperty( window, 'innerHeight', { writable: true, configurable: true, value: 100 } );
	} );

	it( 'returns size issue when banner is too wide', () => {
		const bannerDimensions = new Vector2( 101, 100 );
		const checker = new WindowSizeIssueChecker();

		expect( checker.hasSizeIssues( bannerDimensions, Vector2.zero ) ).toBeTruthy();
	} );

	it( 'returns size issue when banner is too tall', () => {
		const bannerDimensions = new Vector2( 100, 101 );
		const checker = new WindowSizeIssueChecker();

		expect( checker.hasSizeIssues( bannerDimensions, Vector2.zero ) ).toBeTruthy();
	} );

	it( 'returns size issue when banner with offset is too wide', () => {
		const bannerDimensions = new Vector2( 100, 100 );
		const spaceAdjustment = new Vector2( 1, 0 );
		const checker = new WindowSizeIssueChecker( spaceAdjustment );

		expect( checker.hasSizeIssues( bannerDimensions, Vector2.zero ) ).toBeTruthy();
	} );

	it( 'returns size issue when banner with offset is too tall', () => {
		const bannerDimensions = new Vector2( 100, 100 );
		const spaceAdjustment = new Vector2( 0, 1 );
		const checker = new WindowSizeIssueChecker( spaceAdjustment );

		expect( checker.hasSizeIssues( bannerDimensions, Vector2.zero ) ).toBeTruthy();
	} );

	it( 'returns size issue when banner with skin adjustment is too tall', () => {
		const bannerDimensions = new Vector2( 100, 100 );
		const spaceAdjustment = Vector2.zero;
		const checker = new WindowSizeIssueChecker( spaceAdjustment );

		expect( checker.hasSizeIssues( bannerDimensions, new Vector2( 0, 1 ) ) ).toBeTruthy();
	} );

	it( 'returns no size issue when banner fits', () => {
		const bannerDimensions = new Vector2( 90, 90 );
		const spaceAdjustment = new Vector2( 4, 2 );
		const checker = new WindowSizeIssueChecker( spaceAdjustment );

		expect( checker.hasSizeIssues( bannerDimensions, Vector2.zero ) ).toBeFalsy();
	} );

	it( 'returns dimensions', () => {
		Object.defineProperty( window, 'outerWidth', { writable: true, configurable: true, value: 120 } );
		Object.defineProperty( window, 'outerHeight', { writable: true, configurable: true, value: 120 } );
		Object.defineProperty( screen, 'width', { writable: true, configurable: true, value: 180 } );
		Object.defineProperty( screen, 'height', { writable: true, configurable: true, value: 180 } );

		const checker = new WindowSizeIssueChecker( Vector2.zero );

		expect( checker.getDimensions() ).toEqual( {
			screen: {
				width: 180,
				height: 180
			},
			window: {
				width: 100,
				height: 100
			},
			windowOuter: {
				width: 120,
				height: 120
			}
		} );
	} );
} );
