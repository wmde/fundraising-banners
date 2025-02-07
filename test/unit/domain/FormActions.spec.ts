import { describe, expect, it } from 'vitest';
import { FormAction, FormActionCollection } from '@src/domain/FormActions';
import { FakeTrackingParameters } from '@test/fixtures/FakeTrackingParameters';
import { TrackingParameters } from '@src/domain/TrackingParameters';

describe( 'Form Actions', () => {
	describe( 'actionUrl property', () => {
		it( 'should start with the URL', () => {
			const testUrl = 'https://spenden.wikimedia.de/';
			const action = new FormAction( testUrl, new FakeTrackingParameters() );

			expect( action.actionUrl ).toMatch( new RegExp( `^${testUrl}(\\?|$)`, 'i' ) );
		} );

		it( 'should include the tracking parameters', () => {
			const trackingParameters: TrackingParameters = {
				campaign: '00-ba-250203',
				keyword: 'org-00-250203-ctrl',
			};
			const action = new FormAction( 'https://example.com', trackingParameters );

			expect( action.actionUrl ).toContain( 'piwik_campaign=00-ba-250203' );
			expect( action.actionUrl ).toContain( 'piwik_kwd=org-00-250203-ctrl' );
		} );

		it( 'should include additional constructor parameters', () => {
			const additionalParameters = {
				exclude: 'fakes',
				t: '1'
			};
			const action = new FormAction( 'https://example.com', new FakeTrackingParameters(), additionalParameters );

			expect( action.actionUrl ).toContain( 'exclude=fakes' );
			expect( action.actionUrl ).toContain( 't=1' );
		} );

		it( 'should allow additional constructor parameters to override tracking', () => {
			const additionalParameters = {
				/* eslint-disable camelcase */
				piwik_campaign: '00-ba-250204',
				piwik_kwd: 'org-00-250204-ctrl',
				/* eslint-enable camelcase */
			};
			const action = new FormAction( 'https://example.com', new FakeTrackingParameters(), additionalParameters );

			expect( action.actionUrl ).toContain( 'piwik_campaign=00-ba-250204' );
			expect( action.actionUrl ).toContain( 'piwik_kwd=org-00-250204-ctrl' );
		} );

		it( 'should support setting additional parameters', () => {
			const action = new FormAction( 'https://spenden.wikimedia.de/', new FakeTrackingParameters() );

			action.setParameter( 'addressFormTest', '23' );

			expect( action.actionUrl ).toContain( 'addressFormTest=23' );
		} );

		it( 'should support setting additional parameters to override tracking and constructor parameters', () => {
			const action = new FormAction( 'https://example.com', new FakeTrackingParameters(), { z: '1' } );

			action.setParameter( 'z', '2' );
			action.setParameter( 'piwik_campaign', '00-ba-250204' );
			action.setParameter( 'piwik_kwd', 'org-00-250204-ctrl' );

			expect( action.actionUrl ).toContain( 'z=2' );
			expect( action.actionUrl ).toContain( 'piwik_campaign=00-ba-250204' );
			expect( action.actionUrl ).toContain( 'piwik_kwd=org-00-250204-ctrl' );
		} );

		it( 'should URL-encode all parameters', () => {
			const trackingParameters: TrackingParameters = {
				campaign: '00/ba/250205',
				keyword: 'org@00@250205@ctrl',
			};
			const action = new FormAction( 'https://example.com', trackingParameters, { z: '??' } );
			action.setParameter( 'f', '💚' );

			expect( action.actionUrl ).toContain( 'piwik_campaign=00%2Fba%2F250205' );
			expect( action.actionUrl ).toContain( 'piwik_kwd=org%4000%40250205%40ctrl' );
			expect( action.actionUrl ).toContain( 'z=%3F%3F' );
			expect( action.actionUrl ).toContain( 'f=%F0%9F%92%9A' );

		} );
	} );
} );

describe( 'FormActionCollection', function () {
	it( 'should assign the right positional parameters in constructor', function () {
		const donateAction = new FormAction( 'https://example.com/donate', new FakeTrackingParameters() );
		const donateAnonAction = new FormAction( 'https://example.com/donateAnonymously', new FakeTrackingParameters() );
		const formActions = new FormActionCollection( donateAction, donateAnonAction );

		expect( formActions.donateWithAddressAction ).toBe( donateAction );
		expect( formActions.donateAnonymouslyAction ).toBe( donateAnonAction );
	} );
} );
