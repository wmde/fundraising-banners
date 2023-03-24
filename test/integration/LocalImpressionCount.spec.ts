import { beforeEach, describe, expect, it } from 'vitest';
import { LocalImpressionCount } from '@src/utils/LocalImpressionCount';

describe( 'LocalImpressionCount', function () {

	beforeEach( ()=> {
		localStorage.clear();
	} );

	describe( '#overallCount', function () {
		it( 'should have a local impression count of 0 when local storage is not initialized', function () {
			const localImpressionCount = new LocalImpressionCount( 'bannerName' );
			expect( localImpressionCount.overallCount ).toBe( 0 );
		} );

		it( 'should return impression count from local storage', function () {
			localStorage.setItem( 'fundraising.overallCount', '5' );
			const localImpressionCount = new LocalImpressionCount( 'bannerName' );
			expect( localImpressionCount.overallCount ).toBe( 5 );
		} );

		it( 'should return 0 if local storage has NaN', function () {
			localStorage.setItem( 'fundraising.overallCount', String( NaN ) );
			const localImpressionCount = new LocalImpressionCount( 'bannerName' );
			expect( localImpressionCount.overallCount ).toBe( 0 );
		} );
	} );

	describe( '#bannerCount', function () {
		it( 'should have a count of 0 when local storage is not initialized', function () {
			const localImpressionCount = new LocalImpressionCount( 'bannerName' );
			expect( localImpressionCount.bannerCount ).toBe( 0 );
		} );

		it( 'should return a count from local storage', function () {
			localStorage.setItem( 'fundraising.bannerCount', 'bannerName|15' );
			const localImpressionCount = new LocalImpressionCount( 'bannerName' );
			expect( localImpressionCount.bannerCount ).toBe( 15 );
		} );

		it( 'should return 0 if local storage has invalid string', function () {
			localStorage.setItem( 'fundraising.bannerCount', 'whatever' );
			const localImpressionCount = new LocalImpressionCount( 'bannerName' );
			expect( localImpressionCount.bannerCount ).toBe( 0 );
		} );
	} );

	describe( '#incrementImpressionCounts()', function () {
		it( 'should increase both counts', function () {
			localStorage.setItem( 'fundraising.bannerCount', 'bannerName|1' );
			localStorage.setItem( 'fundraising.overallCount', '7' );
			const localImpressionCount = new LocalImpressionCount( 'bannerName' );
			localImpressionCount.incrementImpressionCounts();
			expect( localImpressionCount.bannerCount ).toBe( 2 );
			expect( localImpressionCount.overallCount ).toBe( 8 );
			expect( localStorage.getItem( 'fundraising.bannerCount' ) ).toBe( 'bannerName|2' );
			expect( localStorage.getItem( 'fundraising.overallCount' ) ).toBe( '8' );
		} );
	} );
} );
