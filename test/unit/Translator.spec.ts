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

	it( 'replaces template tags', () => {
		const translator = new Translator( { 'message-with-template': '{{replaceMe}}-{{andMe}}-{{andThisNumber}}' } );

		expect( translator.translate( 'message-with-template', {
			replaceMe: 'Boo',
			andMe: 'Urns',
			andThisNumber: 42
		} ) ).toEqual( 'Boo-Urns-42' );
	} );
} );
