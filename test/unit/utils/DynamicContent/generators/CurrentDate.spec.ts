import { describe, expect, test } from 'vitest';
import { Translator } from '@src/Translator';
import { CurrentDate } from '@src/utils/DynamicContent/generators/CurrentDate';
import { Ordinal } from '@src/utils/DynamicContent/formatters/Ordinal';

const translator = new Translator( {
	'month-name-1': 'Ick',
	'month-name-2': 'Offle',
	'month-name-10': 'Spune',
	'month-name-11': 'Sektober'
} );

const staticOrdinal: Ordinal = {
	getFormatted: ( figure: number ) => figure + 'sth'
};

describe( 'CurrentDate', () => {
	test.each( [
		[ 1, 14, 'Ick 14sth' ],
		[ 2, 27, 'Offle 27sth' ],
		[ 10, 2, 'Spune 2sth' ],
		[ 11, 8, 'Sektober 8sth' ]
	] )( 'returns the proper month name and date', ( month: number, day: number, expected: string ) => {
		const currentDate = new CurrentDate( new Date( 2023, month - 1, day, 12, 0, 0 ), translator, staticOrdinal );

		expect( currentDate.getText() ).toEqual( expected );
	} );
} );
