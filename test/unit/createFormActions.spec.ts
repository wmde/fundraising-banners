import { describe, expect, it } from 'vitest';
import { createFormActions } from '@src/createFormActions';
import { ImpressionCountStub } from '@test/fixtures/ImpressionCountStub';

describe( 'createFormActions', function () {
	it( 'should create form action from parameters', function () {
		const formActions = createFormActions( {
			campaign: 'C1',
			keyword: 'coolBanner'
		}, new ImpressionCountStub(), { locale: 'de_DE', ast: '1' } );
		expect( formActions.donateWithAddressAction.toString() ).toBe(
			'https://spenden.wikimedia.de/donation/new?piwik_kwd=coolBanner&piwik_campaign=C1&banner_submission=1&impCount=1&bImpCount=1&locale=de_DE&ast=1'
		);
		expect( formActions.donateAnonymouslyAction.toString() ).toBe(
			'https://spenden.wikimedia.de/donation/add?piwik_kwd=coolBanner&piwik_campaign=C1&banner_submission=1&impCount=1&bImpCount=1&locale=de_DE&ast=1'
		);
	} );
} );
