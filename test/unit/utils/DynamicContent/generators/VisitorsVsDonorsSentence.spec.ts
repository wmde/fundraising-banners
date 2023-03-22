import { describe, expect, it } from 'vitest';
import { VisitorsVsDonorsSentence } from '@src/utils/DynamicContent/generators/VisitorsVsDonorsSentence';
import { TranslationMessages, Translator } from '@src/Translator';

describe( 'VisitorsVsDonorsSentence', function () {
	it( 'returns the correct sentence when there is impressions', function () {
		const visitorsVsDonorsSentence = new VisitorsVsDonorsSentence( new Translator( {} ), 10, 42 );

		expect( visitorsVsDonorsSentence.getText() ).toEqual( 'visitors-vs-donors-sentence' );
	} );

	it( 'returns the correct sentence when there are no impressions', function () {
		const visitorsVsDonorsSentence = new VisitorsVsDonorsSentence( new Translator( {} ), 0, 42 );

		expect( visitorsVsDonorsSentence.getText() ).toEqual( 'visitors-vs-donors-sentence-no-impressions' );
	} );

	it( 'returns the correct sentence when there are no projected donors (e.g. outside of campaign)', function () {
		const visitorsVsDonorsSentence = new VisitorsVsDonorsSentence( new Translator( {} ), 10, 0 );

		expect( visitorsVsDonorsSentence.getText() ).toEqual( 'visitors-vs-donors-sentence-no-impressions' );
	} );

	it( 'inserts the variables into the sentence', function () {
		const messages: TranslationMessages = { 'visitors-vs-donors-sentence': '{{millionImpressionsPerDay}}-{{totalNumberOfDonors}}' };
		const visitorsVsDonorsSentence = new VisitorsVsDonorsSentence( new Translator( messages ), 10, 42 );

		expect( visitorsVsDonorsSentence.getText() ).toEqual( '10-42' );
	} );
} );
