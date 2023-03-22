import { describe, expect, it } from 'vitest';
import { Translator } from '@src/Translator';

describe( 'Translator', () => {
	it( 'returns the translation if it exists', () => {
		const translator = new Translator( { 'message-that-exists': 'Message Exists' } );

		expect( translator.translate( 'message-that-exists' ) ).toEqual( 'Message Exists' );
	} );

	it( 'returns the translation key if the translation does not exist', () => {
		const translator = new Translator( { 'message-that-exists': 'Message Exists' } );

		expect( translator.translate( 'message-that-does-not-exist' ) ).toEqual( 'message-that-does-not-exist' );
	} );

	it( 'replaces placeholders in messages', () => {
		const translator = new Translator( { 'visitors-vs-donors-sentence': 'Our fundraising appeal is displayed over {{millionImpressionsPerDay}} million' +
				' times a day, but currently only {{totalNumberOfDonors}} people have donated.' } );

		expect( translator.translate( 'visitors-vs-donors-sentence', {
			millionImpressionsPerDay: 10,
			totalNumberOfDonors: 4711
		} ) ).toEqual( 'Our fundraising appeal is displayed over 10 million times a day, but currently only 4711 people have donated.' );
	} );

	it( 'leaves unrecognized placeholders in the message', () => {
		const translator = new Translator( { 'message-with-placeholder': '{{replaceMe}}-{{andMe}}-{{andThisNumber}}' } );

		expect( translator.translate( 'message-with-placeholder', {
			andThisNumber: 42
		} ) ).toEqual( '{{replaceMe}}-{{andMe}}-42' );
	} );

	it( 'ignores placeholder values that are not in the message', () => {
		const translator = new Translator( { 'message-with-placeholder': '{{replaceMe}}' } );

		expect( translator.translate( 'message-with-placeholder', {
			replaceMe: 'Boo',
			andMe: 'Urns',
			andThisNumber: 42
		} ) ).toEqual( 'Boo' );
	} );
} );
